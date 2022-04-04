/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */

/* React */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
/* Material UI */
import {
  Box,
  Alert,
  Input,
  Button,
  AlertTitle,
  InputLabel,
  IconButton,
  FormControl,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import { useStyles } from 'features/auth/register/components/styles/dike-register-content-style';
/* Icon */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
/* Library */
import { isEmpty, isNil } from 'lodash/';
import crypto from 'crypto';
/* Import Components and Variables */
import { LOGIN_PATH } from 'configs/AppConfig';
import TycheCircularProgress, {
  BorderLinearProgress,
} from 'features/auth/constants/progress-bar';
import { validationErr } from 'features/auth/constants/auth-constant';
import { validationCheck } from 'features/auth/constants/auth-function';

/* Redux Tookit */
import { registerAction, registerSelector } from 'features/auth/register/slice';

const { REGISTER, USERID_DUPLICATE_CHECK, INITIALIZE_DUPLICATE_STATE } =
  registerAction;

export default function RegisterForm() {
  /* Store */
  const { loading, duplicated } = useSelector(registerSelector.all);
  /* Hook */
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  /* State */
  const [values, setValues] = useState({
    name: '',
    userId: '',
    password: '',
    passwordCheck: '',
    duplicated: null,
  });

  const [errors, setErrors] = useState({
    name: false,
    userId: false,
    password: false,
    passwordCheck: false,
    nameMessage: '',
    userIdMessage: '',
    passwordMessage: '',
    passwordCheckMessage: '확인을 위해 비밀번호를 다시 입력해주세요',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [duplicateState, setDuplicateState] = useState(null);

  const handleOnChange = e => {
    const { name, value } = e.target;
    /* Input Value Setting */
    setValues({
      ...values,
      [name]: value,
      duplicated: null,
    });

    setErrors({
      ...errors,
      [name]: !validationCheck(name, value),
      [`${name}Message`]: !validationCheck(name, value)
        ? validationErr[name]
        : '',
    });

    if (name === 'passwordCheck') {
      setErrors({
        ...errors,
        [name]: !validationCheck(name, value),
        [`${name}Message`]: !validationCheck(name, value)
          ? validationErr[name]
          : '',
      });
    }
  };

  const handleOnBlur = () => {
    dispatch(INITIALIZE_DUPLICATE_STATE());
  };

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(INITIALIZE_DUPLICATE_STATE());
    const { name, userId, password, passwordCheck } = values;
    const hash = crypto.createHash('sha256').update(password).digest('base64');

    // 중복 체크가 진행되지 않은 상태
    if (isNil(duplicateState)) {
      setErrors({
        ...errors,
        userId: true,
        userIdMessage: validationErr.duplicateCheck,
      });
    }

    if (
      validationCheck('name', name) &&
      validationCheck('userId', userId) &&
      validationCheck('password', password) &&
      password === passwordCheck &&
      duplicateState === false
    ) {
      dispatch(
        REGISTER({
          name,
          userId,
          password: hash,
          history,
        }),
      );
    }
  };

  const userIdDuplicateCheck = () => {
    const { userId } = values;
    // console.log('[RegisterForm][userId]:', userId);
    if (validationCheck('userId', userId)) {
      dispatch(USERID_DUPLICATE_CHECK({ userId }));
    }

    if (isEmpty(userId)) {
      setErrors({
        ...errors,
        userId: true,
        userIdMessage: '아이디를 입력 후 다시 시도해주세요',
      });
    }
  };

  const backButton = () => {
    dispatch(INITIALIZE_DUPLICATE_STATE());
    history.push(LOGIN_PATH);
  };

  useEffect(() => {
    if (duplicated === true) {
      setDuplicateState(true);
      setErrors({
        ...errors,
        userId: true,
        userIdMessage: validationErr.duplicatedTrue,
      });
    }

    if (duplicated === false) {
      setDuplicateState(false);
      setErrors({
        ...errors,
        userId: false,
        userIdMessage: validationErr.duplicatedFalse,
      });
    }

    if (isNil(duplicated)) {
      setDuplicateState(null);
      setErrors({
        ...errors,
        userId: false,
        userIdMessage: '',
      });
    }
  }, [duplicated]);

  return (
    <>
      {loading.register ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Alert
            severity="info"
            variant="outlined"
            sx={{
              mb: 3,
              wordBreak: 'keep-all',
              '& .MuiAlert-message': {
                color: 'black',
                fontSize: 12,
              },
            }}
          >
            <AlertTitle>Info</AlertTitle>
            가입 하신 이메일로 인증 번호를 발송하고 있습니다.
          </Alert>
          <Box>
            <BorderLinearProgress />
          </Box>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <FormControl className={classes.root} required>
            <InputLabel shrink htmlFor="bootstrap-input">
              이름
            </InputLabel>
            <Input
              className={classes.input}
              type="text"
              name="name"
              value={values.name}
              error={errors.name}
              onChange={handleOnChange}
              fullWidth
            />
            <FormHelperText error={errors.name}>
              {errors.nameMessage}
            </FormHelperText>
          </FormControl>
          {/* User ID */}
          <FormControl className={classes.root} required>
            <InputLabel shrink htmlFor="bootstrap-input">
              아이디(이메일)
            </InputLabel>
            <Input
              className={classes.input}
              type="text"
              name="userId"
              value={values.userId}
              error={errors.userId}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  {loading.duplicated ? (
                    <TycheCircularProgress />
                  ) : (
                    <Button
                      className={classes.checkBtn}
                      type="button"
                      onClick={() => userIdDuplicateCheck()}
                    >
                      중복 체크
                    </Button>
                  )}
                </InputAdornment>
              }
            />
            {loading.duplicated ? (
              <BorderLinearProgress />
            ) : (
              <FormHelperText error={errors.userId}>
                {errors.userIdMessage}
              </FormHelperText>
            )}
          </FormControl>
          {/* Password */}
          <FormControl className={classes.root} required>
            <InputLabel shrink htmlFor="bootstrap-input">
              비밀번호
            </InputLabel>
            <Input
              className={classes.input}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={values.password}
              error={errors.password}
              onChange={handleOnChange}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={errors.password}>
              {errors.passwordMessage}
            </FormHelperText>
          </FormControl>
          {/* Password Check */}
          <FormControl className={classes.root} required>
            <InputLabel shrink htmlFor="bootstrap-input">
              비밀번호 확인
            </InputLabel>
            <Input
              className={classes.input}
              type="password"
              name="passwordCheck"
              value={values.passwordCheck}
              error={errors.passwordCheck}
              onChange={handleOnChange}
              fullWidth
            />
            <FormHelperText error={errors.passwordCheck}>
              {errors.passwordCheckMessage}
            </FormHelperText>
          </FormControl>
          {loading.register ? (
            <TycheCircularProgress />
          ) : (
            <div className={classes.btnGroup}>
              <Button
                className={classes.backBtn}
                onClick={backButton}
                sx={{
                  width: { sm: 140, xs: 100 },
                  height: { sm: 45, xs: 40 },
                }}
              >
                뒤로 가기
              </Button>
              <Button
                className={classes.btn}
                type="submit"
                sx={{
                  width: { sm: 140, xs: 100 },
                  height: { sm: 45, xs: 40 },
                }}
              >
                계정 생성
              </Button>
            </div>
          )}
        </form>
      )}
    </>
  );
}

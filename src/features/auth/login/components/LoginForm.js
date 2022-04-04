/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */

/* React */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
/* Material UI */
import {
  Alert,
  Button,
  IconButton,
  InputLabel,
  FormControl,
  AlertTitle,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';

import { useStyles } from 'features/auth/login/components/styles/dike-login-style';
/* Icons */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
/* Library */
import crypto from 'crypto';
/* Import Components and Variables */
import { validationCheck } from 'features/auth/constants/auth-function';
import { loginErrorMessage } from 'features/auth/constants/auth-constant';
/* Redux & Toolkit */
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, loginSelector } from 'features/auth/login/slice';

const { LOGIN } = loginAction;

export default function LoginForm() {
  /* Store */
  const { message } = useSelector(loginSelector.all);
  /* Hook */
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  /* State */
  const [values, setValues] = useState({
    userId: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    userId: false,
    password: false,
    userIdMessage: '',
    passwordMessage: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const { userId, password } = values;

  // console.log('[message]:', message.payload);

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  /* Set value and validation Check */
  const handleOnchange = e => {
    // console.log('[features][Login][LoginForm][prop] :', prop);
    const { name, value } = e.target;
    /* Set Value and validation check */
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: !validationCheck(name, value),
      [`${name}Message`]: !validationCheck(name, value)
        ? loginErrorMessage[name]
        : '',
    });
  };
  /* Value submit */
  const handleSubmit = e => {
    e.preventDefault();

    // dispatch(INITIALIZE_MESSAGE_STATE());
    const hash = crypto.createHash('sha256').update(password).digest('base64');

    if (
      validationCheck('userId', userId) &&
      validationCheck('password', password)
    ) {
      dispatch(LOGIN({ history, userId, password: hash }));
    }
  };

  return (
    <>
      {message ? (
        <>
          <Alert
            className={classes.message}
            severity="error"
            variant="outlined"
            sx={{
              border: '1px solid #e63e62',
              mb: 3,
              wordBreak: 'keep-all',
              '& .MuiAlert-message': {
                color: 'black',
                fontSize: 12,
              },
              '& .MuiAlert-icon': {
                color: '#e63e62',
              },
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {message}
          </Alert>
        </>
      ) : null}
      <form onSubmit={handleSubmit} className={classes.loginForm}>
        <FormControl>
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            required
            sx={{
              mb: 2,
              '&.MuiInputLabel-root': {
                fontSize: 17,
                fontWeight: 700,
              },
              '& .MuiInputLabel-asterisk': {
                color: '#e63e62',
              },
            }}
          >
            아이디 (이메일)
          </InputLabel>
          <OutlinedInput
            className={classes.input}
            type="text"
            name="userId"
            value={userId}
            onChange={handleOnchange}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <MailOutlineTwoToneIcon fontSize="small" color="inherit" />
              </InputAdornment>
            }
            error={errors.userId}
          />
          <FormHelperText error={errors.userId}>
            {errors.userIdMessage}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ mt: 2 }}>
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            required
            sx={{
              '&.MuiInputLabel-root': {
                fontSize: 17,
                fontWeight: 700,
              },
              '& .MuiInputLabel-asterisk': {
                color: '#e63e62',
              },
            }}
          >
            비밀번호
          </InputLabel>
          <OutlinedInput
            className={classes.input}
            type={showPassword ? 'text' : 'password'}
            value={password}
            name="password"
            onChange={handleOnchange}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <LockTwoToneIcon fontSize="small" color="inherit" />
              </InputAdornment>
            }
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
            error={errors.password}
          />
          <FormHelperText error={errors.password}>
            {errors.passwordMessage}
          </FormHelperText>
        </FormControl>

        <Button className={classes.btn} type="submit">
          로그인
        </Button>
      </form>
    </>
  );
}

/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */

/* React */
import { useState, useEffect } from 'react';
/* Material UI */
import {
  Box,
  Step,
  Alert,
  Button,
  Stepper,
  TextField,
  StepLabel,
  Typography,
} from '@mui/material';
import { useStyles } from 'features/auth/login/components/styles/dike-change-password-style';
/* Icons */
/* Library */
import _ from 'lodash';
/* Import Components and Variables */
import {
  alertMap,
  validationErr,
  changePasswordSteps,
} from 'features/auth/constants/auth-constant';
import { useCounter } from 'features/auth/constants/custom-hook';
import { validationCheck } from 'features/auth/constants/auth-function';

import { BorderLinearProgress } from 'features/auth/constants/progress-bar';
/* Redux & Toolkit */
import { useDispatch, useSelector } from 'react-redux';
import { verifyAction, verifySelector } from 'features/auth/verification/slice';

const { SEND_VERIFY_EMAIL, VERIFY_EMAIL, USER_INFO_CHANGE } = verifyAction;

export default function SearchStepper(prop) {
  /* Store */
  const { loading, verified, key, expiredTime } = useSelector(
    verifySelector.all,
  );
  /* Prop */
  const { email, action } = prop;
  /* Custom Hook */
  const { count, start, stop, reset } = useCounter(300, 1000);
  /* Hook */
  const classes = useStyles();
  const dispatch = useDispatch();
  /* State */
  const [activeStep, setActiveStep] = useState(0);

  const [values, setValues] = useState({
    userId: '',
    code: '',
    password: '',
    passwordCheck: '',
  });

  const [validation, setValidation] = useState({
    userId: '',
    code: '',
    password: '',
    passwordCheck: '확인을 위해 비밀번호를 다시 입력해주세요',
    userIdErr: false,
    codeErr: false,
    passwordErr: false,
    passwordCheckErr: false,
  });

  const alert = {
    userIdInfo:
      '아이디(이메일) 분실시 이름과 휴대 전화를 통해 확인 가능합니다.',
    passwordInfo: '비밀번호 분실시 이메일 인증을 통해 변경 가능합니다.',
    userIdSuccess: ' 아이디(이메일) 찾기 결과는 아래와 같습니다.',
    passwordSuccess: '비밀번호 변경 완료!',
    sendSuccess:
      '입력하신 이메일로 인증 번호가 전송 되었습니다. 전송된 인증 번호를 입력해주세요.',
  };

  const [time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0,
  });

  // const remainTime = Math.floor((expiredTime - currentTime) / 1000);

  const steps = {
    id: {
      inputInfo: '정보 입력',
      checkId: '이메일(아이디) 확인',
    },
    pwd: {
      inputInfo: '정보 입력',
      checkAuth: '인증번호 확인',
      changePwd: '비밀번호 변경',
      complete: '완료',
    },
  };

  // console.log('action:', action);
  // console.log('prop:', prop);
  //   console.log('phone:', phone);
  //   console.log('email:', email);

  const handleOkBtn = () => {
    if (_.isNil(action)) {
      return;
    }

    if (action === 'userId' && activeStep === 0) {
      console.log('아이디 변경 / 0번 스탭');
    }

    // console.log('validation.userIdErr', validation.userIdErr);
    // console.log('validation.codeErr', validation.codeErr);
    // console.log('validation.passwordErr', validation.passwordErr);

    if (action === 'password') {
      if (activeStep === 0 && !validation.userIdErr) {
        dispatch(SEND_VERIFY_EMAIL({ userId: values.userId }));
        start();
      } else if (activeStep === 1 && key && !validation.codeErr) {
        dispatch(VERIFY_EMAIL({ key, code: values.code }));
        stop();
      } else if (
        activeStep === 2 &&
        key &&
        !validation.passwordErr &&
        !validation.passwordCheckErr
      ) {
        dispatch(USER_INFO_CHANGE({ key, password: values.password }));
      } else {
        return;
      }
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  /* 순서 
  1. [SEND_VERIFY_EMAIL]          이메일을 입력 받고, 인증 번호를 보내준다.
  2. [SEND_VERIFY_EMAIL_SUCCESS]  Key와 Expired Time을 리턴 받는다.
  3. [VERIFY_EMAIL]               인증 번호를 입력 받고, Key와 함께 인증 요청한다.
  4. [VERIFY_EMAIL_SUCCESS]       새로운 key를 리턴 받는다.
  5. [USER_INFO_CHANGE]           변경할 비밀번호를 입력 받고, 새로운 key와 함께 변경 요청을 한다.
  6. [USER_INFO_CHANGE_SUCCESS]   비밀번호 변경 성공 문구를 보여준다.
  */

  const handleClose = e => {
    e.preventDefault();
    prop.onClick();
    stop();
    // console.log('It is closed');
  };

  const handleOnChange = e => {
    const { id, value } = e.target;
    /* Input Value Setting */
    setValues({
      ...values,
      [id]: value,
    });

    validationCheck(id, value)
      ? /* 유효성 검사 성공 */
        setValidation({
          ...validation,
          [id]: '',
          [`${id}Err`]: false,
        })
      : /* 유효성 검사 실패 */
        setValidation({
          ...validation,
          [id]: validationErr[id],
          [`${id}Err`]: true,
        });

    if (id === 'passwordCheck') {
      values.password === value
        ? setValidation({
            ...validation,
            [id]: '',
            [`${id}Err`]: false,
          })
        : setValidation({
            ...validation,
            [id]: validationErr[id],
            [`${id}Err`]: true,
          });
    }
  };

  useEffect(() => {
    const checkMin = parseInt(count / 60, 10);
    const hour = Math.floor(count / 3600);
    const min = checkMin % 60;
    const sec = count % 60;

    setTime({
      ...time,
      hour,
      min,
      sec,
    });
  }, [count]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          paddingBottom: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Stepper className={classes.stepper} activeStep={activeStep}>
          {action === 'userId'
            ? _.map(steps.id, label => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })
            : action === 'password'
            ? _.map(steps.pwd, label => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })
            : null}
        </Stepper>
      </Box>

      <Typography component="span" sx={{ mt: 2, mb: 1 }}>
        {activeStep === 1 && action === 'userId' ? (
          <Box
            sx={{
              padding: 3,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <>
              <Typography component="p" sx={{ mt: 2, mb: 1 }}>
                {alert.userIdSuccess}
              </Typography>
              <Typography component="p" sx={{ mt: 2, mb: 1 }}>
                lonnie@gigworks.ai
              </Typography>
            </>
          </Box>
        ) : activeStep === 0 && action === 'password' ? (
          <>
            <TextField
              helperText={validation.userId}
              error={validation.userIdErr}
              className={classes.text}
              value={values.userId}
              onChange={handleOnChange}
              {...email.props}
            />
          </>
        ) : activeStep === 1 && action === 'password' ? (
          <>
            <div className={classes.remainTime}>
              남은 시간 : {time.hour}시간 {time.min}분 {time.sec}초
            </div>
            <TextField
              margin="dense"
              id="code"
              label="인증 번호"
              type="text"
              fullWidth
              value={values.code}
              variant="standard"
              inputProps={{ maxLength: 4 }}
              onChange={handleOnChange}
              helperText={validation.code}
              error={validation.codeErr}
            />
          </>
        ) : activeStep === 2 && action === 'password' ? (
          <>
            <TextField
              margin="dense"
              id="password"
              label="비밀 번호"
              type="text"
              fullWidth
              value={values.password}
              variant="standard"
              onChange={handleOnChange}
              helperText={validation.password}
              error={validation.passwordErr}
            />
            <TextField
              margin="dense"
              id="passwordCheck"
              label="비밀 번호 확인"
              type="text"
              fullWidth
              onChange={handleOnChange}
              value={values.passwordCheck}
              helperText={validation.passwordCheck}
              error={validation.passwordCheckErr}
              variant="standard"
            />
          </>
        ) : activeStep === 3 && action === 'password' ? (
          <Box
            sx={{
              padding: 3,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            {loading.infoChange ? (
              <BorderLinearProgress />
            ) : (
              <>
                <Typography component="p" sx={{ mt: 2, mb: 1 }}>
                  {alert.passwordSuccess}
                </Typography>
                <Typography component="p" sx={{ mt: 2, mb: 1 }}>
                  변경된 비밀번호로 다시 로그인 해주세요.
                </Typography>
              </>
            )}
          </Box>
        ) : null}
      </Typography>
      {activeStep === 0 && action === 'userId' ? (
        <Alert className={classes.alert} severity="success" color="info">
          {alert.userIdInfo}
        </Alert>
      ) : activeStep === 0 && action === 'password' ? (
        <Alert className={classes.alert} severity="success" color="info">
          {alert.passwordInfo}
        </Alert>
      ) : activeStep === 1 && action === 'password' ? (
        <Alert className={classes.alert} severity="success" color="info">
          {alert.sendSuccess}
        </Alert>
      ) : null}

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />

        <Button onClick={handleClose}> 닫기 </Button>

        {activeStep === 0 ||
        (activeStep === 1 && action === 'password') ||
        (activeStep === 2 && action === 'password') ? (
          <Button className={classes.btn} onClick={handleOkBtn}>
            확인
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}

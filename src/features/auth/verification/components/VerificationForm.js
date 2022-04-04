/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { isNil } from 'lodash/';
/* React */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
/* Material UI */
import {
  Box,
  Input,
  Alert,
  Button,
  AlertTitle,
  InputLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import { useStyles } from 'features/auth/verification/components/styles/dike-verification-style';
/* Import Components and Variables */
import { LOGIN_PATH } from 'configs/AppConfig';
import {
  validationErr,
  verifyAlertMap,
} from 'features/auth/constants/auth-constant';
import { validationCheck } from 'features/auth/constants/auth-function';
import { BorderLinearProgress } from 'features/auth/constants/progress-bar';
/* Redux & Toolkit */
import { useSelector, useDispatch } from 'react-redux';
import { verifyAction, verifySelector } from 'features/auth/verification/slice';

const { VERIFY_EMAIL, SEND_VERIFY_EMAIL, RESET_VERIFIED_STATE } = verifyAction;

export default function VerificationForm() {
  /* Store */
  const { send, expired, loading, verified } = useSelector(verifySelector.all);

  /* Hook */
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  /* General Constant and Variables */
  // const currentTime = new Date().getTime();
  const key = localStorage.getItem('EMAIL_KEY');

  /* State */
  // console.log('expired :', expired);
  // console.log('expiredTime :', expiredTime);
  // console.log('currentTime :', currentTime);
  const expiredTime = Number(localStorage.getItem('EXPIRED_TIME'));
  const currentTime = new Date().getTime();
  const initTime = Math.floor((expiredTime - currentTime) / 1000) + 1;

  const [time, setTime] = useState(initTime);

  const [values, setValues] = useState({
    code: '',
    alertType: 'info',
    alertMessage: `입력하신 이메일로 인증 번호가 전송되었습니다. Dike 서비스 이용을 위해서 남은 시간 안에 인증을 진행해주세요.`,
  });

  const [errors, setErrors] = useState({
    code: false,
    codeMessage: '',
  });

  const [authBtnDisabled, setAuthBtnDisabled] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(false);

  const [showContent, setShowContent] = useState({
    timer: true,
    authForm: true,
    loginBtn: false,
  });

  const handleOnchange = e => {
    const { name, value } = e.target;
    /* Input Value Setting */
    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: !validationCheck(name, value),
      [`${name}Message`]: !validationCheck(name, value)
        ? validationErr[name]
        : '',
    });

    if (time > 0) {
      setAuthBtnDisabled(!validationCheck(name, value));
    }
  };

  const timeFormat = () => {
    // console.log('[timeFormat]time:', time);
    const min = Math.floor(time / 60).toString();
    let sec = (time % 60).toString();
    if (sec.length === 1) sec = `0${sec}`;
    return `남은 시간 : ${min}분 : ${sec}초`;
  };

  /* 인증 버튼 */
  const authBtn = e => {
    e.preventDefault();
    // const { key } = user;
    // console.log('[VerificationFrom][key]:', key);
    const { code } = values;

    dispatch(VERIFY_EMAIL({ code }));
  };
  /* 재전송 버튼 */
  const resendBtn = e => {
    e.preventDefault();
    dispatch(SEND_VERIFY_EMAIL());
  };

  const goLoginButton = () => {
    dispatch(RESET_VERIFIED_STATE());
    history.push(LOGIN_PATH);
  };

  useEffect(() => {
    // console.log('expiredState:', expiredState);
    if (time > 0) {
      const Counter = setInterval(() => {
        const gap = Math.floor((expiredTime - currentTime) / 1000);
        // console.log('gap :', gap);
        setTime(gap);
      }, 1000);

      return () => clearInterval(Counter);
    }
  }, [time]);

  useEffect(() => {
    if (time <= 0 && !verified) {
      setAuthBtnDisabled(true);
      setInputDisabled(true);

      setShowContent({
        ...showContent,
        timer: false,
      });

      setValues({
        ...values,
        alertType: verifyAlertMap.type.warning,
        alertMessage: verifyAlertMap.message.expired,
      });
    }
  }, [time]);

  useEffect(() => {
    if (isNil(send)) {
      return;
    }
    if (send) {
      /* 재전송 성공 */
      const resetTime = Math.floor((expired - currentTime) / 1000) + 1;

      setTime(resetTime);
      setInputDisabled(false);
      setAuthBtnDisabled(true);

      setShowContent({
        ...showContent,
        timer: true,
      });

      setValues({
        ...values,
        code: '',
        alertType: verifyAlertMap.type.info,
        alertMessage: verifyAlertMap.message.resend,
      });
    } else {
      /* 재전송 실패 */
      setAuthBtnDisabled(true);
      setShowContent({
        ...showContent,
        timer: true,
      });

      setValues({
        ...values,
        code: '',
        alertType: verifyAlertMap.type.error,
        alertMessage:
          '죄송합니다. 재전송이 실패하였습니다. 다시 한번 재전송을 시도해주세요.',
      });
    }
  }, [loading.sendEmail, send, expired]);

  useEffect(() => {
    if (isNil(verified)) {
      return;
    }
    /* 인증 성공 */
    if (verified) {
      setShowContent({
        ...showContent,
        timer: false,
        authForm: false,
        loginBtn: true,
      });

      setValues({
        ...values,
        alertType: verifyAlertMap.type.success,
        alertMessage: verifyAlertMap.message.success,
      });
    } else {
      setAuthBtnDisabled(true);

      setValues({
        ...values,
        code: '',
        alertType: verifyAlertMap.type.error,
        alertMessage: verifyAlertMap.message.failure,
      });
    }
  }, [loading.verifyEmail, verified]);

  useEffect(() => {
    if (isNil(key)) {
      setValues({
        ...values,
        alertType: verifyAlertMap.type.warning,
        alertMessage: verifyAlertMap.message.key,
      });

      setShowContent({
        ...showContent,
        timer: false,
        authForm: false,
        loginBtn: true,
      });

      // history.push(LOGIN_PATH);
    }
  }, []);

  return (
    <>
      {/* User ID */}
      <Alert
        severity={values.alertType}
        variant="outlined"
        sx={{
          mt: 1,
          mb: 3,
          wordBreak: 'keep-all',
          '& .MuiAlert-message': {
            color: 'black',
            fontSize: 12,
          },
        }}
      >
        <AlertTitle>{values.alertType}</AlertTitle>
        {values.alertMessage}
      </Alert>
      {showContent.timer ? (
        <div className={classes.remainTime}>{timeFormat(time)}</div>
      ) : null}
      {showContent.authForm ? (
        <FormControl className={classes.form} required>
          <InputLabel shrink htmlFor="bootstrap-input">
            인증 번호
          </InputLabel>
          <Input
            className={classes.input}
            type="text"
            name="code"
            disabled={inputDisabled}
            value={values.code}
            onChange={handleOnchange}
            fullWidth
            inputProps={{ maxLength: 4 }}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  onClick={authBtn}
                  disabled={authBtnDisabled}
                  className={classes.authBtn}
                  type="button"
                >
                  인증
                </Button>

                <Button
                  onClick={resendBtn}
                  className={classes.authBtn}
                  type="button"
                >
                  재전송
                </Button>
              </InputAdornment>
            }
            error={errors.code}
          />
          {loading.verifyEmail || loading.sendEmail ? (
            <BorderLinearProgress />
          ) : (
            <FormHelperText error={errors.code}>
              {errors.codeMessage}
            </FormHelperText>
          )}
        </FormControl>
      ) : null}

      {showContent.loginBtn ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={goLoginButton} className={classes.btn} type="button">
            로그인 하러 가기
          </Button>
        </Box>
      ) : null}
    </>
  );
}

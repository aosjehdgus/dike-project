/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

/* React */
import { useState, useEffect } from 'react';
/* Redux & Toolkit */
import { useDispatch, useSelector } from 'react-redux';
import { verifyAction, verifySelector } from 'features/auth/verification/slice';
/* Material UI */
import {
  Box,
  Step,
  Alert,
  Dialog,
  Button,
  Stepper,
  TextField,
  StepLabel,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useStyles } from 'features/auth/login/components/styles/dike-change-password-style';
/* Library */
import { isNil, map } from 'lodash/';

/* Import Components and Variables */
import {
  alertMap,
  validationErr,
  changePasswordSteps,
} from 'features/auth/constants/auth-constant';
import { useCounter } from 'features/auth/constants/custom-hook';
import { validationCheck } from 'features/auth/constants/auth-function';
import { BorderLinearProgress } from 'features/auth/constants/progress-bar';

const {
  VERIFY_EMAIL,
  USER_INFO_CHANGE,
  SEND_VERIFY_EMAIL,
  RESET_VERIFIED_STATE,
} = verifyAction;

export default function ChangePasswordDialog() {
  /* Store */
  const { loading, key, verified, expiredTime } = useSelector(
    verifySelector.all,
  );
  /* Custom Hook */
  const { count, start, stop, reset } = useCounter(300, 1000);
  /* Hook */
  const classes = useStyles();
  const dispatch = useDispatch();
  /* State */
  const [values, setValues] = useState({
    userId: '',
    code: '',
    password: '',
    passwordCheck: '',
    alertType: 'info',
    alertMessage: '비밀번호 분실시 이메일 인증을 통해 변경 가능합니다.',
    step: 0,
  });

  const {
    userId,
    code,
    password,
    passwordCheck,
    step,
    alertType,
    alertMessage,
  } = values;

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

  const { userIdErr, codeErr, passwordErr, passwordCheckErr } = validation;

  const [open, setOpen] = useState(false);

  const [time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0,
  });
  /* General Constant and Variables */

  // const remainTime = Math.floor((expiredTime - currentTime) / 1000);

  const handleOkBtn = () => {
    // console.log('validation.userIdErr', validation.userIdErr);
    // console.log('validation.codeErr', validation.codeErr);
    // console.log('validation.passwordErr', validation.passwordErr);
    if (step === 0 && !userIdErr) {
      dispatch(SEND_VERIFY_EMAIL({ userId }));
      // SEND_VERIFY_EMAIL이 SUCCESS 이면, expiredTime을 받아서 계산 후, 타이머 시작
      start();
      setValues({
        ...values,
        step: step + 1,
        alertMessage: alertMap.message.send,
      });
    } else if (step === 1 && key && !codeErr) {
      dispatch(VERIFY_EMAIL({ key, code }));
      if (!verified) {
        stop();
        setValues({
          ...values,
          step: step + 1,
        });
      }
    } else if (step === 2 && key && !passwordErr && !passwordCheckErr) {
      dispatch(USER_INFO_CHANGE({ key, password }));
      setValues({
        ...values,
        step: step + 1,
        alertType: alertMap.type.success,
        alertMessage: alertMap.change,
      });
    }
  };

  /* Modal Open and Close Button */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({ ...values, step: 0 });
    stop();
    dispatch(RESET_VERIFIED_STATE());
  };

  /* Handle Change Value */
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
      password === value
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

  useEffect(() => {
    /* 인증 실패 */
    if (verified === false) {
      setValues({
        ...values,
        code: '',
        alertType: alertMap.type.error,
        alertMessage: alertMap.message.failure,
      });
    }

    if (isNil(verified)) {
      setValues({
        ...values,
        userId: '',
        code: '',
        password: '',
        passwordCheck: '',
        alertType: alertMap.type.info,
        alertMessage: alertMap.info,
      });
    }
  }, [loading.verifyEmail, verified]);

  return (
    <>
      <Button className={classes.changeBtn} onClick={handleClickOpen}>
        비밀번호 변경
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>비밀번호 변경</DialogTitle>
          <Box
            sx={{
              width: '100%',
              typography: 'body1',
            }}
          >
            <Box
              sx={{
                borderBottom: 2,
                borderColor: 'divider',
              }}
            />
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  paddingBottom: 2,
                  paddingTop: 2,
                  borderBottom: 2,
                  borderColor: 'divider',
                }}
              >
                <Stepper className={classes.stepper} activeStep={step}>
                  {map(changePasswordSteps, label => {
                    return (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>

              <Typography component="span" sx={{ mt: 2, mb: 1 }}>
                {step === 0 ? (
                  <>
                    <TextField
                      autoFocus
                      fullWidth
                      type="email"
                      margin="dense"
                      label="이메일(아이디)"
                      id="userId"
                      variant="standard"
                      onChange={handleOnChange}
                      value={userId}
                      error={userIdErr}
                      helperText={validation.userId}
                    />
                  </>
                ) : step === 1 ? (
                  <>
                    <div className={classes.remainTime}>
                      남은 시간 : {time.hour}시간 {time.min}분 {time.sec}초
                    </div>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      label="인증 번호"
                      id="code"
                      variant="standard"
                      onChange={handleOnChange}
                      value={code}
                      error={codeErr}
                      helperText={
                        loading.verifyEmail ? (
                          <BorderLinearProgress />
                        ) : (
                          validation.code
                        )
                      }
                      inputProps={{ maxLength: 4 }}
                    />
                  </>
                ) : step === 2 ? (
                  <>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      label="비밀번호"
                      id="password"
                      variant="standard"
                      onChange={handleOnChange}
                      value={password}
                      error={passwordErr}
                      helperText={validation.password}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      margin="dense"
                      label="비밀번호 확인"
                      id="passwordCheck"
                      variant="standard"
                      onChange={handleOnChange}
                      value={passwordCheck}
                      error={passwordCheckErr}
                      helperText={validation.passwordCheck}
                    />
                  </>
                ) : step === 3 ? (
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
                      <Alert
                        className={classes.alert}
                        severity={alertType}
                        color={alertType}
                      >
                        {alertMessage}
                      </Alert>
                    )}
                  </Box>
                ) : null}
              </Typography>
              {step === 0 ? (
                <Alert
                  className={classes.alert}
                  severity={alertType}
                  color={alertType}
                >
                  {alertMessage}
                </Alert>
              ) : step === 1 ? (
                <Alert
                  className={classes.alert}
                  severity={alertType}
                  color={alertType}
                >
                  {alertMessage}
                </Alert>
              ) : null}

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={handleClose}>
                  {step === 3 ? '닫기' : '취소'}
                </Button>

                {step === 3 ? null : (
                  <Button className={classes.btn} onClick={handleOkBtn}>
                    확인
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* 순서 
    1. [SEND_VERIFY_EMAIL]          이메일을 입력 받고, 인증 번호를 보내준다.
    2. [SEND_VERIFY_EMAIL_SUCCESS]  Key와 Expired Time을 리턴 받는다.
    3. [VERIFY_EMAIL]               인증 번호를 입력 받고, Key와 함께 인증 요청한다.
    4. [VERIFY_EMAIL_SUCCESS]       새로운 key를 리턴 받는다.
    5. [USER_INFO_CHANGE]           변경할 비밀번호를 입력 받고, 새로운 key와 함께 변경 요청을 한다.
    6. [USER_INFO_CHANGE_SUCCESS]   비밀번호 변경 성공 문구를 보여준다.
*/

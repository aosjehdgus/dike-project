/* eslint-disable no-unused-vars */
import { put, takeLatest, all, call } from 'redux-saga/effects';
import dikeService from 'services/DikeService';
import { verifyAction } from './slice';

export function* sendVerifyEmailSaga() {
  const { SEND_VERIFY_EMAIL_SUCCESS, SEND_VERIFY_EMAIL_FAILURE } = verifyAction;
  const key = localStorage.getItem('EMAIL_KEY');

  try {
    const res = yield call(dikeService.sendVerifyEmail, { key });
    if (res && res.status === 200 && res.data) {
      const user = res.data;
      const { emailVerificationKey, expireTimeForEmailVerification } = user;

      yield put(
        SEND_VERIFY_EMAIL_SUCCESS({
          emailVerificationKey,
          expireTimeForEmailVerification,
        }),
      );
      localStorage.setItem('EMAIL_KEY', emailVerificationKey);
      localStorage.setItem('EXPIRED_TIME', expireTimeForEmailVerification);
    } else {
      yield put(SEND_VERIFY_EMAIL_FAILURE({}));
    }
  } catch (err) {
    yield put(SEND_VERIFY_EMAIL_FAILURE({}));
  }
}

export function* verifyEmailSaga({ payload }) {
  const { VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE } = verifyAction;
  const { code } = payload;
  const key = localStorage.getItem('EMAIL_KEY');
  // console.log('[VERIFY][saga][verifyEmailSaga][key]:', key);
  // console.log('[VERIFY][saga][verifyEmailSaga][code]:', code);
  try {
    const res = yield call(dikeService.verifiyEmail, { key, code });
    // 새로 전달 받은 키 값
    if (res && res.status === 200 && res.data) {
      yield put(VERIFY_EMAIL_SUCCESS(res.data));
      localStorage.removeItem('EMAIL_KEY');
      localStorage.removeItem('EXPIRED_TIME');
    } else {
      yield put(VERIFY_EMAIL_FAILURE({}));
    }
  } catch (err) {
    yield put(VERIFY_EMAIL_FAILURE(err));
  }
}

export default function* watchVerifySaga() {
  const { VERIFY_EMAIL, SEND_VERIFY_EMAIL } = verifyAction;
  yield all([
    takeLatest(VERIFY_EMAIL, verifyEmailSaga),
    takeLatest(SEND_VERIFY_EMAIL, sendVerifyEmailSaga),
  ]);
}

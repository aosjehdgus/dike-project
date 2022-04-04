/* eslint-disable no-unused-vars */
import { VERIFICATION_PATH } from 'configs/AppConfig';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import dikeService from 'services/DikeService';
import { registerAction } from './slice';

export function* registerSaga({ payload }) {
  const { REGISTER_PENDING, REGISTER_FAILURE } = registerAction;

  const { name, userId, password, history } = payload;

  try {
    const res = yield call(dikeService.register, {
      userId,
      name,
      password,
      level: 'worker',
      information: {},
      type: 'email',
      projects: ['dike'],
      emailVerification: true,
    });
    /* 순서 
    1. REGISTER action을 통해 value 값들을 받는다
    2. response data 로 pending 상태의 유저와 key를 받는다
    3. 이메일 인증 화면으로 이동한다.
    4. key 값과 함께 인증을 진행한다. 
    */

    if (res && res.status === 200 && res.data) {
      const user = res.data;
      const { status, emailVerificationKey, expireTimeForEmailVerification } =
        user;

      // console.log('[registerSaga][res.data]:', res.data);
      // console.log('[registerSaga][status]:', status);
      if (status === 'pending') {
        yield put(REGISTER_PENDING());

        localStorage.setItem('EMAIL_KEY', emailVerificationKey);
        localStorage.setItem('EXPIRED_TIME', expireTimeForEmailVerification);

        history.push(VERIFICATION_PATH);
      }
    } else {
      yield put(REGISTER_FAILURE({}));
    }
  } catch (err) {
    yield put(REGISTER_FAILURE(err));
  }
}

export function* userIdDuplicateCheckSaga({ payload }) {
  const { USERID_DUPLICATE_CHECK_SUCCESS, USERID_DUPLICATE_CHECK_FAILURE } =
    registerAction;
  const { userId } = payload;
  try {
    // console.log('[Register][saga][duplicateCheckSaga][userId]:', userId);
    const res = yield call(dikeService.duplicateCheck, { userId });

    if (res && res.status === 200 && res.data) {
      const { duplicated } = res.data;

      yield put(USERID_DUPLICATE_CHECK_SUCCESS({ duplicated }));
    } else {
      yield put(USERID_DUPLICATE_CHECK_FAILURE({}));
    }
  } catch (err) {
    yield put(USERID_DUPLICATE_CHECK_FAILURE(err));
  }
}

export default function* watchRegisterSaga() {
  const { REGISTER, USERID_DUPLICATE_CHECK } = registerAction;
  yield all([
    takeLatest(REGISTER, registerSaga),
    takeLatest(USERID_DUPLICATE_CHECK, userIdDuplicateCheckSaga),
  ]);
}

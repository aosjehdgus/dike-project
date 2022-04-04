/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

import { delay, put, takeLatest, call, all } from 'redux-saga/effects';
import dikeService from 'services/DikeService';
import {
  APP_PREFIX_PATH,
  LOGIN_PATH,
  VERIFICATION_PATH,
} from 'configs/AppConfig';
import _ from 'lodash';
import { loginAction } from './slice';

export function* getMyInfoSaga() {
  const { GET_MY_INFO_SUCCESS, GET_MY_INFO_FAILURE } = loginAction;

  try {
    const res = yield call(dikeService.getMyInfo, {});

    if (res && res.status === 200 && res.data) {
      yield put(GET_MY_INFO_SUCCESS(res.data));
    }
  } catch (err) {
    yield put(GET_MY_INFO_FAILURE(err.message));
    localStorage.removeItem('IS_LOGGED_IN');
  }
}

export function* loginSaga({ payload }) {
  const { LOGIN_SUCCESS, LOGIN_FAILURE, INITIALIZE_MESSAGE_STATE } =
    loginAction;
  const { userId, password, history } = payload;
  // console.log('[login][saga][payload] : ', payload);
  // console.log('[login][saga][payload.userId]:', payload.userId);
  // console.log('[login][saga][payload.password]:', payload.password);
  // console.log('[login][saga][payload.history]:', payload.history);
  try {
    const res = yield call(dikeService.login, { userId, password });

    if (res && res.status === 200 && res.data) {
      yield put(LOGIN_SUCCESS(res.data));
      localStorage.setItem('IS_LOGGED_IN', true);
      history.push(APP_PREFIX_PATH);
    }

    if (res && res.status === 404) {
      yield put(
        LOGIN_FAILURE(
          '죄송합니다. 이 이메일 주소를 사용하는 계정을 찾을 수 없습니다. 다시 시도하시거나 새로운 계정을 등록하세요.',
        ),
      );
    }

    if (res && res.status === 403) {
      yield put(
        LOGIN_FAILURE(
          '죄송합니다. 인증이 필요한 이메일입니다. 인증 페이지로 이동합니다.',
        ),
      );
      yield delay(2000);
      history.push(VERIFICATION_PATH);
      yield put(INITIALIZE_MESSAGE_STATE());
    }
  } catch (err) {
    const { response } = err;
    if (!response) {
      yield put(LOGIN_FAILURE(err.message));
    } else {
      const { status } = response;
      if (status === 401) {
        yield put(
          LOGIN_FAILURE(
            '비밀번호를 잘못 입력하셨습니다. 비밀번호 확인 후 다시 시도해주세요.',
          ),
        );
      } else {
        yield put(LOGIN_FAILURE(err.message));
      }
    }
  }
}
export function* logoutSaga({ payload }) {
  const { LOGOUT_SUCCESS, LOGOUT_FAILURE } = loginAction;
  const { history } = payload;
  // console.log('[login][saga][payload] : ', payload);
  // console.log('[login][saga][payload.userId]:', payload.userId);
  // console.log('[login][saga][payload.password]:', payload.password);
  try {
    const res = yield call(dikeService.logout, payload);

    // console.log('[login][saga][res]:', res.status);
    // console.log('[login][saga][res.data]:', res.data);
    if (res && res.status === 200) {
      yield put(LOGOUT_SUCCESS({}));
      localStorage.removeItem('IS_LOGGED_IN');
      history.push(LOGIN_PATH);
    } else {
      yield put(LOGOUT_FAILURE({}));
    }
  } catch (err) {
    yield put(LOGOUT_FAILURE(err.message));
  }
}

export function* loginWithKaKaoSaga({ payload }) {
  const { KAKAO_LOGIN_SUCCESS, KAKAO_LOGIN_FAILURE } = loginAction;
  const { code, callbackURL, history } = payload;
  try {
    // console.log('[saga][loginWithKakaoSaga][payload] :', payload);
    // console.log('[saga][loginWithKakaoSaga][code] :', code);
    // console.log('[saga][loginWithKakaoSaga][callbackURL] :', callbackURL);
    const res = yield call(dikeService.kakaoLoginCallback, {
      code,
      callbackURL,
    });
    // console.log('[saga][loginWithKakaoSaga][res] :', res);

    if (res && res.status === 200 && res.data) {
      // console.log('[saga][loginWithKakaoSaga][res] :', res.data);
      yield put(KAKAO_LOGIN_SUCCESS(res.data));
      history.push(APP_PREFIX_PATH);
    } else {
      // NOTE: 다른 응답 코드를 받았을 때의 error 처리 필요
      yield put(KAKAO_LOGIN_SUCCESS({}));
    }
  } catch (err) {
    yield put(KAKAO_LOGIN_FAILURE(err.message));
  }
}

export default function* watchLoginSaga() {
  const { GET_MY_INFO, LOGIN, LOGOUT, KAKAO_LOGIN } = loginAction;

  yield all([
    takeLatest(LOGIN, loginSaga),
    takeLatest(GET_MY_INFO, getMyInfoSaga),
    takeLatest(LOGOUT, logoutSaga),
    takeLatest(KAKAO_LOGIN, loginWithKaKaoSaga),
  ]);
}

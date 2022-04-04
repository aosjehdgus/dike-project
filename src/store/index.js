/* eslint-disable import/prefer-default-export */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { all } from '@redux-saga/core/effects';

/* Slice part */
import { LOGIN, loginReducer } from 'features/auth/login/slice';
import { REGISTER, registerReducer } from 'features/auth/register/slice';
import { VERIFY, verifyReducer } from 'features/auth/verification/slice';
import { NOTICE, noticeReducer } from 'features/app/notice/slice';
import { MANAGE_USER, manageUserReducer } from 'features/app/manage-user/slice';
import {
  CURRENT_WORK,
  currentWorkReducer,
} from 'features/app/current-work/slice';

/* Saga part  */
import watchLoginSaga from 'features/auth/login/saga';
import watchRegisterSaga from 'features/auth/register/saga';
import watchVerifySaga from 'features/auth/verification/saga';
import watchNoticeSaga from 'features/app/notice/saga';
import watchManageUserSaga from 'features/app/manage-user/saga';
import watchCurrentWorkSaga from 'features/app/current-work/saga';

// import watchLoginWithKaKaoSaga from 'features/auth/KaKaoLogin/saga';
// import getKaKaoSaga from 'features/auth/KaKaoLogin/saga';

export const rootReducer = combineReducers({
  [LOGIN]: loginReducer,
  [REGISTER]: registerReducer,
  [VERIFY]: verifyReducer,
  [NOTICE]: noticeReducer,
  [MANAGE_USER]: manageUserReducer,
  [CURRENT_WORK]: currentWorkReducer,
});

const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchRegisterSaga(),
    watchVerifySaga(),
    watchNoticeSaga(),
    watchManageUserSaga(),
    watchCurrentWorkSaga(),
  ]);
}

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;

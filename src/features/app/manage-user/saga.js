/* eslint-disable no-unused-vars */

/* Saga */
import { put, takeLatest, all, call } from 'redux-saga/effects';
/* Redux Toolkit */
import { manageUserAction } from 'features/app/manage-user/slice';
/* API */
import dikeService from 'services/DikeService';

export function* getUserSaga() {
  const { GET_USER_SUCCESS, GET_USER_FAILURE } = manageUserAction;

  try {
    const res = yield call(dikeService.getUsers, { skip: 0, limit: 20 });

    if (res && res.status === 200 && res.data) {
      const user = res.data;

      yield put(GET_USER_SUCCESS({ user }));
    } else {
      yield put(GET_USER_FAILURE({}));
    }
  } catch (err) {
    yield put(GET_USER_FAILURE({}));
  }
}

export function* getUserWorkStatusSaga() {
  const { GET_USER_WORK_STATUS_SUCCESS, GET_USER_WORK_STATUS_FAILURE } =
    manageUserAction;
  try {
    const res = yield call(dikeService.getUserWorkStatus, {
      skip: 0,
      limit: 20,
    });

    if (res && res.status === 200 && res.data) {
      const userWorkStatus = res.data;

      yield put(GET_USER_WORK_STATUS_SUCCESS({ userWorkStatus }));
    } else {
      yield put(GET_USER_WORK_STATUS_FAILURE({}));
    }
  } catch (err) {
    yield put(GET_USER_WORK_STATUS_FAILURE({ err }));
  }
}

export function* editUserSaga({ payload }) {
  const { EDIT_USER_SUCCESS, EDIT_USER_FAILURE } = manageUserAction;
  // console.log('[editUserSaga][payload]:', payload);
  try {
    const res = yield call(dikeService.modifyUser, payload);

    if (res && res.status === 200 && res.data) {
      const user = res.data;
      // console.log('[editUserSaga][user]:', user);
      yield put(EDIT_USER_SUCCESS({ user }));
    } else {
      yield put(EDIT_USER_FAILURE({}));
    }
  } catch (err) {
    yield put(EDIT_USER_FAILURE({}));
  }
}

export function* deleteUserSaga({ payload }) {
  const { DELETE_USER_SUCCESS, DELETE_USER_FAILURE } = manageUserAction;
  // console.log('[deleteNoticeSaga][payload]:', payload);
  try {
    const res = yield call(dikeService.deleteUser, payload);

    if (res && res.status === 200 && res.data) {
      const user = res.data;

      yield put(DELETE_USER_SUCCESS({ user }));
    } else {
      yield put(DELETE_USER_FAILURE({}));
    }
  } catch (err) {
    yield put(DELETE_USER_FAILURE({}));
  }
}

export default function* watchManageUserSaga() {
  const { GET_USER, EDIT_USER, DELETE_USER, GET_USER_WORK_STATUS } =
    manageUserAction;
  yield all([
    takeLatest(GET_USER, getUserSaga),
    takeLatest(EDIT_USER, editUserSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
    takeLatest(GET_USER_WORK_STATUS, getUserWorkStatusSaga),
  ]);
}

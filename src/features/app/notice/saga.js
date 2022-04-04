/* eslint-disable no-unused-vars */
/* React */
/* Redux & Toolkit */
/* Material UI */
/* Icons */
/* Library */
/* Import Components */
import { put, takeLatest, all, call } from 'redux-saga/effects';
import dikeService from 'services/DikeService';
import { noticeAction } from './slice';

export function* getNoticeListSaga() {
  const { GET_NOTICE_LIST_SUCCESS, GET_NOTICE_LIST_FAILURE } = noticeAction;

  try {
    const res = yield call(dikeService.getNoticeList);
    if (res && res.status === 200 && res.data) {
      const notices = res.data;

      // console.log('[registerSaga][status]:', status);

      yield put(GET_NOTICE_LIST_SUCCESS({ notices }));
    } else {
      yield put(GET_NOTICE_LIST_FAILURE({}));
    }
  } catch (err) {
    yield put(GET_NOTICE_LIST_FAILURE({}));
  }
}

export function* addNoticeSaga({ payload }) {
  const { GET_NOTICE_LIST, ADD_NOTICE_SUCCESS, ADD_NOTICE_FAILURE } =
    noticeAction;

  const { type, title, link, registrationDateTime } = payload;

  // console.log('payload:', payload);

  try {
    const res = yield call(dikeService.addNotice, {
      type,
      title,
      link,
      registrationDateTime,
    });

    if (res && res.status === 200 && res.data) {
      const notice = res.data;
      // console.log('notice:', notice);

      yield put(ADD_NOTICE_SUCCESS({ notice }));

      if (notice) {
        yield put(GET_NOTICE_LIST());
      }
    } else {
      yield put(ADD_NOTICE_FAILURE({}));
    }
  } catch (err) {
    yield put(ADD_NOTICE_FAILURE({}));
  }
}
export function* deleteNoticeSaga({ payload }) {
  const { GET_NOTICE_LIST, DELETE_NOTICE_SUCCESS, DELETE_NOTICE_FAILURE } =
    noticeAction;

  // console.log('[deleteNoticeSaga][payload]:', payload);

  try {
    const res = yield call(dikeService.deleteNotice, payload);

    if (res && res.status === 200 && res.data) {
      const notice = res.data;

      yield put(DELETE_NOTICE_SUCCESS({ notice }));

      if (notice) {
        yield put(GET_NOTICE_LIST());
      }
    } else {
      yield put(DELETE_NOTICE_FAILURE({}));
    }
  } catch (err) {
    yield put(DELETE_NOTICE_FAILURE({}));
  }
}

export default function* watchNoticeSaga() {
  const { GET_NOTICE_LIST, ADD_NOTICE, DELETE_NOTICE } = noticeAction;
  yield all([
    takeLatest(GET_NOTICE_LIST, getNoticeListSaga),
    takeLatest(ADD_NOTICE, addNoticeSaga),
    takeLatest(DELETE_NOTICE, deleteNoticeSaga),
  ]);
}

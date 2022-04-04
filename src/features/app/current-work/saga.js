/* eslint-disable no-unused-vars */

/* Saga */
import { put, takeLatest, all, call } from 'redux-saga/effects';
/* Redux Toolkit */
import { currentWorkAction } from 'features/app/current-work/slice';
/* API */
import dikeService from 'services/DikeService';

export function* getTodoTaskSaga({ payload }) {
  const { GET_SELECTED_TASK, GET_TODO_TASK_SUCCESS, GET_TODO_TASK_FAILURE } =
    currentWorkAction;

  try {
    const res = yield call(dikeService.getTodoTask, { payload });

    if (res && res.status === 200 && res.data) {
      const task = res.data;
      // console.log('[getExpressionSaga][expression]:', expression);
      yield put(GET_TODO_TASK_SUCCESS({ task }));
    } else if (res && res.status === 204) {
      yield put(GET_SELECTED_TASK({ number: 1 }));
    } else {
      yield put(GET_TODO_TASK_FAILURE({}));
    }
  } catch (err) {
    yield put(GET_TODO_TASK_FAILURE({}));
  }
}

export function* getPrevTaskSaga({ payload }) {
  const { GET_PREV_TASK_SUCCESS, GET_PREV_TASK_FAILURE, GET_EMPTY_TASK } =
    currentWorkAction;

  try {
    const res = yield call(dikeService.getPrevTask, payload);

    if (res && res.status === 200 && res.data) {
      const task = res.data;
      // console.log('[getPrevTASKSaga][TASK]:', TASK);

      yield put(GET_PREV_TASK_SUCCESS({ task }));
    } else if (res && res.status === 204) {
      yield put(GET_EMPTY_TASK());
    } else {
      yield put(GET_PREV_TASK_FAILURE({}));
    }
  } catch (err) {
    yield put(GET_PREV_TASK_FAILURE({}));
  }
}

export function* getNextTaskSaga({ payload }) {
  const { GET_TODO_TASK, GET_NEXT_TASK_SUCCESS, GET_NEXT_TASK_FAILURE } =
    currentWorkAction;

  try {
    const res = yield call(dikeService.getNextTask, payload);

    if (res && res.status === 200 && res.data) {
      const task = res.data;

      yield put(GET_NEXT_TASK_SUCCESS({ task }));
    } else if (res && res.status === 204) {
      yield put(GET_TODO_TASK());
    } else {
      yield put(GET_NEXT_TASK_FAILURE({}));
    }
  } catch (err) {
    yield put(GET_NEXT_TASK_FAILURE({}));
  }
}

export function* getSelectedTaskSaga({ payload }) {
  const {
    GET_EMPTY_TASK,
    GET_SELECTED_TASK_SUCCESS,
    GET_SELECTED_TASK_FAILURE,
  } = currentWorkAction;

  try {
    const res = yield call(dikeService.getSelectedTask, payload);

    if (res && res.status === 200 && res.data) {
      const task = res.data;
      // console.log('[getExpressionSaga][expression]:', expression);
      yield put(GET_SELECTED_TASK_SUCCESS({ task }));
    } else if (res && res.status === 204) {
      yield put(GET_EMPTY_TASK());
    } else {
      yield put(GET_SELECTED_TASK_FAILURE({}));
    }
  } catch (err) {
    yield put(GET_SELECTED_TASK_FAILURE({}));
  }
}

export function* updateTaskSaga({ payload }) {
  // console.log('[updateTaskSaga][payload]:', payload);
  const {
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAILURE,
    GET_NEXT_TASK,
    GET_PREV_TASK,
  } = currentWorkAction;

  const { id, direction } = payload;

  try {
    const res = yield call(dikeService.updateTask, payload);

    if (res && res.status === 200 && res.data) {
      const task = res.data;
      // console.log('[updateExpressionSaga][task]:', task);

      yield put(UPDATE_TASK_SUCCESS({ task }));
      if (direction === 'next') {
        yield put(GET_NEXT_TASK({ id }));
      } else {
        yield put(GET_PREV_TASK({ id }));
      }
    } else {
      yield put(UPDATE_TASK_FAILURE({}));
    }
  } catch (err) {
    yield put(UPDATE_TASK_FAILURE({ err }));
  }
}

export default function* watchCurrentWorkSaga() {
  const {
    GET_TODO_TASK,
    GET_NEXT_TASK,
    GET_PREV_TASK,
    UPDATE_TASK,
    GET_SELECTED_TASK,
  } = currentWorkAction;

  yield all([
    takeLatest(GET_TODO_TASK, getTodoTaskSaga),
    takeLatest(GET_NEXT_TASK, getNextTaskSaga),
    takeLatest(GET_PREV_TASK, getPrevTaskSaga),
    takeLatest(UPDATE_TASK, updateTaskSaga),
    takeLatest(GET_SELECTED_TASK, getSelectedTaskSaga),
  ]);
}

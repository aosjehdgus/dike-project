/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const name = 'notice';
const initialState = {
  notice: {},
  notices: [],
  loading: false,
  error: '',
};

const reducers = {
  GET_NOTICE_LIST: state => {
    state.loading = true;
    state.notices = [];
  },
  GET_NOTICE_LIST_SUCCESS: (state, { payload }) => {
    // console.log('payload:', payload);
    state.loading = false;
    state.notices = payload.notices;
  },
  GET_NOTICE_LIST_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
  ADD_NOTICE: state => {
    state.loading = true;
    state.notice = {};
  },
  ADD_NOTICE_SUCCESS: (state, { payload }) => {
    // console.log('payload:', payload);
    state.loading = false;
    state.notice = payload.notice;
  },
  ADD_NOTICE_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
  DELETE_NOTICE: state => {
    state.loading = true;
  },
  DELETE_NOTICE_SUCCESS: (state, { payload }) => {
    // console.log('payload:', payload);
    state.loading = false;
    state.notice = payload.notice;
  },
  DELETE_NOTICE_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
};

const slice = createSlice({ name, initialState, reducers });

const selectNoticeState = createSelector(
  state => state.notice,
  notice => notice,
);

const selectNoticesState = createSelector(
  state => state.notices,
  notices => notices,
);

const selectLoadingState = createSelector(
  state => state.loading,
  loading => loading,
);

const selectErrorState = createSelector(
  state => state.error,
  error => error,
);

const selectAllState = createSelector(
  selectNoticeState,
  selectNoticesState,
  selectLoadingState,
  selectErrorState,
  (notice, notices, loading, error) => {
    return {
      notice,
      notices,
      loading,
      error,
    };
  },
);

export const NOTICE = slice.name;
export const noticeReducer = slice.reducer;
export const noticeAction = slice.actions;

export const noticeSelector = {
  notice: state => selectNoticeState(state[NOTICE]),
  notices: state => selectNoticesState(state[NOTICE]),
  loading: state => selectLoadingState(state[NOTICE]),
  error: state => selectErrorState(state[NOTICE]),
  all: state => selectAllState(state[NOTICE]),
};

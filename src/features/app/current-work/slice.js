/* eslint-disable no-param-reassign */

/* Redux Toolkit */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const name = 'currentWork';
const initialState = {
  task: {},
  loading: false,
  error: '',
};

const reducers = {
  GET_TODO_TASK: state => {
    state.loading = true;
    state.task = {};
  },
  GET_TODO_TASK_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.task = payload.task;
  },
  GET_TODO_TASK_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
  GET_NEXT_TASK: state => {
    state.loading = true;
    state.task = {};
  },
  GET_EMPTY_TASK: state => {
    state.loading = false;
    state.task = {};
  },
  GET_NEXT_TASK_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.task = payload.task;
  },
  GET_NEXT_TASK_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
  GET_PREV_TASK: state => {
    state.loading = true;
    state.task = {};
  },
  GET_PREV_TASK_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.task = payload.task;
  },
  GET_PREV_TASK_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
  GET_SELECTED_TASK: state => {
    state.loading = true;
    state.task = {};
  },
  GET_SELECTED_TASK_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.task = payload.task;
  },
  GET_SELECTED_TASK_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
  UPDATE_TASK: state => {
    state.loading = true;
    state.task = {};
  },
  UPDATE_TASK_SUCCESS: (state, { payload }) => {
    // console.log('payload:', payload);
    state.loading = false;
    state.task = payload.task;
  },
  UPDATE_TASK_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
};

const slice = createSlice({ name, initialState, reducers });

const selectTaskState = createSelector(
  state => state.task,
  task => task,
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
  selectTaskState,
  selectLoadingState,
  selectErrorState,
  (task, loading, error) => {
    return {
      task,
      loading,
      error,
    };
  },
);

export const CURRENT_WORK = slice.name;
export const currentWorkReducer = slice.reducer;
export const currentWorkAction = slice.actions;

export const currentWorkSelector = {
  task: state => selectTaskState(state[CURRENT_WORK]),
  loading: state => selectLoadingState(state[CURRENT_WORK]),
  error: state => selectErrorState(state[CURRENT_WORK]),
  all: state => selectAllState(state[CURRENT_WORK]),
};

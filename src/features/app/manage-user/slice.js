/* eslint-disable no-param-reassign */

/* Redux Toolkit */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const name = 'manageUser';
const initialState = {
  user: {},
  userWorkStatus: {},
  editState: '',
  deleteState: '',
  loading: false,
  error: '',
};

const reducers = {
  GET_USER: state => {
    state.loading = true;
    state.user = {};
  },
  GET_USER_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.user = payload.user;
  },
  GET_USER_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
  GET_USER_WORK_STATUS: state => {
    state.loading = true;
    state.userWorkStatus = {};
  },
  GET_USER_WORK_STATUS_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.userWorkStatus = payload.userWorkStatus;
  },
  GET_USER_WORK_STATUS_FAILURE: (state, err) => {
    state.loading = false;
    state.userWorkStatus = err;
  },
  EDIT_USER: state => {
    state.loading = true;
    state.editState = '';
  },
  EDIT_USER_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.editState = payload.user;
  },
  EDIT_USER_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
  DELETE_USER: state => {
    state.loading = true;
    state.deleteState = '';
  },
  DELETE_USER_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.deleteState = payload.user;
  },
  DELETE_USER_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
};

const slice = createSlice({ name, initialState, reducers });

const selectUserState = createSelector(
  state => state.user,
  user => user,
);

const selectStatusState = createSelector(
  state => state.userWorkStatus,
  userWorkStatus => userWorkStatus,
);

const selectEditState = createSelector(
  state => state.editState,
  editState => editState,
);

const selectDeleteState = createSelector(
  state => state.deleteState,
  deleteState => deleteState,
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
  selectUserState,
  selectStatusState,
  selectEditState,
  selectDeleteState,
  selectLoadingState,
  selectErrorState,
  (user, userWorkStatus, editState, deleteState, loading, error) => {
    return {
      user,
      userWorkStatus,
      editState,
      deleteState,
      loading,
      error,
    };
  },
);

export const MANAGE_USER = slice.name;
export const manageUserReducer = slice.reducer;
export const manageUserAction = slice.actions;

export const manageUserSelector = {
  user: state => selectUserState(state[MANAGE_USER]),
  userWorkStatus: state => selectStatusState(state[MANAGE_USER]),
  editState: state => selectEditState(state[MANAGE_USER]),
  deleteState: state => selectDeleteState(state[MANAGE_USER]),
  loading: state => selectLoadingState(state[MANAGE_USER]),
  error: state => selectErrorState(state[MANAGE_USER]),
  all: state => selectAllState(state[MANAGE_USER]),
};

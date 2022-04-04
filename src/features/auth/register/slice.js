/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const name = 'register';
const initialState = {
  user: null,
  loading: {
    register: false,
    duplicated: false,
  },
  error: '',
  message: '',
  duplicated: null,
  key: '',
  expiredTime: 0,
};

const reducers = {
  REGISTER: state => {
    state.loading.register = true;
  },
  REGISTER_PENDING: state => {
    // console.log('[slice][payload]:', payload);
    state.loading.register = false;
  },
  REGISTER_SUCCESS: (state, { payload }) => {
    state.user = payload;
  },
  REGISTER_FAILURE: (state, err) => {
    state.error = err;
  },
  INITIALIZE_DUPLICATE_STATE: state => {
    state.duplicated = null;
  },
  USERID_DUPLICATE_CHECK: state => {
    state.loading.duplicated = true;
  },
  USERID_DUPLICATE_CHECK_SUCCESS: (state, { payload }) => {
    state.loading.duplicated = false;
    state.duplicated = payload.duplicated;
  },
  USERID_DUPLICATE_CHECK_FAILURE: (state, err) => {
    state.loading.duplicated = false;
    state.error = err;
  },
};

const slice = createSlice({ name, initialState, reducers });

const selectUserState = createSelector(
  state => state.user,
  user => user,
);

const selectLoadingState = createSelector(
  state => state.loading,
  loading => loading,
);

const selectErrorState = createSelector(
  state => state.error,
  error => error,
);

const selectMessageState = createSelector(
  state => state.message,
  message => message,
);

const selectDuplicatedState = createSelector(
  state => state.duplicated,
  duplicated => duplicated,
);

const selectKeyState = createSelector(
  state => state.key,
  key => key,
);

const selectExpiredTimeState = createSelector(
  state => state.expiredTime,
  expiredTime => expiredTime,
);

const selectAllState = createSelector(
  selectUserState,
  selectLoadingState,
  selectMessageState,
  selectErrorState,
  selectDuplicatedState,
  selectKeyState,
  selectExpiredTimeState,
  (user, loading, message, error, duplicated, key, expiredTime) => {
    return {
      user,
      loading,
      message,
      error,
      duplicated,
      key,
      expiredTime,
    };
  },
);

export const REGISTER = slice.name;
export const registerReducer = slice.reducer;
export const registerAction = slice.actions;

export const registerSelector = {
  user: state => selectUserState(state[REGISTER]),
  loading: state => selectLoadingState(state[REGISTER]),
  message: state => selectMessageState(state[REGISTER]),
  duplicated: state => selectDuplicatedState(state[REGISTER]),
  key: state => selectKeyState(state[REGISTER]),
  expiredTime: state => selectExpiredTimeState(state[REGISTER]),
  error: state => selectErrorState(state[REGISTER]),
  all: state => selectAllState(state[REGISTER]),
};

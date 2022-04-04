/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const name = 'login';
const initialState = {
  me: {},
  isLoggedIn: false,
  message: '',
  user: null,
  loading: false,
  error: null,
};

const reducers = {
  GET_MY_INFO: state => {
    state.loading = true;
    state.isLoggedIn = false;
    state.me = {};
  },
  GET_MY_INFO_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.isLoggedIn = true;
    state.me = payload;
  },
  GET_MY_INFO_FAILURE: state => {
    state.loading = false;
  },
  LOGIN: state => {
    state.isLoggedIn = false;
    state.loading = true;
  },
  LOGIN_SUCCESS: (state, { payload }) => {
    // console.log('[slice][loginSuccess][payload] : ', payload);
    state.loading = false;
    state.user = payload;
    state.isLoggedIn = true;
    state.message = '';
  },
  LOGIN_FAILURE: (state, { payload }) => {
    state.loading = false;
    state.message = payload;
    state.isLoggedIn = false;
  },
  LOGOUT: state => {
    state.loading = true;
  },
  LOGOUT_SUCCESS: state => {
    state.me = null;
    state.loading = false;
    state.isLoggedIn = false;
  },
  LOGOUT_FAILURE: (state, err) => {
    state.loading = false;
    state.error = err;
  },
  INITIALIZE_MESSAGE_STATE: state => {
    state.message = '';
  },
  KAKAO_LOGIN: state => {
    // console.log('[slice][kakaoLogin][payload] :', payload);
    state.isLoggedIn = false;
    state.loading = true;
  },
  KAKAO_LOGIN_SUCCESS: (state, { payload }) => {
    state.loading = false;
    state.user = payload;
    state.isLoggedIn = true;
  },
  KAKAO_LOGIN_FAILURE: (state, err) => {
    state.loading = false;
    state.message = '';
    state.error = err;
    state.isLoggedIn = false;
  },
};

const slice = createSlice({ name, initialState, reducers });

const selectMeState = createSelector(
  state => state.me,
  me => me,
);

const selectUserState = createSelector(
  state => state.user,
  user => user,
);

const selectIsLoggedInState = createSelector(
  state => state.isLoggedIn,
  isLoggedIn => isLoggedIn,
);

const selectLoadingState = createSelector(
  state => state.loading,
  loading => loading,
);

const selectMessageState = createSelector(
  state => state.message,
  message => message,
);

const selectErrorState = createSelector(
  state => state.error,
  error => error,
);

const selectAllState = createSelector(
  selectMeState,
  selectUserState,
  selectIsLoggedInState,
  selectLoadingState,
  selectMessageState,
  selectErrorState,
  (me, user, isLoggedIn, loading, message, error) => {
    return { me, user, isLoggedIn, loading, message, error };
  },
);

export const LOGIN = slice.name;
export const loginReducer = slice.reducer;
export const loginAction = slice.actions;

export const loginSelector = {
  me: state => selectMeState(state[LOGIN]),
  user: state => selectUserState(state[LOGIN]),
  isLoggedIn: state => selectIsLoggedInState(state[LOGIN]),
  loading: state => selectLoadingState(state[LOGIN]),
  error: state => selectErrorState(state[LOGIN]),
  message: state => selectMessageState(state[LOGIN]),
  all: state => selectAllState(state[LOGIN]),
};

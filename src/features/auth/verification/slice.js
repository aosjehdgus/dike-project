/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const name = 'verify';
const initialState = {
  send: null,
  verified: null,
  expired: 0,
  loading: {
    infoChange: false,
    verifyEmail: false,
    sendEmail: false,
  },
  message: '',
  error: '',
};

const reducers = {
  SEND_VERIFY_EMAIL: state => {
    state.send = null;
    state.loading.sendEmail = true;
  },
  SEND_VERIFY_EMAIL_SUCCESS: (state, { payload }) => {
    state.send = true;
    state.expired = payload.expireTimeForEmailVerification;
    state.loading.sendEmail = false;
  },
  SEND_VERIFY_EMAIL_FAILURE: (state, err) => {
    state.send = false;
    state.loading.sendEmail = false;
    state.error = err;
  },
  VERIFY_EMAIL: state => {
    state.loading.verifyEmail = true;
    state.verified = null;
  },
  VERIFY_EMAIL_SUCCESS: state => {
    state.loading.verifyEmail = false;
    state.verified = true;
  },
  VERIFY_EMAIL_FAILURE: (state, err) => {
    state.loading.verifyEmail = false;
    state.verified = false;
    state.error = err;
  },
  USER_INFO_CHANGE: state => {
    state.loading.infoChange = true;
  },
  USER_INFO_CHANGE_SUCCESS: state => {
    state.loading.infoChange = false;
  },
  USER_INFO_CHANGE_FAILURE: (state, err) => {
    state.loading.infoChange = false;
    state.error = err;
  },
  RESET_VERIFIED_STATE: state => {
    state.verified = null;
  },
};

const slice = createSlice({ name, initialState, reducers });

const selectSendState = createSelector(
  state => state.send,
  send => send,
);

const selectVerifiedState = createSelector(
  state => state.verified,
  verified => verified,
);

const selectExpiredState = createSelector(
  state => state.expired,
  expired => expired,
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
  selectSendState,
  selectVerifiedState,
  selectExpiredState,
  selectLoadingState,
  selectMessageState,
  selectErrorState,
  (send, verified, expired, loading, message, error) => {
    return {
      send,
      verified,
      expired,
      loading,
      message,
      error,
    };
  },
);

export const VERIFY = slice.name;
export const verifyReducer = slice.reducer;
export const verifyAction = slice.actions;

export const verifySelector = {
  send: state => selectSendState(state[VERIFY]),
  verified: state => selectVerifiedState(state[VERIFY]),
  expired: state => selectExpiredState(state[VERIFY]),
  loading: state => selectLoadingState(state[VERIFY]),
  message: state => selectMessageState(state[VERIFY]),
  error: state => selectErrorState(state[VERIFY]),
  all: state => selectAllState(state[VERIFY]),
};

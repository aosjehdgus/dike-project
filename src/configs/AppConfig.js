import { env } from './EnvironmentConfig';

export const APP_NAME = 'Dike';
export const API_BASE_URL = env.API_ENDPOINT_URL;
/* App */
export const APP_PREFIX_PATH = '/';
/* Admin */
export const MANAGE_USER_PATH = `${APP_PREFIX_PATH}manageUser`;
/* Worker */
export const CURRENT_WORK_PATH = `${APP_PREFIX_PATH}currentWork`;
/* Auth */
export const AUTH_PREFIX_PATH = `${APP_PREFIX_PATH}auth`;
export const LOGIN_PATH = `${AUTH_PREFIX_PATH}/login`;
export const TERMS_PATH = `${AUTH_PREFIX_PATH}/terms`;
export const REGISTER_PATH = `${AUTH_PREFIX_PATH}/register`;
export const VERIFICATION_PATH = `${AUTH_PREFIX_PATH}/verification`;

/* eslint-disable import/prefer-default-export */
// const CLIENT_ID = 'ce5ab2bb47d85ae69a468c57629d4ca8';
// export const REDIRECT_URI = `http://localhost.gigworks.ai:3000/ga/tyche/auth/kakao/callback`;
// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const KAKAO_LOGIN_URL = `${API_BASE_URL}/api/v1/tyche/users/kakao/login`;
export const KAKAO_CALLBACK_PATH = `${AUTH_PREFIX_PATH}/kakao/callback`;

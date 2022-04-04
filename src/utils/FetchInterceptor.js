/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { API_BASE_URL } from 'configs/AppConfig';

// 1. axios 인스턴스 생성하기
const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  withCredentials: true,
});

// const ENTRY_ROUTE = LOGIN_PATH;
// 2. 요청 인터셉터

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log('[utils][FetchInterceptor][error]:', error);

    return Promise.reject(error);
  },
);

// 2. 응답 인터셉터

service.interceptors.response.use(
  response => {
    // console.log('[utils][FetchInterceptor][response]:', response);
    // console.log('response.cookie:', response.cookie);
    return response;
  },
  error => {
    // console.log('[utils][FetchInterceptor][error]:', error);
    const { response } = error;

    // fetch interceptor에 대해 정리하고, 로그인시 404 에
    const notificationParam = {
      status: '',
      message: '',
    };
    console.log('[utils][FetchInterceptor][response]:', response);
    // const history = useHistory();
    const { status } = response;

    if (!response) {
      console.log('No response in error object. API server might be down.');

      // history.push(ENTRY_ROUTE);
    } else {
      // NOTE: if 403, forbidden, just return empty data normally.
      // if (status === 403) {
      //   return Promise.resolve();
      // }

      if (status === 403) {
        notificationParam.message = 'Forbidden';
        notificationParam.status = 403;
        return notificationParam;
      }

      if (status === 404) {
        notificationParam.message = 'Not Found';
        notificationParam.status = 404;
        return notificationParam;
      }

      if (status === 500) {
        notificationParam.message = 'Internal Server Error';
      }

      if (status === 508) {
        notificationParam.message = 'Time Out';
      } else {
        // history.push(ENTRY_ROUTE);
      }
    }

    // console.log('[BOH] notificationParam:', notificationParam);
    // setTimeout(() => {
    //   console.log('[BOH] Show error message:', notificationParam.message);
    //   notification.error(notificationParam);
    // }, 2000);

    // console.log(
    //   `[BOH] error message: ${error.message}, location: ${history.location.pathname}`,
    // );

    return Promise.reject(error);
  },
);

export default service;

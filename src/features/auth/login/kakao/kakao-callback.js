/* eslint-disable no-unused-vars */
// 리다이렉트될 화면

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import qs from 'qs';
import { CircularProgress } from '@mui/material';
import { KAKAO_CALLBACK_PATH } from 'configs/AppConfig';
import { loginAction } from '../slice';

export default function KaKaoCallback() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { KAKAO_LOGIN } = loginAction;

  // 인가코드
  const callbackURL = encodeURI(
    `${window.location.origin}${KAKAO_CALLBACK_PATH}`,
  );

  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  // console.log('[KaKaoLogin]code:', code);

  useEffect(() => {
    dispatch(KAKAO_LOGIN({ code, callbackURL, history }));
  }, []);

  return <CircularProgress />;
}

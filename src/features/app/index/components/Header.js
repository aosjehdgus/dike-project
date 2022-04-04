/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { Typography } from '@mui/material';
import {
  APP_PREFIX_PATH,
  MANAGE_USER_PATH,
  CURRENT_WORK_PATH,
} from 'configs/AppConfig';

/* Import Components */

export default function Header(prop) {
  const { path } = prop;
  let title;

  path === APP_PREFIX_PATH
    ? (title = '공지 사항')
    : path === MANAGE_USER_PATH
    ? (title = '사용자 관리')
    : path === CURRENT_WORK_PATH
    ? (title = '현재 작업')
    : '';

  return (
    <>
      <Typography
        component="h1"
        sx={{
          color: 'rgb(98,92,96)',
          p: 3,
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        {title}
      </Typography>
    </>
  );
}

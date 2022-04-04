import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';

import {
  APP_PREFIX_PATH,
  MANAGE_USER_PATH,
  CURRENT_WORK_PATH,
} from './AppConfig';

export const DIKE_HOME = [
  {
    key: 'dikeHome',
    path: APP_PREFIX_PATH,
    title: '홈',
    icon: <HomeTwoToneIcon style={{ color: '#7D6461' }} />,
    userLevel: ['worker', 'admin', 'manager'],
  },
];

export const MANAGE_USER = [
  {
    key: 'manageUser',
    path: MANAGE_USER_PATH,
    title: '사용자 관리',
    icon: <SupervisedUserCircleTwoToneIcon style={{ color: '#7D6461' }} />,
    userLevel: ['admin', 'manager'],
  },
];

export const CURRENT_WORK = [
  {
    key: 'currentWork',
    path: CURRENT_WORK_PATH,
    title: '현재 작업',
    icon: <ArticleTwoToneIcon style={{ color: '#7D6461' }} />,
    userLevel: ['worker'],
  },
];

const DRAWER_CONFIG = [...DIKE_HOME, ...MANAGE_USER, ...CURRENT_WORK];

export default DRAWER_CONFIG;

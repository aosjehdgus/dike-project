/* eslint-disable no-unused-vars */
import fetch from 'utils/FetchInterceptor';

const dikeService = {};

dikeService.getMyInfo = params => {
  return fetch({
    url: '/api/v1/dike/users/me',
    method: 'get',
    params,
  });
};

dikeService.login = params => {
  // console.log('[service][loginAPI][params] :', params);
  const data = { ...params };
  // console.log('[service][loginAPI][data] : ', data);

  return fetch({
    url: '/api/v1/dike/users/login',
    method: 'post',
    data,
  });
};

dikeService.logout = () => {
  // console.log('[service]params :', params);

  const data = {};
  // console.log('[service]data : ', data);

  return fetch({
    url: '/api/v1/dike/users/logout',
    method: 'post',
    data,
  });
};

dikeService.register = params => {
  // console.log('[service][register][params] :', params);
  const data = { ...params };
  // console.log('[service][register][data] : ', data);

  return fetch({
    url: '/api/v1/dike/users',
    method: 'post',
    data,
  });
};

dikeService.sendVerifyEmail = params => {
  const data = { ...params };
  // console.log('[service][sendVerifyEmail][data] :', data);
  return fetch({
    url: '/api/v1/dike/users/verification-code',
    method: 'patch',
    data,
  });
};

dikeService.verifiyEmail = params => {
  // console.log('[service][register][params] :', params);
  const data = { ...params };
  // console.log('[service][register][data] :', data);
  return fetch({
    url: '/api/v1/dike/users/email-verification',
    method: 'post',
    data,
  });
};

dikeService.getUsers = params => {
  // console.log('params:', params);

  return fetch({
    url: '/api/v1/dike/users/?where={"projects" : {"contains": "dike"}}',
    method: 'get',
    params,
  });
};

dikeService.getUserWorkStatus = params => {
  return fetch({
    url: '/api/v1/dike/users/work-status',
    method: 'get',
    params,
  });
};

dikeService.modifyUser = params => {
  // console.log('[service][modifyUser][params]:', params);
  const data = { ...params };
  // console.log('[service][modifyUser][data]:', data);

  return fetch({
    url: `/api/v1/dike/users/${params.id}`,
    method: 'patch',
    data,
  });
};

dikeService.deleteUser = params => {
  return fetch({
    url: `/api/v1/dike/users/${params.id}`,
    method: 'delete',
  });
};

dikeService.getWorkStatus = params => {
  return fetch({
    url: '/api/v1/dike/users/fileStatus',
    method: 'get',
    params,
  });
};

dikeService.kakaoLoginCallback = params => {
  // console.log('[kakaoLoginCallback][params]', params);
  return fetch({
    url: `/api/v1/dike/users/kakao/callback`,
    method: 'get',
    params,
  });
};

dikeService.duplicateCheck = params => {
  // console.log('[duplicateCheck][params]', params);

  return fetch({
    url: '/api/v1/dike/users/duplicated',
    method: 'get',
    params,
  });
};

dikeService.getNoticeList = () => {
  return fetch({
    url: '/api/v1/dike/notices',
    method: 'get',
  });
};

dikeService.addNotice = params => {
  const data = { ...params };
  return fetch({
    url: '/api/v1/dike/notices',
    method: 'post',
    data,
  });
};

dikeService.deleteNotice = params => {
  // console.log('[dikeService][deleteNotice][params] :', params);
  const data = { ...params };
  // console.log('[dikeService][deleteNotice][data] :', data);
  const { noticeId } = data;
  return fetch({
    url: `/api/v1/dike/notices/${noticeId}`,
    method: 'delete',
  });
};

dikeService.getTasks = () => {
  return fetch({
    url: `/api/v1/dike/tasks`,
    method: 'get',
  });
};

dikeService.getTodoTask = () => {
  return fetch({
    url: `/api/v1/dike/tasks/to-do`,
    method: 'get',
  });
};

dikeService.getPrevTask = params => {
  const data = { ...params };

  return fetch({
    url: `/api/v1/dike/tasks/${data.id}/prev`,
    method: 'get',
  });
};
dikeService.getNextTask = params => {
  const data = { ...params };

  return fetch({
    url: `/api/v1/dike/tasks/${data.id}/next`,
    method: 'get',
  });
};

dikeService.getSelectedTask = params => {
  const data = { ...params };

  return fetch({
    url: `/api/v1/dike/tasks/number/${data.number}`,
    method: 'get',
  });
};

dikeService.updateTask = params => {
  const data = { ...params };
  // console.log('data:', data);

  return fetch({
    url: `/api/v1/dike/tasks/${data.id}`,
    method: 'patch',
    data,
  });
};

export default dikeService;

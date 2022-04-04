export const changePasswordSteps = {
  inputInfo: '정보 입력',
  checkAuth: '인증번호 확인',
  changePwd: '비밀번호 변경',
  complete: '완료',
};

export const alertMap = {
  info: '비밀번호 분실시 이메일 인증을 통해 변경 가능합니다.',
  change:
    '비밀번호가 성공적으로 변경되었습니다. 새로운 비밀번호로 로그인 해주세요.',
  message: {
    send: '입력하신 이메일로 인증 번호가 전송 되었습니다. 전송된 인증 번호를 입력해주세요.',
    failure: `죄송합니다. 인증번호가 일치하지 않습니다. 인증 번호를 다시 한번 확인후 입력해주세요.
          인증 번호가 전송되지 않았다면 재전송 버튼을 클릭 후 진행해주세요.`,
    expired:
      '인증 번호가 만료되었습니다. 뒤로 돌아가 인증을 다시 시도해주세요.',
  },
  type: {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  },
};

export const verifyAlertMap = {
  message: {
    success: '축하합니다. 인증에 성공하였습니다. 로그인을 진행해주세요.',
    failure: `죄송합니다. 인증번호가 일치하지 않습니다. 인증 번호를 다시 한번 확인후 입력해주세요.
      인증 번호가 전송되지 않았다면 재전송 버튼을 클릭 후 진행해주세요.`,
    expired:
      '인증 번호가 만료되었습니다. 인증 번호를 재전송 후 다시 시도해주세요.',
    resend:
      '입력하신 이메일로 인증 번호가 재전송 되었습니다. Dike 서비스 이용을 위해서 전송된 인증 번호를 입력해주세요.',
    key: '만료된 페이지 입니다. 로그인 화면으로 이동하시려면 아래의 버튼을 눌러주세요.',
  },
  type: {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  },
};

export const validationErr = {
  name: '정확한 이름을 입력해주세요',
  userId: '올바른 이메일 주소를 입력해주세요',
  code: '정확한 인증번호를 입력해주세요',
  empty: '인증번호를 입력 후 다시 시도해주세요',
  password: '비밀번호는 4 - 60자 사이여야 합니다',
  passwordCheck: '동일한 비밀번호를 입력해주세요',
  duplicatedTrue: '이미 사용중인 아이디 입니다',
  duplicatedFalse: '사용 가능한 아이디 입니다',
  duplicateCheck: '아이디 중복 체크 후 진행해주세요',
};

export const loginErrorMessage = {
  userId: '정확한 이메일 주소를 입력하세요',
  password: '비밀번호는 4 - 60자 사이여야 합니다.',
};

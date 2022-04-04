/* eslint-disable import/prefer-default-export */
export const validationCheck = (rule, value) => {
  const validationRule = {
    name: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
    userId:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    code: /[0-9]{4}/g,
    password: /^.{4,60}$/,
    passwordCheck: /^.{4,60}$/,
  };

  return validationRule[rule].test(value);
};

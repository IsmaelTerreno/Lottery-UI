export const SET_IS_LOGIN = 'SET_IS_LOGIN';
export const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT';
export const SET_ACCOUNTS = 'SET_ACCOUNTS';

export const setIslogin = (isLogin) => {
  return {
    type: SET_IS_LOGIN,
    isLogin
  };
};

export const setCurrentAccount = (current) => {
  return {
    type: SET_CURRENT_ACCOUNT,
    current
  };
};

export const setAccounts = (accounts) => {
  return {
    type: SET_ACCOUNTS,
    accounts
  };
};
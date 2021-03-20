import {
  SET_IS_LOGIN,
  SET_CURRENT_ACCOUNT,
  SET_ACCOUNTS
} from '../actions/user';
import {createSelector} from 'reselect';

const initState = {
  current: null,
  accounts:[],
  isLogin:false,
};

export const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_ACCOUNT:
      return {
        ...state,
        current: action.current
      };
    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts
      };
    case SET_IS_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin
      };
    default:
      return state;
  }
}

const currentAccountSelector = state => state.user.current;
const accountsSelector = state => state.user.accounts;
const isLoginSelector = state => state.user.isLogin;


export const getCurrentAccount = createSelector(
  currentAccountSelector,
  current => current
);

export const getAccounts = createSelector(
  accountsSelector,
  accounts => accounts
);

export const isLogin = createSelector(
  isLoginSelector,
  isLogin => isLogin
);




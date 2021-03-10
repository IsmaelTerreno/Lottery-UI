import {
  GET_LAST_WINNERS_SUCCESS,
  GET_BALANCE_PRICE_SUCCESS,
  GET_LAST_WINNER_SUCCESS
} from '../actions/lottery';
import {createSelector} from 'reselect';

const initState = {
  current: null,
  list:[],
  winners:[],
  lastWinner: null,
  balancePrice: 0,
};

export const LoteryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LAST_WINNERS_SUCCESS:
      return {
        ...state,
        winners: action.winners
      };
    case GET_BALANCE_PRICE_SUCCESS:
        return {
          ...state,
          balancePrice: action.balancePrice
        };
    case GET_LAST_WINNER_SUCCESS:
        return {
          ...state,
          lastWinner: action.lastWinner
        };
        
    default:
      return state;
  }
}

const currentLotteySelector = state => state.lottery.current;
const winnersListSelector = state => state.lottery.winners;
const lastWinnerSelector = state => state.lottery.lastWinner;
const balancePriceSelector = state => state.lottery.balancePrice;


export const getCurrentLottey = createSelector(
  currentLotteySelector,
  current => current
);

export const getWinnersListSelector = createSelector(
  winnersListSelector,
  winners => winners
);

export const getLastWinnerSelector = createSelector(
  lastWinnerSelector,
  winner => winner
);

export const getBalancePriceSelector = createSelector(
  balancePriceSelector,
  balancePrice => balancePrice
);


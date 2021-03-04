import {
  GET_LAST_WINNERS_SUCCESS
} from '../actions/lottery';
import {createSelector} from 'reselect';

const initState = {
  current: null,
  list:[],
  winners:[],
  lastWinner: null,
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_LAST_WINNERS_SUCCESS:
      return {
        ...state,
        list: action.winners
      };
    default:
      return state;
  }
}

const currentLotteySelector = state => state.lottery.current;
const winnersListSelector = state => state.lottery.list;
const lastWinnerSelector = state => state.lottery.list;


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

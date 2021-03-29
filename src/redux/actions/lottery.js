export const GET_LAST_WINNERS = 'GET_LAST_WINNERS';
export const GET_LAST_WINNERS_SUCCESS = 'GET_LAST_WINNERS_SUCCESS';
export const GET_LAST_WINNERS_FAIL = 'GET_LAST_WINNERS_FAIL';
export const START_NEW_LOTTERY = 'START_NEW_LOTTERY';
export const START_NEW_LOTTERY_SUCCESS = 'START_NEW_LOTTERY_SUCCESS';
export const START_NEW_LOTTERY_FAIL = 'START_NEW_LOTTERY_FAIL';
export const PICK_WINNER_LOTTERY = 'PICK_WINNER_LOTTERY';
export const PICK_WINNER_LOTTERY_SUCCESS = 'PICK_WINNER_LOTTERY_SUCCESS';
export const PICK_WINNER_LOTTERY_FAIL = 'PICK_WINNER_LOTTERY_FAIL';
export const ENTER_INTO_LOTTERY = 'ENTER_INTO_LOTTERY';
export const ENTER_INTO_LOTTERY_SUCCESS = 'ENTER_INTO_LOTTERY_SUCCESS';
export const ENTER_INTO_LOTTERY_FAIL = 'ENTER_INTO_LOTTERY_FAIL';
export const GET_LAST_WINNER = 'GET_LAST_WINNER';
export const GET_LAST_WINNER_SUCCESS = 'GET_LAST_WINNER_SUCCESS';
export const GET_LAST_WINNER_FAIL = 'GET_LAST_WINNER_FAIL';
export const GET_BALANCE_PRICE = 'GET_BALANCE_PRICE';
export const GET_BALANCE_PRICE_SUCCESS = 'GET_BALANCE_PRICE_SUCCESS';
export const GET_BALANCE_PRICE_FAIL = 'GET_BALANCE_PRICE_FAIL';
export const GET_LOTTERY_INFO = 'GET_LOTTERY_INFO';
export const GET_LOTTERY_INFO_SUCCESS = 'GET_LOTTERY_INFO_SUCCESS';
export const GET_LOTTERY_INFO_FAIL = 'GET_LOTTERY_INFO_FAIL';

export const findLastWinners = () => {
  return {
    type: GET_LAST_WINNERS
  };
};

export const startNewLottery = () => {
  return {
    type: START_NEW_LOTTERY
  };
};

export const pickWinner = () => {
  return {
    type: PICK_WINNER_LOTTERY
  };
};

export const enterIntoLottery = () => {
  return {
    type: ENTER_INTO_LOTTERY
  };
};

export const getLastWinner = () => {
  return {
    type: GET_LAST_WINNER
  };
};

export const getBalancePrice = () => {
  return {
    type: GET_BALANCE_PRICE
  };
};

export const getLotteryInfo = () => {
  return {
    type: GET_LOTTERY_INFO
  };
};
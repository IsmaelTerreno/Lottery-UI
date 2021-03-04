import {all, put} from 'redux-saga/effects';
import {takeLatest} from '@redux-saga/core/effects';
import {
  GET_LAST_WINNERS,
  GET_LAST_WINNERS_SUCCESS,
  GET_LAST_WINNERS_FAIL,
  ENTER_INTO_LOTTERY,
  ENTER_INTO_LOTTERY_SUCCESS,
  ENTER_INTO_LOTTERY_FAIL,
  START_NEW_LOTTERY,
  START_NEW_LOTTERY_SUCCESS,
  START_NEW_LOTTERY_FAIL,
  PICK_WINNER_LOTTERY,
  PICK_WINNER_LOTTERY_SUCCESS,
  PICK_WINNER_LOTTERY_FAIL,
  GET_LAST_WINNER,
  GET_LAST_WINNER_SUCCESS,
  GET_LAST_WINNER_FAIL,
  GET_BALANCE_PRICE,
  GET_BALANCE_PRICE_SUCCESS,
  GET_BALANCE_PRICE_FAIL,
} from '../actions/lottery';

import {
  startLotteryApi,
  enterIntoLotteryApi,
  pickWinnerApi,
  getLastWinnerApi,
  getBalancePriceApi,
  getLastWinnersApi,

} from '../../api';

import {APP_API_CALL_FAIL} from '../../config';

function* getLastWinnersSaga(){
  try{
    const result = yield getLastWinnersApi();
    yield put({type: GET_LAST_WINNERS_SUCCESS, winners: result});
  } catch (e) {
    yield put({type: GET_LAST_WINNERS_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when get winners',
      err: e.message
    });
  }
}

function* enterIntoLotterySaga(){
  try{
    yield enterIntoLotteryApi();
    yield put({type: ENTER_INTO_LOTTERY_SUCCESS});
  } catch (e) {
    yield put({type: ENTER_INTO_LOTTERY_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when enter into lottery',
      err: e.message
    });
  }
}

function* startLotterySaga(){
  try{
    yield startLotteryApi();
    yield put({type: START_NEW_LOTTERY_SUCCESS});
  } catch (e) {
    yield put({type: START_NEW_LOTTERY_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when start a new lottery',
      err: e.message
    });
  }
}

function* pickWinnerSaga(){
  try{
    yield pickWinnerApi();
    yield put({type: PICK_WINNER_LOTTERY_SUCCESS});
  } catch (e) {
    yield put({type: PICK_WINNER_LOTTERY_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when pick a winner',
      err: e.message
    });
  }
}

function* getLastWinnerSaga(){
  try{
    const result = yield getLastWinnerApi();
    yield put({type: GET_LAST_WINNER_SUCCESS, lastWinner: result});
  } catch (e) {
    yield put({type: GET_LAST_WINNER_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when get last winner',
      err: e.message
    });
  }
}

function* getBalancePriceSaga(){
  try{
    const result = yield getBalancePriceApi();
    yield put({type: GET_BALANCE_PRICE_SUCCESS, balancePrice: result});
  } catch (e) {
    yield put({type: GET_BALANCE_PRICE_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when get balance price',
      err: e.message
    });
  }
}

export function* watchGetLastWinners() {
  yield takeLatest(GET_LAST_WINNERS, getLastWinnersSaga);
}

export function* watchEnterIntoLottery() {
  yield takeLatest(ENTER_INTO_LOTTERY, enterIntoLotterySaga);
}

export function* watchStartLottery() {
  yield takeLatest(START_NEW_LOTTERY, startLotterySaga);
}

export function* watchPickWinner() {
  yield takeLatest(PICK_WINNER_LOTTERY, pickWinnerSaga);
}

export function* watchGetLastWinner() {
  yield takeLatest(GET_LAST_WINNER, getLastWinnerSaga);
}

export function* watchGetBalancePrice() {
  yield takeLatest(GET_BALANCE_PRICE, getBalancePriceSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetLastWinners(),
    watchEnterIntoLottery(),
    watchStartLottery(),
    watchPickWinner(),
    watchGetLastWinner(),
    watchGetBalancePrice()
  ]);
}

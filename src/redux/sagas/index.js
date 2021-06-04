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
  GET_LOTTERY_INFO,
  GET_LOTTERY_INFO_SUCCESS,
  GET_LOTTERY_INFO_FAIL,
  COUNT_CURRENT_POSITIONS,
  COUNT_CURRENT_POSITIONS_SUCCESS,
  COUNT_CURRENT_POSITIONS_FAIL,
  COUNT_ALL_POSITIONS,
  COUNT_ALL_POSITIONS_SUCCESS,
  COUNT_ALL_POSITIONS_FAIL, IS_LOTTERY_ADMIN_SUCCESS, IS_LOTTERY_ADMIN_FAIL, IS_LOTTERY_ADMIN,
} from '../actions/lottery';

import {
  startLotteryApi,
  enterIntoLotteryApi,
  pickWinnerApi,
  getLastWinnerApi,
  getBalancePriceApi,
  getLastWinnersApi,
  getLotteryInfoApi,
  countCurrentAddressPositionsApi,
  countAllCurrentPositionsApi, isLotteryAdminApi,
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
    const result = yield getBalancePriceApi();
    yield put({type: GET_BALANCE_PRICE_SUCCESS, balancePrice: result});
    const result2 = yield getLastWinnersApi();
    yield put({type: GET_LAST_WINNERS_SUCCESS, winners: result2});
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

function* getLotteryInfoSaga(){
  try{
    const result = yield getLotteryInfoApi();
    yield put({type: GET_LOTTERY_INFO_SUCCESS, lotteryInfo: result});
  } catch (e) {
    yield put({type: GET_LOTTERY_INFO_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when get lottery info',
      err: e.message
    });
  }
}

function* countCurrentAddressPositionsSaga(){
  try{
    const result = yield countCurrentAddressPositionsApi();
    yield put({type: COUNT_CURRENT_POSITIONS_SUCCESS, countCurrentPositions: result});
  } catch (e) {
    yield put({type: COUNT_CURRENT_POSITIONS_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when get lottery info',
      err: e.message
    });
  }
}

function* countAllCurrentPositionsSaga(){
  try{
    const result = yield countAllCurrentPositionsApi();
    yield put({type: COUNT_ALL_POSITIONS_SUCCESS, countAllPositions: result});
  } catch (e) {
    yield put({type: COUNT_ALL_POSITIONS_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when get lottery info',
      err: e.message
    });
  }
}

function* isLotteryAdminApiSaga(){
  try {
    const result = yield isLotteryAdminApi();
    yield put({type: IS_LOTTERY_ADMIN_SUCCESS, isLotteryAdmin: result});
  } catch (e) {
    yield put({type: IS_LOTTERY_ADMIN_FAIL});
    yield put({
      type: APP_API_CALL_FAIL,
      message: 'Error when get is admin info',
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

export function* watchGetLotteryInfo() {
  yield takeLatest(GET_LOTTERY_INFO, getLotteryInfoSaga);
}

export function* watchCountCurrentAddressPositions() {
  yield takeLatest(COUNT_CURRENT_POSITIONS, countCurrentAddressPositionsSaga);
}

export function* watchCountAllCurrentPositions() {
  yield takeLatest(COUNT_ALL_POSITIONS, countAllCurrentPositionsSaga);
}
export function* watchIsLotteryAdminApiSaga() {
  yield takeLatest(IS_LOTTERY_ADMIN, isLotteryAdminApiSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetLastWinners(),
    watchEnterIntoLottery(),
    watchStartLottery(),
    watchPickWinner(),
    watchGetLastWinner(),
    watchGetBalancePrice(),
    watchGetLotteryInfo(),
    watchCountCurrentAddressPositions(),
    watchCountAllCurrentPositions(),
    watchIsLotteryAdminApiSaga(),
  ]);
}

import { combineReducers } from 'redux';
import { LoteryReducer } from './lottery';

const rootReducer = combineReducers({
  lottery: LoteryReducer
});

export default rootReducer;

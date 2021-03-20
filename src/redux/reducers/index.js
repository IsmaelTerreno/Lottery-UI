import { combineReducers } from 'redux';
import { LoteryReducer } from './lottery';
import { UserReducer } from './user';

const rootReducer = combineReducers({
  lottery: LoteryReducer,
  user: UserReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import { library } from './library';
import playlist from './playlist';
import player from './player';

const rootReducer = combineReducers({
  library,
  playlist,
  player,
});

export default rootReducer;

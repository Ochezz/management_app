import { combineReducers } from 'redux';
import TABONE from './reduxTabOne';

const rootReducer = combineReducers({
    TABONE
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
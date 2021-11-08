import { combineReducers } from 'redux';
import RESULT from './reduxResult';
import MODAL from './reduxModal';

const rootReducer = combineReducers({
    RESULT,
    MODAL
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
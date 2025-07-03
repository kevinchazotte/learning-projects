import { combineReducers } from 'redux';
import TasksReducer from './features/TasksReducer';

const rootReducer = combineReducers({
    TasksReducer,
});

export default rootReducer;

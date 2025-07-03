import { configureStore } from '@reduxjs/toolkit'
import TasksReducer from './features/TasksReducer';

const store = configureStore({
    reducer: {
        Tasks: TasksReducer
    }
})

export default store;

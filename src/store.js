import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';
import tasksReducer from './features/tasks/tasksSlice';

const store = configureStore(
{
    reducer: 
    {
        users: usersReducer,
        tasks: tasksReducer
    },
});

export default store;
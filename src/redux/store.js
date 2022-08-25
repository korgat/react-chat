import { configureStore } from '@reduxjs/toolkit';
import chatsSlice from './slices/chatsSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
    reducer: {
        chatsSlice,
        userSlice,
    },
});

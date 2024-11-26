import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';

export const resetStore = () => configureStore({
  reducer: {
    orders: orderReducer,
  },
});

export const store = resetStore();

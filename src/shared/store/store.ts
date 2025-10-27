import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './garage/garageSlice';
import engineReducer from './engine/engineSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    engine: engineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

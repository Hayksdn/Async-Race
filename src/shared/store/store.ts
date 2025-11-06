import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './garage/garageSlice';
import engineReducer from './engine/engineSlice';
import winnersReducer from './winners/winnersSlice';
export const store = configureStore({
  reducer: {
    garage: garageReducer,
    engine: engineReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { setDriveEngine, setEngineStatus } from './engineThunks';
import type { CarEngineResponse, DriveEngineResponse } from '@/shared/types/engine';
import type { RootState } from '../store';

interface EngineState {
  engineStatus: Record<number, string>;
  velocity: Record<number, number>;
  distance: Record<number, number>;
  loading: Record<number, boolean>;
  driving: Record<number, boolean>;
  isRaceRunning: boolean;
}

const initialState: EngineState = {
  engineStatus: {},
  velocity: {},
  distance: {},
  loading: {},
  driving: {},
  isRaceRunning: false,
};

const engineSlice = createSlice({
  name: 'engine',
  initialState,
  reducers: {
    setRaceRunning: (state, action: PayloadAction<boolean>) => {
      state.isRaceRunning = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setEngineStatus.fulfilled, (state, action: PayloadAction<CarEngineResponse>) => {
        const { carId, status, velocity, distance } = action.payload;

        state.engineStatus[carId] = status;
        state.velocity[carId] = velocity;
        state.distance[carId] = distance;

        if (status === 'stopped') {
          state.driving[carId] = false;
        }
      })
      .addCase(setDriveEngine.fulfilled, (state, action: PayloadAction<DriveEngineResponse>) => {
        state.driving[action.payload.carId] = action.payload.success;
      })
      .addCase(setDriveEngine.rejected, (state, action) => {
        state.driving[action.meta.arg.carId] = false;
        state.engineStatus[action.meta.arg.carId] = 'stopped';
      });
  },
});
export const { setRaceRunning } = engineSlice.actions;
export const selectIsRaceRunning = (state: RootState) => state.engine.isRaceRunning;

export default engineSlice.reducer;

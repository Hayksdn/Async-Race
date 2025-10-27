import { driveEngineApi, setEngineStatusApi } from '@/shared/api/engine';
import type {
  CarEngineResponse,
  DriveEngineResponse,
  EngineControlPayload,
} from '@/shared/types/engine';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setEngineStatus = createAsyncThunk<CarEngineResponse, EngineControlPayload>(
  'engine/setEngineStatus',
  async ({ carId, status }) => {
    const setEngineStatusData = await setEngineStatusApi(carId, status);
    return { carId, status, ...setEngineStatusData };
  }
);

export const setDriveEngine = createAsyncThunk<DriveEngineResponse, EngineControlPayload>(
  'engine/driveEngine',
  async ({ carId, status }) => {
    const driveEngineData = await driveEngineApi(carId, status);
    return { carId, ...driveEngineData };
  }
);

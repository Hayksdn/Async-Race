import axios from 'axios';
import type { CarEngineData, DriveEngineData } from '../types/engine';

export const setEngineStatusApi = async (carId: number, status: string): Promise<CarEngineData> => {
  const { data } = await axios.patch('/engine', null, {
    params: { id: carId, status },
  });
  return data;
};

export const driveEngineApi = async (
  carId: number,
  status: string,
  signal?: AbortSignal
): Promise<DriveEngineData> => {
  const { data } = await axios.patch('/engine', null, {
    params: { id: carId, status },
    signal,
  });
  return data;
};

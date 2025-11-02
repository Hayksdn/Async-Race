import {
  createWinnerApi,
  deleteWinnerApi,
  getAllWinnersApi,
  getWinnerApi,
  updateWinnerApi,
} from '@/shared/api/winners';
import {
  type GetAllWinnersParams,
  type Winners,
  type WinnersResponse,
} from '@/shared/types/winners';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllWinners = createAsyncThunk<WinnersResponse, GetAllWinnersParams>(
  'winners/getAllWinners',
  async ({ page, limit, sort, order }) => {
    const response = await getAllWinnersApi(page, limit, sort, order);
    return response;
  }
);

export const getWinner = createAsyncThunk<Winners | null, number>(
  'winners/getWinner',
  async (carId) => {
    try {
      const response = await getWinnerApi(carId);
      return response;
    } catch (e: any) {
      if (e.response?.status === 404) return null;
      throw e;
    }
  }
);

export const createWinner = createAsyncThunk<Winners, Winners>(
  'winners/createWinner',
  async (newWinner) => {
    const response = await createWinnerApi(newWinner);
    return response;
  }
);

export const deleteWinner = createAsyncThunk('winners/deleteWinner', async (id: number) => {
  await deleteWinnerApi(id);
  return id;
});

export const updateWinner = createAsyncThunk<Winners, { id: number; wins: number; time: number }>(
  'winners/updateWinner',
  async ({ id, wins, time }) => {
    const response = await updateWinnerApi(id, wins, time);
    return response;
  }
);

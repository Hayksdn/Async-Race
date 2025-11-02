import axios from 'axios';
import type { Winners, WinnersResponse } from '../types/winners';

export const getAllWinnersApi = async (
  page = 1,
  limit = 7,
  sort = 'wins',
  order = 'DESC'
): Promise<WinnersResponse> => {
  const response = await axios.get('/winners', {
    params: { _page: page, _limit: limit, _sort: sort, _order: order },
  });

  const winners = response.data;
  const totalCount = Number(response.headers['x-total-count']);
  return { winners, totalCount };
};

export const getWinnerApi = async (id: number): Promise<Winners> => {
  const { data } = await axios.get(`/winners/${id}`);
  return data;
};

export const createWinnerApi = async (newWinner: Winners): Promise<Winners> => {
  const { data } = await axios.post('/winners', newWinner);
  return data;
};

export const deleteWinnerApi = async (id: number) => {
  await axios.delete(`/winners/${id}`);
};

export const updateWinnerApi = async (id: number, wins: number, time: number): Promise<Winners> => {
  const { data } = await axios.put(`/winners/${id}`, { wins, time });
  return data;
};

import type { Winners, WinnersResponse } from '@/shared/types/winners';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  createWinner,
  deleteWinner,
  getAllWinners,
  getWinner,
  updateWinner,
} from './winnersThunks';

interface WinnersSlice {
  winners: Winners[];
  totalCount: number;
}

const initialState: WinnersSlice = { winners: [], totalCount: 0 };

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllWinners.fulfilled, (state, action: PayloadAction<WinnersResponse>) => {
        const { winners, totalCount } = action.payload;
        state.winners = winners;
        state.totalCount = totalCount;
      })
      .addCase(getWinner.fulfilled, () => {})

      .addCase(createWinner.fulfilled, (state, action: PayloadAction<Winners>) => {
        state.winners.push(action.payload);
      })

      .addCase(deleteWinner.fulfilled, (state, action: PayloadAction<number>) => {
        state.winners = state.winners.filter((winner) => winner.id !== action.payload);
      })

      .addCase(updateWinner.fulfilled, (state, action: PayloadAction<Winners>) => {
        const index = state.winners.findIndex((winner) => winner.id === action.payload.id);
        if (index !== -1) {
          state.winners[index] = action.payload;
        }
      });
  },
});

export default winnersSlice.reducer;

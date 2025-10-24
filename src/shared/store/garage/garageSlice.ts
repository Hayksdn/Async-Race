import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '@/shared/types/car';
import { fetchCars, addCar } from './garageThunks';

interface GarageState {
  cars: Car[];
  loading: boolean;
}

const initialState: GarageState = { cars: [], loading: false };

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => { state.loading = true; })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => { state.loading = false; })
      .addCase(addCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.cars.push(action.payload);
      });
  },
});

export default garageSlice.reducer;

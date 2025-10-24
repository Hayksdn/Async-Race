import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car, CarResponse } from '@/shared/types/car';
import { fetchCars, addCar, generateCars } from './garageThunks';

interface GarageState {
  cars: Car[];
  loading: boolean;
  totalCount: number;
}

const initialState: GarageState = { cars: [], loading: false, totalCount: 0 };

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<CarResponse>) => {
        const { cars, totalCount } = action.payload;
        state.cars = cars;
        state.totalCount = totalCount;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.cars.push(action.payload);
        state.totalCount += 1;
      })
      .addCase(generateCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.cars.push(...action.payload);
        state.totalCount += 100;
        state.loading = false;
      })
      .addCase(generateCars.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default garageSlice.reducer;

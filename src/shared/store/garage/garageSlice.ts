import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car, CarResponse } from '@/shared/types/car';
import { fetchCars, addCar, generateCars, removeCar, updateCar } from './garageThunks';
import type { RootState } from '../store';

interface GarageState {
  cars: Record<number, Car>;
  currentPageIds: number[];
  loading: boolean;
  totalCount: number;
  totalPageCount: number;
}

const CARS_PER_PAGE = 7;

const initialState: GarageState = {
  cars: {},
  currentPageIds: [],
  loading: false,
  totalCount: 0,
  totalPageCount: 0,
};

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

        cars.forEach((car) => {
          state.cars[car.id] = car;
        });

        state.currentPageIds = cars.map((car) => car.id);

        state.totalCount = totalCount;
        state.totalPageCount = Math.ceil(totalCount / CARS_PER_PAGE);
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.cars[action.payload.id] = action.payload;

        if (state.currentPageIds.length < CARS_PER_PAGE) {
          state.currentPageIds.push(action.payload.id);
        }

        state.totalCount += 1;
        state.totalPageCount = Math.ceil(state.totalCount / CARS_PER_PAGE);
      })

      .addCase(generateCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        action.payload.forEach((car) => {
          state.cars[car.id] = car;
        });

        const spaceLeft = CARS_PER_PAGE - state.currentPageIds.length;
        if (spaceLeft > 0) {
          const carsToAdd = action.payload.slice(0, spaceLeft).map((car) => car.id);
          state.currentPageIds.push(...carsToAdd);
        }

        state.totalCount += action.payload.length;
        state.totalPageCount = Math.ceil(state.totalCount / CARS_PER_PAGE);
      })

      .addCase(removeCar.fulfilled, (state, action: PayloadAction<number>) => {
        delete state.cars[action.payload];
        state.currentPageIds = state.currentPageIds.filter((id) => id !== action.payload);
        state.totalCount -= 1;
        state.totalPageCount = Math.ceil(state.totalCount / CARS_PER_PAGE);
      })

      .addCase(updateCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.cars[action.payload.id] = action.payload;
      });
  },
});

export const selectCurrentPageCars = createSelector(
  (state: RootState) => state.garage.cars,
  (state: RootState) => state.garage.currentPageIds,
  (cars, currentPageIds) => currentPageIds.map((id) => cars[id])
);

export const selectAllCarsArray = createSelector(
  (state: RootState) => state.garage.cars,
  (cars) => Object.values(cars)
);

export default garageSlice.reducer;

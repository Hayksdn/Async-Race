import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car, CarResponse } from '@/shared/types/car';
import { fetchCars, addCar, generateCars, removeCar } from './garageThunks';
import { cardSlotRecipe } from '@chakra-ui/react/theme';

interface GarageState {
  cars: Car[];
  loading: boolean;
  totalCount: number;
  totalPageCount: number;
}
const CARS_PER_PAGE = 7;


const initialState: GarageState = { cars: [], loading: false, totalCount: 0, totalPageCount: 0 };

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
        state.totalPageCount = Math.ceil(totalCount/CARS_PER_PAGE);
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCar.fulfilled, (state, action: PayloadAction<Car>) => {
     

      })
      .addCase(generateCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
   
      })
      .addCase(generateCars.rejected, (state) => {
        state.loading = false;
      })
     .addCase(removeCar.fulfilled, (state, action: PayloadAction<number>) => {
          state.cars = state.cars.filter(car => car.id !== action.payload)

      })
   
  },
});

export default garageSlice.reducer;

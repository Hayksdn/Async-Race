import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCar, getCars } from '@/shared/api/garage';
import type { Car, NewCar } from '@/shared/types/car';

export const fetchCars = createAsyncThunk<Car[]>('garage/fetchCars', async () => {
  const cars = await getCars();
  return cars;
});

export const addCar = createAsyncThunk<Car, NewCar>('garage/addCar', async (newCar) => {
  return await createCar(newCar);
});

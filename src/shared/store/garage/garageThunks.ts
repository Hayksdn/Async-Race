import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCar, createMultipleCars, getCars } from '@/shared/api/garage';
import type { Car, CarResponse, NewCar } from '@/shared/types/car';

export const fetchCars = createAsyncThunk<CarResponse>('garage/fetchCars', async () => {
  const response = await getCars();
  return response;
});

export const addCar = createAsyncThunk<Car, NewCar>('garage/addCar', async (newCar) => {
  return await createCar(newCar);
});

export const generateCars = createAsyncThunk<Car[]>('garage/generateCars', async () => {
  const createdCars = await createMultipleCars(100);
  return createdCars;
});

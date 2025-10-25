import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCar, createMultipleCars, deleteCar, getCars } from '@/shared/api/garage';
import type { Car, CarResponse, FetchCarsParams, NewCar } from '@/shared/types/car';

export const fetchCars = createAsyncThunk<CarResponse, FetchCarsParams>('garage/fetchCars', async ({page,limit=7}) => {
  const response = await getCars(page,limit);
  return response;
});

export const addCar = createAsyncThunk<Car, NewCar>('garage/addCar', async (newCar) => {
  return await createCar(newCar);
});

export const generateCars = createAsyncThunk<Car[]>('garage/generateCars', async () => {
  const createdCars = await createMultipleCars(100);
  return createdCars;
});


export const removeCar = createAsyncThunk ('garage/removeCar', async (carId:number) =>{
  await deleteCar(carId)
  return carId;
})
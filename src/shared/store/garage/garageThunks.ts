import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCar, createMultipleCars, deleteCar, getCars, updateCarApi } from '@/shared/api/garage';
import type { Car, CarResponse, FetchCarsParams, NewCar, UpdateCarPayload } from '@/shared/types/car';

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

export const updateCar = createAsyncThunk<Car, UpdateCarPayload>  ('garage/updateCar', async({carId, updatedCar}) =>{
  const updatedCarData = await updateCarApi(carId, updatedCar)
  return updatedCarData
} )
import axios from 'axios';
import type { Car, CarResponse, NewCar } from '../types/car';
import { generateRandomCars } from '../utils/carGenerator';

export const getCars = async (page = 1, limit = 7): Promise<CarResponse> => {
  const response = await axios.get('/garage', {
    params: { _page: page, _limit: limit },
  });
  const cars = response.data;
  const totalCount =  Number(response.headers['x-total-count']);

  return {cars, totalCount };
};

export const createCar = async (newCar: NewCar): Promise<Car> => {
  const { data } = await axios.post('/garage', newCar);
  return data;
};

export const createMultipleCars = async (count: number = 100): Promise<Car[]> => {
  const cars: NewCar[] = generateRandomCars(count);

  const promises = cars.map((car) => axios.post('/garage', car));

  const responses = await Promise.all(promises);

  const createdCars: Car[] = responses.map((res) => res.data);

  return createdCars;
};

export const deleteCar = async (carId:number)=>{
    await axios.delete(`/garage/${carId}`)
}

export const updateCarApi = async (carId: number, updatedCar: NewCar): Promise<Car> =>{
    const {data} = await axios.put(`/garage/${carId}`, updatedCar)
    return data
}
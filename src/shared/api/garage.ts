import axios from "axios"
import type { Car, NewCar } from "../types/car"

export const getCars = async (page=1, limit=7): Promise<Car[]>=>{
 const {data} = await axios.get("/garage",{
    params:  { _page: page, _limit: limit },
 })
 return data
}

export const createCar = async (newCar: NewCar): Promise<Car> => {
  const { data } = await axios.post('/garage', newCar);
  return data;
};
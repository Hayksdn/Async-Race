import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { setEngineStatus } from "../store/engine/engineThunks";
import type { RefObject } from "react";
import type { Car } from "../types/car";

export const useStopEngine = (
  ongoingDrive: RefObject<Record<number, AbortController | null>>,
  resetCar: (carId: number) => void
) => {
  const dispatch = useDispatch<AppDispatch>();

  const stopEngine = (carId: number) => {
    if (ongoingDrive.current[carId]) {
      ongoingDrive.current[carId]?.abort();
      ongoingDrive.current[carId] = null;
      console.log('aborted');
    }

    dispatch(setEngineStatus({ carId, status: 'stopped' }));
    resetCar(carId);
  };

  const stopAllEngines = (cars: Car[]) => {
  cars.forEach((car) => {
      stopEngine(car.id);
    });
};

  return { stopEngine, stopAllEngines};
};

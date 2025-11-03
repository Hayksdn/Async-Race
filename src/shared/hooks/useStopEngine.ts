import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { setEngineStatus } from '../store/engine/engineThunks';
import type { Car } from '../types/car';
import type { RefObject } from 'react';
import type { OngoingDrive } from '../context/animationContext';

export const useStopEngine = (
  ongoingDrive: RefObject<Record<number, OngoingDrive | null>>,
  resetCar: (carId: number) => void
) => {
  const dispatch = useDispatch<AppDispatch>();

  const stopEngine = (carId: number) => {
    const drive = ongoingDrive.current[carId];

    if (drive) {
      drive.controller?.abort?.();
      console.log('aborted');
      resetCar(carId);
      ongoingDrive.current[carId] = { controller: null, status: 'stopped' };

      console.log(`Engine stopped for car ${carId}, animation can resume later`);
    }

    dispatch(setEngineStatus({ carId, status: 'stopped' }));
  };

  const stopAllEngines = (cars: Car[]) => {
    cars.forEach((car) => stopEngine(car.id));
  };

  return { stopEngine, stopAllEngines };
};

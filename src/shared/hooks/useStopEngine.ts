import { setEngineStatus } from '../store/engine/engineThunks';
import type { Car } from '../types/car';
import type { RefObject } from 'react';
import type { OngoingDrive } from '../context/animationContext';
import { useAppDispatch } from '../store/hooks';
import { updateRaceState } from '../utils/engineHelper';

export const useStopEngine = (
  ongoingDrive: RefObject<Record<number, OngoingDrive | null>>,
  resetCar: (carId: number) => void
) => {
  const dispatch = useAppDispatch();

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

    updateRaceState(ongoingDrive.current, dispatch);
  };

  const stopAllEngines = (cars: Car[]) => {
    cars.forEach((car) => stopEngine(car.id));
  };

  return { stopEngine, stopAllEngines };
};

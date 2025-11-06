import { setEngineStatus } from '../store/engine/engineThunks';
import type { Car } from '../types/car';
import type { RefObject } from 'react';
import { useAnimation, type OngoingDrive } from '../context/animationContext';
import { useAppDispatch } from '../store/hooks';

export const useStopEngine = (
  ongoingDrive: RefObject<Record<number, OngoingDrive | null>>,
  resetCar: (carId: number) => void
) => {
  const dispatch = useAppDispatch();
  const { setIsRaceRunning } = useAnimation();

  const stopEngine = (carId: number) => {
    const drive = ongoingDrive.current[carId];

    if (drive) {
      drive.controller?.abort?.();
      resetCar(carId);
      ongoingDrive.current[carId] = { controller: null, status: 'stopped' };
    }

    dispatch(setEngineStatus({ carId, status: 'stopped' }));
  };

  const stopAllEngines = (cars: Car[]) => {
    Promise.allSettled(cars.map((car) => stopEngine(car.id)));
    setIsRaceRunning(false);
  };

  return { stopEngine, stopAllEngines };
};

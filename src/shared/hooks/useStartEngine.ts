import { setDriveEngine, setEngineStatus } from '../store/engine/engineThunks';
import type { RefObject } from 'react';
import type { Car } from '../types/car';
import { useAnimation, type OngoingDrive } from '../context/animationContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const useStartEngine = (
  moveCar: (carId: number, velocity: number, distance: number) => void,
  stopCar: (carId: number) => void,
  ongoingDrive: RefObject<Record<number, OngoingDrive | null>>
) => {
  const driving = useAppSelector((state) => state.engine.driving);
  const engineStatus = useAppSelector((state) => state.engine.engineStatus);
  const dispatch = useAppDispatch();
  const { setIsRaceRunning } = useAnimation();

  const startEngine = async (carId: number) => {
    if (driving[carId] || engineStatus[carId] === 'started') return;

    const controller = new AbortController();

    try {
      const result = await dispatch(setEngineStatus({ carId, status: 'started' })).unwrap();

      ongoingDrive.current[carId] = { controller, status: 'running' };

      moveCar(carId, result.velocity, result.distance);

      await dispatch(
        setDriveEngine({ carId, status: 'drive' }, { signal: controller.signal })
      ).unwrap();

      ongoingDrive.current[carId] = { controller: null, status: 'finished' };
      dispatch(setEngineStatus({ carId, status: 'stopped' }));
    } catch (e) {
      stopCar(carId);
      dispatch(setEngineStatus({ carId, status: 'stopped' }));
    }
  };

  const startAllEngines = (cars: Car[]) => {
    setIsRaceRunning(true);

    const enginePromises = cars.map((car) => startEngine(car.id));

    Promise.allSettled(enginePromises).finally(() => {
      setIsRaceRunning(false);
    });
  };

  return { startEngine, startAllEngines };
};

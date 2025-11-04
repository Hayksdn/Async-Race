import { setDriveEngine, setEngineStatus } from '../store/engine/engineThunks';
import type { RefObject } from 'react';
import type { Car } from '../types/car';
import type { OngoingDrive } from '../context/animationContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateRaceState } from '../utils/engineHelper';
import { setRaceRunning } from '../store/engine/engineSlice';

export const useStartEngine = (
  moveCar: (carId: number, velocity: number, distance: number) => void,
  stopCar: (carId: number) => void,
  ongoingDrive: RefObject<Record<number, OngoingDrive | null>>
) => {
  const driving = useAppSelector((state) => state.engine.driving);
  const engineStatus = useAppSelector((state) => state.engine.engineStatus);
  const dispatch = useAppDispatch();

  const startEngine = async (carId: number) => {
    if (driving[carId] || engineStatus[carId] === 'started') return;

    const controller = new AbortController();

    try {
      dispatch(setRaceRunning(true));

      const result = await dispatch(setEngineStatus({ carId, status: 'started' })).unwrap();

      ongoingDrive.current[carId] = { controller, status: 'running' };

      moveCar(carId, result.velocity, result.distance);

      await dispatch(
        setDriveEngine({ carId, status: 'drive' }, { signal: controller.signal })
      ).unwrap();

      ongoingDrive.current[carId] = { controller: null, status: 'finished' };

      updateRaceState(ongoingDrive.current, dispatch);
    } catch (e) {
      stopCar(carId);

      updateRaceState(ongoingDrive.current, dispatch);

      console.log('Drive failed', performance.now());
    }
  };

  const startAllEngines = (cars: Car[]) => {
    cars.forEach((car) => startEngine(car.id));
  };

  return { startEngine, startAllEngines };
};

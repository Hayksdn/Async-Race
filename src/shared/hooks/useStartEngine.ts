import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setDriveEngine, setEngineStatus } from '../store/engine/engineThunks';
import type { RefObject } from 'react';
import type { Car } from '../types/car';

export const useStartEngine = (
  moveCar: (carId: number, velocity: number, distance: number) => void,
  stopCar: (carId: number) => void,
  ongoingDrive: RefObject<Record<number, AbortController | null>>
) => {
  const driving = useSelector((state: RootState) => state.engine.driving);
  const engineStatus = useSelector((state: RootState) => state.engine.engineStatus);
  const dispatch = useDispatch<AppDispatch>();

  const startEngine = async (carId: number) => {
    if (driving[carId]) return;
    if (engineStatus[carId] !== 'started') {
      const controller = new AbortController();
      ongoingDrive.current[carId] = controller;

      try {
        const result = await dispatch(setEngineStatus({ carId, status: 'started' })).unwrap();

        moveCar(carId, result.velocity, result.distance);

        await dispatch(
          setDriveEngine({ carId, status: 'drive' }, { signal: controller.signal })
        ).unwrap();
      } catch (e) {
        stopCar(carId);
        console.log('drive failed', performance.now());
      }
    }
  };

  const startAllEngines = (cars: Car[]) => {
    cars.forEach((car) => {
      startEngine(car.id);
    });
  };

  return { startEngine, startAllEngines };
};

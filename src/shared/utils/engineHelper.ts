import type { OngoingDrive } from '../context/animationContext';
import { setRaceRunning } from '../store/engine/engineSlice';
import type { AppDispatch } from '../store/store';

const areAllDrivesFinished = (drives: Record<number, OngoingDrive | null>) =>
  Object.values(drives).every(
    (drive) => !drive || drive.status === 'finished' || drive.status === 'stopped'
  );

export const updateRaceState = (
  drives: Record<number, OngoingDrive | null>,
  dispatch: AppDispatch
) => {
  if (areAllDrivesFinished(drives)) {
    dispatch(setRaceRunning(false));
  }
};

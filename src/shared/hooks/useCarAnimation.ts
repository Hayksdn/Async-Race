import { type RefObject } from 'react';

export const useCarAnimations = (
  getMaxDistance: (carEl: HTMLDivElement | null, distance: number) => number,
  carContainerRef: RefObject<Record<number, HTMLDivElement | null>>,
  animationRefs: RefObject<Record<number, number>>,
  carPositions: RefObject<Record<number, number>>,
  ongoingDrive: RefObject<Record<number, any>>
) => {
  const moveCar = (carId: number, velocity: number, distance: number) => {
    let start: number | null = null;
    if (carPositions.current[carId] === undefined) carPositions.current[carId] = 0;

    function step(timestamp: number) {
      if (!start) start = timestamp;

      const carEl = carContainerRef.current[carId];

      const maxDistance = carEl ? getMaxDistance(carEl, distance) : distance;

      const elapsed = (timestamp - start) / 1000;
      const traveled = Math.min(elapsed * velocity, maxDistance);

      carPositions.current[carId] = traveled;

      if (carEl) {
        carEl.style.transform = `translateX(${traveled}px) rotate(90deg)`;
      }

      if (traveled < distance) {
        animationRefs.current[carId] = requestAnimationFrame(step);
        ongoingDrive.current[carId] = {
          controller: ongoingDrive.current[carId]?.controller ?? null,
          status: 'running',
        };
      } else {
        carPositions.current[carId] = distance;
        if (carEl) carEl.style.transform = `translateX(${distance}px) rotate(90deg)`;

        cancelAnimationFrame(animationRefs.current[carId]);
        delete animationRefs.current[carId];
        ongoingDrive.current[carId] = { controller: null, status: 'finished' };
      }
    }

    animationRefs.current[carId] = requestAnimationFrame(step);
  };

  const stopCar = (carId: number) => {
    if (animationRefs.current[carId]) {
      cancelAnimationFrame(animationRefs.current[carId]);
      delete animationRefs.current[carId];
    }
  };

  const resetCar = (carId: number) => {
    stopCar(carId);
    carPositions.current[carId] = 0;

    const carEl = carContainerRef.current[carId];
    if (carEl) carEl.style.transform = `rotate(90deg)`;
  };

  return { moveCar, stopCar, resetCar };
};

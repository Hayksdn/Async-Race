import { useRef, type RefObject } from 'react';

export const useCarAnimations = (
  containerRef: RefObject<HTMLDivElement | null>,
  getMaxDistance: (carEl: HTMLDivElement | null, distance: number) => number
) => {
  const carContainerRef = useRef<Record<number, HTMLDivElement | null>>({});
  const carPositions = useRef<Record<number, number>>({});
  const animationRefs = useRef<Record<number, number>>({});

  const moveCar = (carId: number, velocity: number, distance: number) => {

    let start: number | null = null;

    if (carPositions.current[carId] === undefined) carPositions.current[carId] = 0;

    function step(timestamp: number) {

      if (!start) start = timestamp;

      const carEl = carContainerRef.current[carId];
      if (!carEl || !containerRef.current) return;

      const maxDistance = getMaxDistance(carEl, distance);

      const elapsed = (timestamp - start) / 1000;
      const traveled = Math.min(elapsed * velocity, maxDistance);

      carPositions.current[carId] = traveled;
      carEl.style.transform = `translateX(${traveled}px) rotate(90deg)`;

      if (traveled < distance) {
        animationRefs.current[carId] = requestAnimationFrame(step);
      } else {
        delete animationRefs.current[carId];
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

  return { carContainerRef, carPositions, animationRefs, moveCar, stopCar, resetCar };
};

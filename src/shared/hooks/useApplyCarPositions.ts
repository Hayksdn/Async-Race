import { useLayoutEffect, type RefObject } from 'react';
import type { Car } from '@/shared/types/car';

export function useApplyCarPositions(
  currentPageCars: Car[],
  carContainerRef: RefObject<Record<number, HTMLDivElement | null>>,
  carPositions: RefObject<Record<number, number>>
) {
  useLayoutEffect(() => {
    const applyPositions = () => {
      currentPageCars.forEach((car) => {
        const el = carContainerRef.current[car.id];
        if (!el) return;
        const pos = carPositions.current[car.id] ?? 0;
        el.style.transform = `translateX(${pos}px) rotate(90deg)`;
      });
    };

    const id = requestAnimationFrame(() => {
      currentPageCars.forEach((car) => {
        if (!carContainerRef.current[car.id]) {
          requestAnimationFrame(applyPositions);
        }
      });
      applyPositions();
    });

    return () => cancelAnimationFrame(id);
  }, [currentPageCars, carContainerRef, carPositions]);
}

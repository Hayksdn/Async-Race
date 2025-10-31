import { useEffect, useRef, useState } from 'react';

export const useTrackWidth = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const getMaxDistance = (carEl: HTMLDivElement | null, distance: number) => {
    if (!carEl || !containerRef.current){
      console.log('containerRef.current', containerRef.current)
      console.log(carEl, 'carel')
      return 0;

    }
      

    const startX = carEl.offsetLeft;

    const maxDistance = Math.min(
      distance,
      containerRef.current.clientWidth - startX - carEl.offsetWidth
    );

    return maxDistance;
  };

  return { containerRef, width, getMaxDistance };
};

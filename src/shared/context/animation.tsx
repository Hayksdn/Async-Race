import { type ReactNode, useRef, useState } from 'react';
import { AnimationContext, type OngoingDrive } from './animationContext';

type AnimationProviderProps = {
  children: ReactNode;
};

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const carContainerRef = useRef<Record<number, HTMLDivElement | null>>({});
  const animationRefs = useRef<Record<number, number>>({});
  const ongoingDrive = useRef<Record<number, OngoingDrive | null>>({});
  const carPositions = useRef<Record<number, number>>({});
  const [isRaceRunning, setIsRaceRunning] = useState(false);

  const value = {
    carContainerRef,
    animationRefs,
    ongoingDrive,
    carPositions,
    isRaceRunning,
    setIsRaceRunning,
  };

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};

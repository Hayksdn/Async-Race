import { type ReactNode, useRef } from 'react';
import { AnimationContext, type OngoingDrive } from './animationContext';

type AnimationProviderProps = {
  children: ReactNode;
};

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const carContainerRef = useRef<Record<number, HTMLDivElement | null>>({});
  const animationRefs = useRef<Record<number, number>>({});
  const ongoingDrive = useRef<Record<number, OngoingDrive | null>>({});
  const carPositions = useRef<Record<number, number>>({});

  const value = {
    carContainerRef,
    animationRefs,
    ongoingDrive,
    carPositions,
  };

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};

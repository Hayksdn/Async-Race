import { createContext, useContext, type RefObject } from 'react';

export type OngoingDrive = {
  controller: AbortController | null;
  status: 'running' | 'finished' | 'stopped';
};

export type AnimationContextProps = {
  carContainerRef: RefObject<Record<number, HTMLDivElement | null>>;
  animationRefs: RefObject<Record<number, number>>;
  carPositions: React.RefObject<Record<number, number>>;
  ongoingDrive: RefObject<Record<number, OngoingDrive | null>>;
};

export const AnimationContext = createContext<AnimationContextProps | null>(null);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) throw new Error('useAnimation must be used within AnimationProvider');
  return context;
};

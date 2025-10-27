export type CarEngineData = {
  velocity: number;
  distance: number;
};

export type EngineControlPayload = {
  carId: number;
  status: 'started' | 'stopped' | 'drive';
};

export type CarEngineResponse = {
  carId: number;
  status: 'started' | 'stopped' | 'drive';
  velocity: number;
  distance: number;
};

export type DriveEngineData = {
  success: boolean;
};

export type DriveEngineResponse = {
  carId: number;
  success: boolean;
};

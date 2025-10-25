export type Car = {
  id: number;
  name: string;
  color: string;
};

export type CarResponse = {
  cars: Car[];
  totalCount: number;
};

export type NewCar = {
  name: string;
  color: string;
};

export type FetchCarsParams = {
  page: number;
  limit?: number;
};

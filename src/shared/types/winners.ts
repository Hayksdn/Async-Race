export type Winners = {
  id: number;
  wins: number;
  time: number;
};

export type WinnersResponse = {
  winners: Winners[];
  totalCount: number;
};

export type GetAllWinnersParams = {
  page?: number;
  limit?: number;
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
};

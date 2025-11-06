import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { fetchCars } from '@/shared/store/garage/garageThunks';

export const useFetchGarageCars = () => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector((state) => state.garage.totalCount);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCars({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { currentPage, handlePageChange, totalCount };
};

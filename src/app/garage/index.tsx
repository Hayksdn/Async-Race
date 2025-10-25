import { Button, ButtonGroup, Flex, IconButton, Input, Pagination, Text } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/shared/store/store';
import { useEffect, useState } from 'react';
import { CustomContainer } from '@/shared/components/layout/container';
import {
  addCar,
  fetchCars,
  generateCars,
  removeCar,
  updateCar,
} from '@/shared/store/garage/garageThunks';
import CarIcon from '@/shared/assets/icons/car';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
const Garage = () => {
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('#ff0000');

  const [editingCarBrand, setEditingCarBrand] = useState('');
  const [editingCarColor, setEditingCarColor] = useState('#ff0000');
  const [isEditingCarId, setIsEditingCarId] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.garage.cars);
  const totalCount = useSelector((state: RootState) => state.garage.totalCount);
  const totalPageCount = useSelector((state: RootState) => state.garage.totalPageCount);

  const [currentPage, setCurrentPage] = useState(1);
  //////mount all cars
  useEffect(() => {
    dispatch(fetchCars({ page: currentPage }));
  }, [dispatch, currentPage]);

  ///////create 1 car
  const handleCreate = async () => {
    if (!brand) return;

    await dispatch(addCar({ name: brand, color })); // wait for backend
    dispatch(fetchCars({ page: currentPage })); // refresh current page
    setBrand('');
    setColor('#ff0000');
  };
  //////////car generation
  const handleGenerateCars = async () => {
    await dispatch(generateCars()); // generate 100 cars
    dispatch(fetchCars({ page: currentPage })); // refresh current page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRemove = async (carId: number) => {
    await dispatch(removeCar(carId));
    dispatch(fetchCars({ page: currentPage }));
  };

  const handleUpdate = async () => {
    if (!editingCarBrand || !isEditingCarId) return;

    await dispatch(
      updateCar({
        carId: isEditingCarId,
        updatedCar: { name: editingCarBrand, color: editingCarColor },
      })
    );

    dispatch(fetchCars({ page: currentPage })); 

    setEditingCarBrand('');
    setEditingCarColor('#ff0000');
    setIsEditingCarId(0);
  };

  return (
    <CustomContainer
      variant="containerFull"
      mx="auto"
      display="flex"
      flexDir="column"
      gap="3rem"
      mb="5rem"
      mt="3rem"
      bg="green"
    >
      <Flex flexDir="row" gap="4rem" pt="2rem">
        <Flex flexDir="row" gap="3">
          <Button>Race</Button>
          <Button>Reset</Button>
        </Flex>

        <Flex flexDir="row" gap="2">
          <Input
            placeholder="TYPE CAR BRAND"
            size="md"
            variant="outline"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            width="40px"
            height="40px"
            padding="0"
            borderRadius="5px"
          />

          <Button onClick={handleCreate}>Create</Button>
        </Flex>

        <Flex flexDir="row" gap="2">
          <Input
            placeholder="TYPE CAR BRAND"
            size="md"
            variant="outline"
            value={editingCarBrand}
            onChange={(e) => setEditingCarBrand(e.target.value)}
          />

          <Input
            type="color"
            value={editingCarColor}
            onChange={(e) => setEditingCarColor(e.target.value)}
            width="40px"
            height="40px"
            padding="0"
            borderRadius="5px"
          />

          <Button onClick={handleUpdate} disabled={!isEditingCarId}>
            Update
          </Button>
        </Flex>

        <Button onClick={handleGenerateCars}>GENERATE CARS</Button>
      </Flex>

      <Flex>
        <Flex flexDir="column">
          {cars.map((car) => {
            return (
              <Flex flexDir="row" gap="2" key={car.id}>
                <Flex flexDir="row">
                  <Flex flexDir="column" gap="1">
                    <Button onClick={() => setIsEditingCarId(car.id)}>Select</Button>
                    <Button onClick={() => handleRemove(car.id)}>Remove</Button>
                  </Flex>

                  <Flex flexDir="column" gap="1">
                    <Button>A</Button>
                    <Button>B</Button>
                  </Flex>
                </Flex>

                <CarIcon
                  width="50px"
                  color={car.color}
                  height="50px"
                  style={{ transform: 'rotate(90deg)' }}
                />

                <Text>{car.name}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <Flex flexDir="row" justify="space-between">
        <Text color="red.500">GARAGE{totalCount}</Text>

        <Pagination.Root
          count={totalCount}
          pageSize={7}
          page={currentPage}
          onPageChange={(details) => handlePageChange(details.page)}
        >
          <ButtonGroup gap="4" size="sm" variant="ghost">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <HiChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>
            <Pagination.PageText />
            <Pagination.NextTrigger asChild>
              <IconButton>
                <HiChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Flex>
    </CustomContainer>
  );
};

export default Garage;

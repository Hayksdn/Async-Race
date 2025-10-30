import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  Pagination,
  Text,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { store, type AppDispatch, type RootState } from '@/shared/store/store';
import { useEffect, useRef, useState } from 'react';
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
import { setDriveEngine, setEngineStatus } from '@/shared/store/engine/engineThunks';
import type { Car } from '@/shared/types/car';
import type { SvgIconType } from '@/shared/assets/icons/_props';
import { useContainerDimensions } from '@/shared/hooks/useContainerDimensions';
const Garage = () => {
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('#ff0000');

  const [editingCarBrand, setEditingCarBrand] = useState('');
  const [editingCarColor, setEditingCarColor] = useState('#ff0000');
  const [isEditingCarId, setIsEditingCarId] = useState(0);

  ///////////garage dispatch
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.garage.cars);
  const totalCount = useSelector((state: RootState) => state.garage.totalCount);
  const totalPageCount = useSelector((state: RootState) => state.garage.totalPageCount);

  ///////////////////enginedispatch
  const engineStatus = useSelector((state: RootState) => state.engine.engineStatus);
  const driving = useSelector((state: RootState) => state.engine.driving);
  // const velocity = useSelector((state: RootState) => state.engine.velocity);
  // const distance = useSelector((state: RootState) => state.engine.distance);
  //animation state

  const carContainerRef = useRef<Record<number, HTMLDivElement | null>>({});
  const carPositions = useRef<Record<number, number>>({});
  const animationRefs = useRef<Record<number, number>>({});

  const { containerRef, width, getMaxDistance } = useContainerDimensions();

  const [currentPage, setCurrentPage] = useState(1);

  //////mount all cars
  useEffect(() => {
    dispatch(fetchCars({ page: currentPage }));
  }, [dispatch, currentPage]);

  ///////create 1 car
  const handleCreate = async () => {
    if (!brand) return;

    await dispatch(addCar({ name: brand, color }));
    dispatch(fetchCars({ page: currentPage }));
    setBrand('');
    setColor('#ff0000');
  };
  //////////car generation
  const handleGenerateCars = async () => {
    await dispatch(generateCars());
    dispatch(fetchCars({ page: currentPage }));
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

  const handleEngineToggle = async (carId: number) => {
    if (driving[carId] === true) return;
    if (engineStatus[carId] !== 'started') {
      const result = await dispatch(setEngineStatus({ carId, status: 'started' })).unwrap();

      moveCar(carId, result.velocity, result.distance);

      try {
        const driveEngineResult = await dispatch(
          setDriveEngine({ carId, status: 'drive' })
        ).unwrap();
      } catch (error) {
        if (animationRefs.current[carId]) {
          cancelAnimationFrame(animationRefs.current[carId]);
          delete animationRefs.current[carId];
        }
      }
      return;
    }
  };

   const startAllEngines = async (cars: Car[]) => {
    await Promise.all(
      cars.map(async (car) => {
        if (!driving[car.id]) {
          try {
            await dispatch(setEngineStatus({ carId: car.id, status: 'started' }));
            await dispatch(setDriveEngine({ carId: car.id, status: 'drive' }));
          } catch (error) {
            console.error(`Failed to start car ${car.id}`, error);
          }
        }
      })
    );
  };

  const handleStopEngine = (carId: number) => {
    dispatch(setEngineStatus({ carId, status: 'stopped' }));
    if (animationRefs.current[carId]) {
      cancelAnimationFrame(animationRefs.current[carId]);
      delete animationRefs.current[carId];
    }
    carPositions.current[carId] = 0;

    const carEl = carContainerRef.current[carId];
    if (carEl) {
      carEl.style.transform = `rotate(90deg)`;
    }
  };

 

  const stopAllEngines = async (cars: Car[], driving: Record<number, boolean>) => {
    await Promise.all(
      cars.map(async (car) => {
        if (driving[car.id]) {
          try {
            await dispatch(setEngineStatus({ carId: car.id, status: 'stopped' }));
          } catch (error) {
            console.error(`Failed to stop car ${car.id}`, error);
          }
        }
      })
    );
  };

  const moveCar = (carId: number, velocity: number, distance: number) => {
    let start: number | null = null;

    if (carPositions.current[carId] === undefined) carPositions.current[carId] = 0;

    function step(timestamp: number) {
      if (!start) start = timestamp;

      const carEl = carContainerRef.current[carId];
      const maxDistance = getMaxDistance(carEl, distance);

      const elapsed = (timestamp - start) / 1000;
      const traveled = Math.min(elapsed * velocity, maxDistance);

      if (carEl) {
        carPositions.current[carId] = traveled;
        carEl.style.transform = `translateX(${traveled}px) rotate(90deg)`;
      }

      if (traveled < distance) {
        animationRefs.current[carId] = requestAnimationFrame(step);
      } else {
        delete animationRefs.current[carId];
      }
    }

    animationRefs.current[carId] = requestAnimationFrame(step);
  };
  return (
    <CustomContainer
      ref={containerRef}
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
          <Button onClick={() => startAllEngines(cars)}>Race</Button>
          <Button onClick={() => stopAllEngines(cars, driving)}>Reset</Button>
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
                    <Button onClick={() => handleEngineToggle(car.id)}>A</Button>
                    <Button onClick={() => handleStopEngine(car.id)}>B</Button>
                  </Flex>
                </Flex>

                <Box
                  ref={(el: HTMLDivElement | null) => {
                    carContainerRef.current[car.id] = el;
                  }}
                  style={{
                    transform: `rotate(90deg)`,
                  }}
                >
                  <CarIcon width="50px" color={car.color} height="50px" />
                </Box>

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

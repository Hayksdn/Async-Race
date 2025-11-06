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

import { useState } from 'react';
import { CustomContainer } from '@/shared/components/layout/container';
import {
  addCar,
  generateCars,
  getCar,
  removeCar,
  updateCar,
} from '@/shared/store/garage/garageThunks';
import CarIcon from '@/shared/assets/icons/car';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { useStartEngine } from '@/shared/hooks/useStartEngine';
import { useStopEngine } from '@/shared/hooks/useStopEngine';
import { useTrackWidth } from '@/shared/hooks/useTrackWidth';
import { useCarAnimations } from '@/shared/hooks/useCarAnimation';
import { useAnimation } from '@/shared/context/animationContext';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { selectAllCarsArray, selectCurrentPageCars } from '@/shared/store/garage/garageSlice';
import { useApplyCarPositions } from '@/shared/hooks/useApplyCarPositions';
import { useFetchGarageCars } from '@/shared/hooks/useFetchGarageCars';
const Garage = () => {
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('#ff0000');

  const [editingCarBrand, setEditingCarBrand] = useState('');
  const [editingCarColor, setEditingCarColor] = useState('#ff0000');
  const [isEditingCarId, setIsEditingCarId] = useState(0);

  const dispatch = useAppDispatch();

  const { carContainerRef, animationRefs, ongoingDrive, carPositions, isRaceRunning } =
    useAnimation();

  const cars = useAppSelector(selectCurrentPageCars);
  useApplyCarPositions(cars, carContainerRef, carPositions);

  const allCars = useAppSelector(selectAllCarsArray);

  const { containerRef, getMaxDistance } = useTrackWidth();

  const { moveCar, stopCar, resetCar } = useCarAnimations(
    getMaxDistance,
    carContainerRef,
    animationRefs,
    carPositions,
    ongoingDrive
  );

  const { startEngine, startAllEngines } = useStartEngine(moveCar, stopCar, ongoingDrive);
  const { stopEngine, stopAllEngines } = useStopEngine(ongoingDrive, resetCar);

  const { currentPage, handlePageChange, totalCount } = useFetchGarageCars();

  const handleCreate = async () => {
    if (!brand) return;

    await dispatch(addCar({ name: brand, color }));
    setBrand('');
    setColor('#ff0000');
  };
  const handleGenerateCars = async () => {
    await dispatch(generateCars());
  };

  const handleRemove = async (carId: number) => {
    await dispatch(removeCar(carId));
  };

  const handleSelectCar = async (carId: number) => {
    const car = await dispatch(getCar(carId)).unwrap();
    setEditingCarBrand(car.name);
    setEditingCarColor(car.color);
    setIsEditingCarId(car.id);
  };

  const handleUpdate = async () => {
    if (!editingCarBrand || !isEditingCarId) return;

    await dispatch(
      updateCar({
        carId: isEditingCarId,
        updatedCar: { name: editingCarBrand, color: editingCarColor },
      })
    );

    setEditingCarBrand('');
    setEditingCarColor('#ff0000');
    setIsEditingCarId(0);
  };

  return (
    <CustomContainer
      ref={containerRef}
      variant="containerFull"
      mx="auto"
      pt={{ base: '1rem', md: '2rem' }}
    >
      <Flex
        flexDir={{ base: 'column', lg: 'row' }}
        gap={{ base: '1rem', lg: '4rem' }}
        flexWrap="wrap"
        align="center"
        justify="center"
        pb="2rem"
      >
        <Flex
          flexDir={{ base: 'column', sm: 'row' }}
          gap="3"
          justify="center"
          align="center"
          w="100%"
        >
          <Button onClick={() => startAllEngines(allCars)} w={{ base: '100%', sm: 'auto' }}>
            Race
          </Button>
          <Button onClick={() => stopAllEngines(allCars)} w={{ base: '100%', sm: 'auto' }}>
            Reset
          </Button>
        </Flex>

        <Flex
          flexDir={{ base: 'column', sm: 'row' }}
          gap="2"
          align="center"
          justify="center"
          w="100%"
        >
          <Input
            placeholder="TYPE CAR BRAND"
            size="md"
            variant="outline"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            disabled={isRaceRunning}
            w={{ base: '100%', sm: 'auto' }}
          />

          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            width="40px"
            height="40px"
            w={{ base: '100%', sm: '40px' }}
            padding="0"
            borderRadius="5px"
            disabled={isRaceRunning}
          />

          <Button onClick={handleCreate} disabled={isRaceRunning} w={{ base: '100%', sm: 'auto' }}>
            Create
          </Button>
        </Flex>

        <Flex
          flexDir={{ base: 'column', sm: 'row' }}
          gap="2"
          align="center"
          justify="center"
          w="100%"
        >
          <Input
            placeholder="TYPE CAR BRAND"
            size="md"
            variant="outline"
            value={editingCarBrand}
            onChange={(e) => setEditingCarBrand(e.target.value)}
            disabled={isRaceRunning}
            w={{ base: '100%', sm: 'auto' }}
          />

          <Input
            type="color"
            value={editingCarColor}
            onChange={(e) => setEditingCarColor(e.target.value)}
            width="40px"
            height="40px"
            padding="0"
            borderRadius="5px"
            disabled={isRaceRunning}
            w={{ base: '100%', sm: '40px' }}
          />

          <Button
            onClick={handleUpdate}
            disabled={!isEditingCarId || isRaceRunning}
            w={{ base: '100%', sm: 'auto' }}
          >
            Update
          </Button>
        </Flex>

        <Button
          onClick={handleGenerateCars}
          disabled={isRaceRunning}
          w={{ base: '100%', sm: 'auto' }}
        >
          GENERATE CARS
        </Button>
      </Flex>

      <Flex flexDir="column" gap="1rem">
        {cars.map((car) => (
          <Flex
            key={car.id}
            flexDir={{ base: 'column', sm: 'row' }}
            align={{ base: 'center', sm: 'flex-start' }}
            justify="flex-start"
            gap={{ base: '1rem', sm: '2rem' }}
            borderWidth="1px"
            borderRadius="md"
            p="1rem"
            w="100%"
            overflow="hidden"
          >
            <Flex
              flexDir="row"
              flexWrap="wrap"
              justify="center"
              align="center"
              gap="2"
              w={{ base: '100%', sm: 'auto' }}
            >
              <Button onClick={() => handleSelectCar(car.id)} disabled={isRaceRunning} size="sm">
                Select
              </Button>
              <Button onClick={() => handleRemove(car.id)} disabled={isRaceRunning} size="sm">
                Remove
              </Button>
              <Button onClick={() => startEngine(car.id)} size="sm">
                A
              </Button>
              <Button onClick={() => stopEngine(car.id)} size="sm">
                B
              </Button>
            </Flex>

            <Flex
              align="center"
              justify="flex-start"
              position="relative"
              w="100%"
              overflow="hidden"
              minH={{ base: '60px', md: '80px' }}
            >
              <Box
                ref={(el: HTMLDivElement | null) => {
                  carContainerRef.current[car.id] = el;
                  if (el) {
                    const pos = carPositions.current[car.id] ?? 0;
                    el.style.transform = `translateX(${pos}px) rotate(90deg)`;
                  }
                }}
              >
                <CarIcon width="50px" color={car.color} height="50px" />
              </Box>
              <Text fontSize={{ base: 'sm', md: 'md' }} ml="2">
                {car.name}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex flexDir="row" justify="space-between" align="center" mt="1.5rem">
        <Text fontWeight="bold" color="red.500">
          GARAGE {totalCount}
        </Text>

        <Pagination.Root
          count={totalCount}
          pageSize={7}
          page={currentPage}
          onPageChange={(details) => !isRaceRunning && handlePageChange(details.page)}
        >
          <ButtonGroup gap="4" size="sm" variant="solid" colorScheme="blue">
            <Pagination.PrevTrigger asChild>
              <IconButton
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                _disabled={{ bg: 'gray.400', cursor: 'not-allowed' }}
                aria-label="Previous page"
              >
                <HiChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.PageText
              color="white"
              bg="blue.600"
              px="3"
              py="1"
              borderRadius="md"
              fontWeight="bold"
            />

            <Pagination.NextTrigger asChild>
              <IconButton
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                _disabled={{ bg: 'gray.400', cursor: 'not-allowed' }}
                aria-label="Next page"
              >
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

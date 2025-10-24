import { Button, Flex, Input } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/shared/store/store';
import { useEffect, useState } from 'react';
import { CustomContainer } from '@/shared/components/layout/container';
import { addCar, fetchCars } from '@/shared/store/garage/garageThunks';
import CarIcon from '@/shared/assets/icons/car';
const Garage = () => {
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('#ff0000');
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.garage.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleCreate = () => {
    if (!brand) return;
    dispatch(addCar({ name: brand, color }));
    setBrand('');
    setColor('#ff0000');
  };
  return (
    // <Flex>{cars.length === 0 ? 'Loading...' : cars.map((car) => car.name).join(', ')}</Flex>
    <CustomContainer
      variant="containerFull"
      mx="auto"
      display="flex"
      flexDir="row"
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
      </Flex>

      <Flex>
        <CarIcon
          width="50px"
          color="#ff0000"
          height="50px"
          style={{ transform: 'rotate(90deg)' }}
        />
      </Flex>
    </CustomContainer>
  );
};

export default Garage;

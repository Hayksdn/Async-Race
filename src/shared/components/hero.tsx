import { Button, Flex } from '@chakra-ui/react';
import { CustomContainer } from './layout/container';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <CustomContainer
      variant="container"
      mx="auto"
      display="flex"
      flexDir="row"
      gap="3rem"
      mb="5rem"
      mt="3rem"
    >
      <Flex flexDir="column" gap="4" pt="4" pl="4">
        <NavLink to="/garage">
          <Button variant="primary">GARAGE</Button>
        </NavLink>
        <NavLink to="/winners">
          <Button variant="secondary">WINNERS</Button>{' '}
        </NavLink>
      </Flex>
    </CustomContainer>
  );
};

export default Hero;

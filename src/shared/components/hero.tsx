import { Button, Flex } from '@chakra-ui/react';
import { CustomContainer } from './layout/container';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <CustomContainer
      variant="container"
      mx="auto"
      display="flex"
      flexDir={{ base: 'column', md: 'row' }}
      gap={{ base: '1rem', md: '3rem' }}
      mb="5rem"
      mt="3rem"
    >
      <Flex flexDir={{ base: 'row', md: 'column' }} gap="4" pt="4" pl="4" justify="center">
        <NavLink to="/">
          <Button variant="solid" width={{ base: '120px', md: 'auto' }}>
            GARAGE
          </Button>
        </NavLink>
        <NavLink to="/winners">
          <Button variant="outline" width={{ base: '120px', md: 'auto' }}>
            WINNERS
          </Button>
        </NavLink>
      </Flex>
    </CustomContainer>
  );
};

export default Hero;

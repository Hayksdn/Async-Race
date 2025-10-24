import type { ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';
import Hero from '../hero';
import bricksImage from "@/shared/assets/images/bricksImage.jpg";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex w="100%" h="fit-content" minH="100%" direction="column" mx="auto" bgImage={`url(${bricksImage})`} 
      bgRepeat="no-repeat"
      bgSize="cover">
      <Hero />

      <Flex height="100%" flex={1} flexDir="column" gap="4rem">
        {children}
      </Flex>
    </Flex>
  );
};

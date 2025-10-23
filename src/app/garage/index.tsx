import { Box, Flex, Image } from "@chakra-ui/react";
import bricksImage from "@/shared/assets/images/bricksImage.jpg";
import Hero from "@/shared/components/hero";

const Garage = () => {
  return (
   <Box
      w="100%"
      h="100%"
      bgImage={`url(${bricksImage})`} 
      bgRepeat="no-repeat"
      bgSize="cover"
      display='flex'
      flexDir='column'
    >
     <Hero/>
     
    </Box>
  );
};

export default Garage;
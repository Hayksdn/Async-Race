import { Button, Flex } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Flex  flexDir='row' w='fit-content' h='fit-content'>
      <Button
 variant="transparent"
  // borderImageSlice={1}
  // borderImageSource="linear-gradient(90deg, #8abcc4, #9fbfc9)"
>
  GARAGE
</Button>
        <Button variant='secondary'>WINNERS</Button>
    </Flex>

  );
};

export default Hero;

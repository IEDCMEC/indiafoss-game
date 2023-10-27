import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text, Avatar } from "@chakra-ui/react";
import { useTimer } from "@/contexts/Timer";

const Navbar = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(JSON.parse(window.localStorage.getItem("data")));
  }, []);
  const timer = useTimer();

  return (
    <Flex
      justify="space-between"
      alignItems="center"
      bg="#094074"
      color="white"
      borderBottomLeftRadius={"md"}
      borderBottomRightRadius={"md"}
      p={2}
      position="absolute"
      top="0"
      w="100%"
      zIndex="999"
    >
      <Box>
        <Heading as="h1" size="lg">
          Capture The Flag 🚩 !
        </Heading>
      </Box>
      <Box>
        <Text fontSize="1.3rem">
          Time Left : <b>{timer.timer}</b> s
        </Text>
        <Flex alignItems="center">
          <Avatar size="sm" name={data?.name} src="/avatar.jpg" mr={2} />
          <Text fontSize="sm">{data?.email}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;

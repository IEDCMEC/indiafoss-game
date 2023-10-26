import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text, Avatar } from "@chakra-ui/react";
import { useContext } from "react";
import { ContextProvider } from "@/contexts/ContextApi";
import { useTimer } from "@/contexts/Timer";
const Navbar = ({gamename}) => {
    const {formData} = useContext(ContextProvider)
    // console.log(formData.name)
    const [data ,setData] = useState({});
    useEffect(()=>{
        setData(JSON.parse(window.localStorage.getItem('data')))
        // console.log(data)
    }, [])
    const timer = useTimer();
  return (
    <Flex
      justify="space-between"
      alignItems="center"
      bg="#094074"
      color="white"
      borderBottomLeftRadius={'md'}
      borderBottomRightRadius={'md'}
      p={2}
      position="absolute"
      top="0"
      w='100%'
      zIndex="999"
    >
      <Box>
        <Heading as="h1" size="lg">
          Capture the flag
        </Heading>
      </Box>
      <Box>
        <Text fontSize='1.3rem'>Time left: {timer} s</Text>
        <Flex alignItems="center">
          <Avatar size="sm" name={data.name} src="/avatar.jpg" mr={2} />
          <Text fontSize="sm">{data.email}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;

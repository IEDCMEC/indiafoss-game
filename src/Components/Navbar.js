import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text, Avatar, Button } from "@chakra-ui/react";
import { useTimer } from "@/contexts/Timer";
import InstructionsModal from "./InstructionsModal";

const Navbar = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

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
      <Flex alignItems="center" justifyContent="space-between" gap={10}>
        <Button
          backgroundColor="#ffffff"
          onClick={() => setOpen(true)}
          sx={{
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          }}
          color="#094074"
          w={"150px"}
        >
          Instructions
        </Button>
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
      <InstructionsModal open={open} handleClose={handleClose} />
    </Flex>
  );
};

export default Navbar;

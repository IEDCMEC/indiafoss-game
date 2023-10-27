import { useState, useEffect } from "react";
import { Box, Heading, Text, Button, Flex, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "@/Components/Navbar";
import { useTimer } from "@/contexts/Timer";
import axios from "axios";
import Footer from "@/Components/Footer";

function Complete() {
  const router = useRouter();
  const { setSeconds } = useTimer();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  const fetchDetails = async () => {
    const userId = window.localStorage.getItem("TheGameUserId");

    const res = await axios.get(`/api/complete/${userId}`);

    if (res) {
      setName(res.data[0].name);
      setScore(res.data[0].score);
      setTime(res.data[0].time_taken);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <Box
        backgroundColor="#c2d0dd"
        height="100vh"
        width="100vw"
        flexDirection={{ base: "column", md: "row" }}
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        <Navbar />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <Heading as="h1" size="xl" mb={4} color="black">
            Thank You for Playing!
          </Heading>
          <Text fontSize="lg" mb={6} color="black">
            We appreciate your participation in our game.
          </Text>
          <Text fontSize="xl" size="md" mb={4} color="black">
            Name : <b>{name}</b>
          </Text>
          <Text fontSize="xl" size="md" mb={4} color="black">
            Score : <b>{score}</b>
          </Text>
          <Text fontSize="xl" size="md" mb={4} color="black">
            Time Taken : <b>{time} seconds</b>
          </Text>
          <Button
            backgroundColor="#094074"
            sx={{
              "&:hover": {
                backgroundColor: "#094074",
              },
            }}
            color="white"
            onClick={() => {
              window.localStorage.removeItem("token");
              window.localStorage.removeItem("TheGameUserId");
              window.localStorage.setItem("progressing", false);
              window.localStorage.setItem("timer", 600);
              window.localStorage.removeItem("data");
              setSeconds(600);
              router.replace("/");
            }}
          >
            Return to Homepage
          </Button>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Complete;

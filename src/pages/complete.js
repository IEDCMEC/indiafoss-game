import { useState, useEffect } from "react";
import { Box, Heading, Text, Button, Flex, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "@/Components/Navbar";
import { useContext } from "react";
import { useTimer } from "@/contexts/Timer";
import axios from "axios";

function Complete() {
  const router = useRouter();
  const { setSeconds } = useTimer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  const fetchDetails = async () => {
    const userId = window.localStorage.getItem("TheGameUserId");

    const res = await axios.get(`/api/complete/${userId}`);

    console.log(res);

    if (res) {
      setName(res.data[0].name);
      setEmail(res.data[0].email);
      setScore(res.data[0].score);
      setTime(res.data[0].time_taken);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        color="teal"
      >
        <Heading as="h1" size="xl" mb={4} color="black">
          Thank You for Playing!
        </Heading>
        <Text fontSize="lg" mb={6} color="black">
          We appreciate your participation in our game.
        </Text>
        <Text fontSize="lg" mb={6} color="black">
          {name}, your score is {score} and you took {time} seconds to complete
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
            setSeconds(600);
            router.replace("/");
          }}
        >
          Return to Homepage
        </Button>
      </Box>
    </>
  );
}

export default Complete;

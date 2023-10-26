import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import generateUniqueFlag from "@/utils/UniqueFlag";
import { Box } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useTimer } from "@/contexts/Timer";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const game6FlagStaticPart = "flag{dskajfhsdhk";
const gameScore = 6;
const game7URL = "/Z2FtZS03";

export default function Game6() {
  const router = useRouter();
  const { timer } = useTimer();

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchUniqueFlag = () => {
    const userId = window.localStorage.getItem("TheGameUserId");
    const newFlag = generateUniqueFlag(userId);
    setFlag(`${game6FlagStaticPart}${newFlag}}`);
  };

  const handleFlagSubmit = async (e) => {
    e, preventDefault();
    if (submission === flag) {
      toast.success("Correct Flag!!");
      const res = await axios.post("/api/check/game-6", {
        authToken: window.localStorage.getItem("token"),
        score: gameScore,
        timeTaken: 600 - timer,
      });

      if (res.status == 200) {
        router.replace(game7URL);
      }
    } else {
      window.alert("Incorrect!");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }
    fetchUniqueFlag();
  }, []);

  useEffect(() => {
    if (timer < 1) {
      window.alert("Time's up!");
      router.replace("/complete");
    }
  }, [timer]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      await fetch(`/next-page/id={${flag}}`);
    }
    window.alert("Invalid credentials");
  };

  return (
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
        flexDirection={"column"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={{ base: "95vw", sm: "400px" }}
        border="2px solid #094074"
        borderRadius={"md"}
        padding={"30px 0"}
        minHeight="300px"
        // sx={{
        //   '&:hover':{
        //     border: '2px solid #190482'
        //   }
        // }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          flexDirection={"column"}
          // mb={5}
        >
          <Heading as="h2" size="xl">
            Check network tab
          </Heading>
          {/* <p>Time Left: {timer}</p> */}
        </Box>
        <form onSubmit={handleFlagSubmit}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
            width={"350px"}
          >
            {/* <label htmlFor="submission">Flag</label>
          <input
            id="submission"
            type="text"
            value={submission}
            onChange={(e) => {
              setSubmission(e.target.value);
            }}
          /> */}
            <CustomForm
              id="submission"
              type="text"
              value={submission}
              label="Submit the flag"
              setInput={(e) => {
                setSubmission(e.target.value);
              }}
            />
            <Button
              backgroundColor="#094074"
              sx={{
                "&:hover": {
                  backgroundColor: "#094074",
                },
              }}
              color="white"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <form onSubmit={handleFormSubmit}>
        <Box
          flexDirection={"column"}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={{ base: "95vw", sm: "400px" }}
          border="2px solid #094074"
          borderRadius={"md"}
          padding={"30px 0"}
          height="300px"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
            width={"350px"}
            height="100%"
          >
            <CustomForm
              id="username"
              type="text"
              input={username}
              label="Username"
              setInput={(e) => {
                setUsername(e.target.value);
              }}
            />
            <CustomForm
              id="password"
              type="password"
              input={password}
              label="Password"
              setInput={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              backgroundColor="#094074"
              sx={{
                "&:hover": {
                  backgroundColor: "#094074",
                },
              }}
              color="white"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
      <Footer />
    </Box>
  );
}

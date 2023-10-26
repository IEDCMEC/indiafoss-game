import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useTimer } from "@/contexts/Timer";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from "axios";

const gameAPI = "/api/Z2FtZS00/";
const gameScore = 4;
const game5URL = "/Z2FtZS01";

export default function Game4() {
  const router = useRouter();
  const { timer } = useTimer();

  // const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  // const fetchUniqueFlag = async () => {
  //   const data = await fetch(gameAPI).then((res) => res.json());
  //   const { flag } = data;
  //   setFlag(flag);
  // };

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
    // if (submission === flag) {
    //   toast.success("Correct Flag!!")
    const res = await axios.post("/api/check/game-4", {
      authToken: window.localStorage.getItem("token"),
      score: gameScore,
      timeTaken: 600 - timer,
      flag: submission,
    });

    if (res.status == 200) {
      router.replace(game5URL);
    }
    // } else {
    //   window.alert("Incorrect!");
    // }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }
    // fetchUniqueFlag();
  }, []);

  useEffect(() => {
    if (timer < 1) {
      window.alert("Time's up!");
      router.replace("/complete");
    }
  }, [timer]);

  return (
    <Box
      backgroundColor="#c2d0dd"
      height="100vh"
      width="100vw"
      flexDirection={"column"}
      display="flex"
      alignItems="center"
      justifyContent="center"
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
            API check
          </Heading>
          <p>{`API: ${gameAPI}${btoa(
            window.localStorage.getItem("TheGameUserId")
          )}`}</p>
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
      <Footer />
    </Box>
  );
}
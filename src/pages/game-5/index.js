import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useTimer } from "@/contexts/Timer";
import { Box } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
const gameAPI = "/api/game-5";
const gameScore = 5;
const game6URL = "/game-6";

export default function Game5() {
  const router = useRouter();
  const { timer } = useTimer();

  const [submission, setSubmission] = useState("");

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
      const res = await axios.post("/api/check/game-5", {
        authToken: window.localStorage.getItem("token"),
        score: gameScore,
        flag:submission,
        timeTaken: 600 - timer,
      });

      if (res.status == 200) {
        router.replace(game6URL);
      }
    };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }
  }, []);

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
            Head API
          </Heading>
          {/* <p>Time Left: {timer}</p> */}
          {timer < 300 ? <p>API: /api/game-5</p> : null}
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

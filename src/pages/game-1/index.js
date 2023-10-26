import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import generateUniqueFlag from "@/utils/UniqueFlag";
import { useTimer } from "@/contexts/Timer";
import { Box, Button, Heading } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import axios from "axios";
import toast from "react-hot-toast";

const game1FlagStaticPart = "flag{dskajfhsdhk";
const gameScore = 1;
const game2URL = "/game-3";

export default function Game1() {
  const router = useRouter();
  const { timer } = useTimer();

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const fetchUniqueFlag = () => {
    const userId = window.localStorage.getItem("TheGameUserId");
    const newFlag = generateUniqueFlag(userId);
    setFlag(`${game1FlagStaticPart}${newFlag}}`);
  };

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
      const res = await axios.post("/api/check/game-1", {
        authToken: window.localStorage.getItem("token"),
        timeTaken: 600 - timer,
        flag: submission,
      });

      if (res.status == 200) {
        router.replace(game2URL);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }
    fetchUniqueFlag();
  }, []);

  return (
    <Box
      backgroundColor="#AEDEFC"
      height="100vh"
      width="100vw"
      flexDirection={"column"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Box>
          <Box>
            <Box>
              <Box></Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        flexDirection={"column"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={{ base: "95vw", sm: "400px" }}
        border="2px solid #190482"
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
          <Box>
            <Box>
              <Box>
                <Box>
                  <Box></Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Heading as="h2" size="xl">
            HTML Inspect
          </Heading>
          <p>Time Left: {timer}</p>
        </Box>
        <Box></Box>
        <Box>
          <Box>
            <Box>
              <Box>
                <Box>
                  <p style={{ display: "none" }}>{flag}</p>
                </Box>
              </Box>
            </Box>
          </Box>
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
              input={submission}
              label="Submit the flag"
              setInput={(e) => {
                setSubmission(e.target.value);
              }}
            />
            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

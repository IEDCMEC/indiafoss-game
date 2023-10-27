import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import generateUniqueFlag from "@/utils/UniqueFlag";
import { useTimer } from "@/contexts/Timer";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "@/Components/Navbar";
import CustomForm from "@/Components/CustomForm";
import Footer from "@/Components/Footer";
import { Text } from "@chakra-ui/react";
import toast from "react-hot-toast";

const game1FlagStaticPart = process.env.NEXT_PUBLIC_STATIC_ONE;
const game3FlagStaticPart = process.env.NEXT_PUBLIC_STATIC_THREE;

const game2URL = "/Z2FtZS0z";

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
      userId: window.localStorage.getItem("TheGameUserId"),
      timeTaken: 600 - timer,
      flag: submission,
    });

    if (res.status == 200) {
      toast.success("Correct Flag 🚩!!");
      const newFlag = generateUniqueFlag(
        window.localStorage.getItem("TheGameUserId")
      );
      const flagg = `${game3FlagStaticPart}${newFlag}}`;
      document.cookie = `flag=${flagg};path=/`;
      router.replace(game2URL);
    } else if (res.status == 204) {
      toast.error("Wrong Flag!!");
      setSubmission("");
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
        border="2px solid #094074"
        borderRadius={"md"}
        padding={"2rem"}
        minHeight="300px"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          flexDirection={"column"}
          mb={5}
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
          <Text
            as="h4"
            sx={{
              fontSize: "1.25rem",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            To uncover the flag, in pixels you must delve. Find your way where
            tags and attributes dwell.{" "}
          </Text>
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
            <CustomForm
              id="submission"
              type="text"
              input={submission}
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

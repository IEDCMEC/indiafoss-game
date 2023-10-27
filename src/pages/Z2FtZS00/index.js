import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Button } from "@chakra-ui/react";
import { useTimer } from "@/contexts/Timer";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from "axios";
import toast from "react-hot-toast";

const gameAPI = "/api/Z2FtZS00/";
const game5URL = "/Z2FtZS01";

export default function Game4() {
  const router = useRouter();
  const { timer } = useTimer();

  const [userId, setUserId] = useState("");
  const [submission, setSubmission] = useState("");

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/check/game-4", {
      authToken: window.localStorage.getItem("token"),
      timeTaken: 600 - timer,
      flag: submission,
    });

    if (res.status == 200) {
      toast.success("Correct Flag 🚩!!");
      router.replace(game5URL);
    } else if (res.status == 204) {
      toast.error("Wrong Flag!!");
      setSubmission("");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }
    setUserId(window.localStorage.getItem("TheGameUserId"));
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
          <Text
            as="h4"
            sx={{
              fontSize: "1.25rem",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Point your eyes towards the end, there you will find your place of
            rest.
          </Text>
          <p>{`API: ${gameAPI}${btoa(userId)}`}</p>
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

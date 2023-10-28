import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Stack, Text } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Button } from "@chakra-ui/react";
import { useTimer } from "@/contexts/Timer";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const gameAPI = "/api/Z2FtZS00/";
const game5URL = "/Z2FtZS01";

export default function Game4() {
  const router = useRouter();
  const { timer } = useTimer();

  const [userId, setUserId] = useState("");
  const [submission, setSubmission] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFlagSubmit = async (e) => {
    e.preventDefault();

    if (submission.length == 0) {
      toast.error("Please enter the flag");
      return;
    }
    setLoading(true);
    const res = await axios.post("/api/check/game-4", {
      authToken: window.localStorage.getItem("token"),
      timeTaken: 450 - timer,
      flag: submission,
    });
    setLoading(false);

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
          <Text
            sx={{
              marginTop: "0.5rem",
              fontSize: "1rem",
              textAlign: "center",
              fontWeight: "700",
            }}
          >{`API: ${gameAPI}${btoa(userId)}`}</Text>
        </Box>
        <form onSubmit={!loading && handleFlagSubmit}>
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
            <Stack spacing={4} direction="row" align="center">
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
                {loading ? (
                  <PulseLoader color={"#ffffff"} size={10} />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                backgroundColor="#701009"
                sx={{
                  "&:hover": {
                    backgroundColor: "#701009",
                  },
                }}
                onClick={() => {
                  router.replace("/complete");
                }}
                color="white"
              >
                Finish
              </Button>
            </Stack>
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  );
}

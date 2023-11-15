import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import generateUniqueFlag from "@/utils/UniqueFlag";
import { Box, Stack, Text } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Button } from "@chakra-ui/react";
import { useTimer } from "@/contexts/Timer";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const game6FlagStaticPart = process.env.NEXT_PUBLIC_STATIC_SIX;
const game7URL = "/Z2FtZS03";

export default function Game6() {
  const router = useRouter();
  const { timer } = useTimer();

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUniqueFlag = () => {
    const userId = window.localStorage.getItem("TheGameUserId");
    const newFlag = generateUniqueFlag(userId);
    setFlag(`${game6FlagStaticPart}${newFlag}}`);
  };

  const handleFlagSubmit = async (e) => {
    e.preventDefault();

    if (submission.length == 0) {
      toast.error("Please enter the flag");
      return;
    }

    setLoading(true);

    const res = await axios.post("/api/check/game-6", {
      authToken: window.localStorage.getItem("token"),
      flag: submission,
      timeTaken: 600 - timer,
    });

    setLoading(false);

    if (res.status == 200) {
      toast.success("Correct Flag 🚩!!");
      router.replace(game7URL);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (username.length == 0 || password.length == 0) {
      toast.error("Please Enter the Credentials.");
      return;
    }

    const hiddenPassword = process.env.NEXT_PUBLIC_URL_PASSWORD;
    if (username == hiddenPassword && password == hiddenPassword) {
      await fetch(`/next-page/id={${flag}}`);
    } else {
      toast.error("Wrong Credentials!");
    }
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
            Access granted with the organizers' heart.
          </Text>
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
            <Stack direction="row" spacing={4} align="center">
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

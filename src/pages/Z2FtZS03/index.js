import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabasePublicClient } from "@/utils/supabasePublic";
import { Box, Text } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Button } from "@chakra-ui/react";
import { useTimer } from "@/contexts/Timer";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import toast from "react-hot-toast";
import axios from "axios";

const game8URL = "/complete";

export default function Game7() {
  const router = useRouter();
  const { timer } = useTimer();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [submission, setSubmission] = useState("");

  const handleFlagSubmit = async (e) => {
    e.preventDefault();

    if(submission.length == 0){
      toast.error("Please enter the flag");
      return;
    }
    
    const res = await axios.post("/api/check/game-7", {
      authToken: window.localStorage.getItem("token"),
      flag: submission,
      timeTaken: 600 - timer,
    });

    if (res.status == 200) {
      toast.success("Correct Flag 🚩!!");
      router.replace(game8URL);
    } else if (res.status == 204) {
      toast.error("Wrong Flag!!");
      setSubmission("");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    if (timer < 1) {
      window.alert("Time's up!");
      router.replace("/complete");
    }
  }, [timer]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if(username.length == 0 || password.length == 0){
      toast.error("Please Enter the Credentials.");
      return;
    }

    const { data, error } = await supabasePublicClient
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password);

    if (data.length > 0) {
    } else {
      toast.error("Incorrect Credentials !");
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
              label="Username"
              value={username}
              setInput={(e) => setUsername(e.target.value)}
            />
            <CustomForm
              id="password"
              type="password"
              label="Password"
              value={password}
              setInput={(e) => setPassword(e.target.value)}
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

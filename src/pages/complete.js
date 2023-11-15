import { useState, useEffect } from "react";
import { Box, Heading, Text, Button, Flex, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "@/Components/Navbar";
import { useTimer } from "@/contexts/Timer";
import axios from "axios";
import Footer from "@/Components/Footer";
import { PulseLoader } from "react-spinners";

function Complete() {
  const router = useRouter();
  const { setSeconds } = useTimer();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const fetchDetails = async () => {
    const userId = window.localStorage.getItem("TheGameUserId");

    const res = await axios.get(`/api/complete/${userId}`);

    setLoading(false);

    if (res) {
      setName(res.data[0].name);
      setScore(res.data[0].score);
      setTime(res.data[0].time_taken);
      setEmail(res.data[0].email);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
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
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <Heading as="h1" size="xl" mb={4} color="black">
            Thank You for Playing!
          </Heading>
          <Text fontSize="lg" mb={6} color="black">
            We appreciate your participation in our game.
          </Text>
          {loading ? (
            <PulseLoader
              color={"#094074"}
              size={15}
              style={{
                marginBottom: "2rem",
              }}
            />
          ) : (
            <>
              <Text fontSize="xl" size="md" mb={4} color="black">
                Name : <b>{name}</b>
              </Text>
              <Text fontSize="xl" size="md" mb={4} color="black">
                Score : <b>{score}</b>
              </Text>
            </>
          )}

          <Button
            backgroundColor="#094074"
            sx={{
              "&:hover": {
                backgroundColor: "#094074",
              },
            }}
            color="white"
            onClick={async () => {
              // axios.post("/api/sendEmail", {
              //   toEmail: email,
              //   secret: Buffer.from(
              //     process.env.NEXT_PUBLIC_MAIL_SECRET
              //   ).toString("base64"),
              // });
              window.localStorage.removeItem("token");
              window.localStorage.removeItem("TheGameUserId");
              window.localStorage.setItem("progressing", false);
              window.localStorage.setItem("timer", 300);
              window.localStorage.removeItem("data");
              setSeconds(300);
              router.replace("/level2");
            }}
          >
            Try Level 2
          </Button>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Complete;

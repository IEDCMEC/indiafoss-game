import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import generateUniqueFlag from "@/utils/UniqueFlag";
import { supabaseClient } from "@/utils/supabase";

import { useTimer } from "@/contexts/Timer";

const game3FlagStaticPart = "flag{dfsafewcvascd";
const gameScore = 3;
const game4URL = "/game-4";

export default function Game3() {
  const router = useRouter();
  const {timer} = useTimer();

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const fetchUniqueFlag = () => {
    const userId = document.cookie["TheGameUserID"];
    const newFlag = generateUniqueFlag(userId);
    setFlag(`${game3FlagStaticPart}${newFlag}}`);
  };

  const handleFlagSubmit = async () => {
    if (submission === flag) {
      window.alert("Correct!");
      const userId = document.cookie["TheGameUserID"];
      const { data, error } = await supabaseClient
        .from("players")
        .update({ score: gameScore, time_taken: 600 - timer })
        .eq("id", userId);

      router.push(game4URL);
    } else {
      window.alert("Incorrect!");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.push("/");
    }
    document.cookie = `flag=${flag};path=/game-3`;
  }, [flag]);

  useEffect(() => {
    const userId = document.cookie["TheGameUserID"];

    if (!userId || userId === "" || userId === "undefined") {
      // router.push("/");
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
          <Heading as="h2" size="xl">
            Cookie check
          </Heading>
          <p>Time Left: {timer}</p>
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
            onChange={(e) => {
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

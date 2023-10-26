import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import generateUniqueFlag from "@/utils/UniqueFlag";
import { supabaseClient } from "@/utils/supabase";
import { Box } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useTimer } from "@/contexts/Timer";

const gameScore = 7;
const game8URL = "/";

export default function Game7() {
  const router = useRouter();
  const {timer} = useTimer();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const handleFlagSubmit = async () => {
    const { data, error } = await supabaseClient.from("flags").select("*");
    const flag = data[0].flag;

    if (submission === flag) {
      window.alert("Correct!");
      const userId = window.localStorage.getItem("TheGameUserID")
      const { data, error } = await supabaseClient
        .from("players")
        .update({ score: gameScore, time_taken: 600 - timer })
        .eq("id", userId);

      router.replace(game8URL);
    } else {
      window.alert("Incorrect!");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabaseClient
      .from("players")
      .select("*")
      .eq("username", username)
      .eq("password", password);

    if (data?.length > 0) {
      window.alert("User exists");
    } else {
      window.alert("User does not exist");
    }
  };

  return (
    // <div>
    //   <div>
    //     <h1>Sup</h1>
    //     {timer}
    //   </div>
    //   <form>
    //     <label htmlFor="username">Username</label>
    //     <input
    //       id="username"
    //       type="text"
    //       name="username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <label htmlFor="password">Password</label>
    //     <input
    //       id="password"
    //       type="password"
    //       name="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <input type="submit" value="Submit" onClick={handleFormSubmit} />
    //   </form>
    //   <div>
    //     <label htmlFor="submission">Flag</label>
    //     <input
    //       id="submission"
    //       type="text"
    //       value={submission}
    //       onChange={(e) => {
    //         setSubmission(e.target.value);
    //       }}
    //     />
    //     <button onClick={handleFlagSubmit}>Submit</button>
    //   </div>
    // </div>
    <Box
      backgroundColor="#AEDEFC"
      height="100vh"
      width="100vw"
      flexDirection={{ base: "column", md: "row" }}
      display="flex"
      alignItems="center"
      justifyContent="space-around"
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
            Sup
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
      <form onSubmit={handleFormSubmit}>
        <Box
          flexDirection={"column"}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={{ base: "95vw", sm: "400px" }}
          border="2px solid #190482"
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
              type="text"
              label="Password"
              value={password}
              setInput={(e) => setPassword(e.target.value)}
            />
            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

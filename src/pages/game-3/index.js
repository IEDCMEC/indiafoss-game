import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import generateUniqueFlag from "@/utils/UniqueFlag";
import { supabaseClient } from "@/utils/supabase";

import { useTimer } from "@/contexts/Timer";

const game3FlagStaticPart = "flag{dfsafewcvascd";
const gameScore = 3;
const game4URL = "/game-4";

export default function Game3() {
  const router = useRouter();
  const timer = useTimer();

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

      if (error) {
        console.log(error);
      }
      router.push(game4URL);
    } else {
      window.alert("Incorrect!");
    }
  };

  useEffect(() => {
    if(window.localStorage.getItem("token") === null){
      router.push("/")
    }
    document.cookie = `flag=${flag};path=/game-3`;
  }, [flag]);

  useEffect(() => {
    const userId = document.cookie["TheGameUserID"];
    console.log({ userId });
    if (!userId || userId === "" || userId === "undefined") {
      // router.push("/");
    }
    fetchUniqueFlag();
  }, []);

  return (
    <div>
      <div>
        <h1>Cookie check</h1>
        {timer}
      </div>
      <div>
        <label htmlFor="submission">Flag</label>
        <input
          id="submission"
          type="text"
          value={submission}
          onChange={(e) => {
            setSubmission(e.target.value);
          }}
        />
        <button onClick={handleFlagSubmit}>Submit</button>
      </div>
    </div>
  );
}

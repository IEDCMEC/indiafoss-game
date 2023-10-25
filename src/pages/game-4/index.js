import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { supabaseClient } from "@/utils/supabase";

import { useTimer } from "@/contexts/Timer";

const gameAPI = "/api/game-4";
const gameScore = 4;
const game5URL = "/game-5";

export default function Game4() {

  const router = useRouter();
  const timer = useTimer();

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const fetchUniqueFlag = async () => {
    const data = await fetch(gameAPI).then((res) => res.json());
    const { flag } = data;
    console.log({ flag });
    setFlag(flag);
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
      router.push(game5URL);
    } else {
      window.alert("Incorrect!");
    }
  };

  useEffect(() => {
      if(window.localStorage.getItem("token") === null){
        router.push("/")
      }
    fetchUniqueFlag();
  }, []);

  return (
    <div>
      <div>
        <h1>API check</h1>
        {timer}
      </div>
      <div>
        <p>API: /api/game-4</p>
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

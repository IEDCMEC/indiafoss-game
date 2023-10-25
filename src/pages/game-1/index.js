import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import generateUniqueFlag from "@/utils/UniqueFlag";
import { supabaseClient } from "@/utils/supabase";

import { useTimer } from "@/contexts/Timer";

const game1FlagStaticPart = "flag{dskajfhsdhk";
const gameScore = 1;
const game2URL = "/game-3";

export default function Game1() {
  const router = useRouter();
  const timer = useTimer();

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const fetchUniqueFlag = () => {
    const userId = document.cookie["TheGameUserID"];
    const newFlag = generateUniqueFlag(userId);
    setFlag(`${game1FlagStaticPart}${newFlag}}`);
  };

  const handleFlagSubmit = async () => {
    if (submission === flag) {
      window.alert("Correct!");
      const userId = document.cookie["TheGameUserID"];
      const { data, error } = await supabaseClient
        .from("players")
        .update({ score: gameScore })
        .eq("id", userId);

      if (error) {
        console.log(error);
      }
      router.push(game2URL);
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
        <h1>HTML Inspect</h1>
        {timer}
      </div>
      <div>
        <p style={{ display: "none" }}>{flag}</p>
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

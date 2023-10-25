import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import generateUniqueFlag from "@/utils/UniqueFlag";
import { supabaseClient } from "@/utils/supabase";

import { useTimer } from "@/contexts/Timer";

const gameScore = 7;
const game8URL = "/";

export default function Game7() {
  const router = useRouter();
  const timer = useTimer();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const handleFlagSubmit = async () => {
    const { data, error } = await supabaseClient.from("flags").select("*");
    const flag = data[0].flag;

    if (submission === flag) {
      window.alert("Correct!");
      const userId = document.cookie["TheGameUserID"];
      const { data, error } = await supabaseClient
        .from("players")
        .update({ score: gameScore, time_taken: 600 - timer })
        .eq("id", 20);

      if (error) {
        console.log(error);
      }
      router.push(game8URL);
    } else {
      window.alert("Incorrect!");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.push("/");
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, password });
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
    <div>
      <div>
        <h1>Sup</h1>
        {timer}
      </div>
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit" onClick={handleFormSubmit} />
      </form>
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

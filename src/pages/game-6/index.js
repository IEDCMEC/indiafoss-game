import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import generateUniqueFlag from "@/utils/UniqueFlag";
import { supabaseClient } from "@/utils/supabase";

const game6FlagStaticPart = "flag{dskajfhsdhk";
const gameScore = 6;
const game7URL = "/";

export default function Game6() {
  const router = useRouter();

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const fetchUniqueFlag = () => {
    const userId = document.cookie["TheGameUserID"];
    const newFlag = generateUniqueFlag(userId);
    setFlag(`${game6FlagStaticPart}${newFlag}}`);
  };

  const handleFlagSubmit = async () => {
    if (submission === flag) {
      window.alert("Correct!");
      const userId = document.cookie["TheGameUserID"];
      const { data, error } = await supabaseClient
        .from("players")
        .update({ score: gameScore })
        .eq("id", 20);

      if (error) {
        console.log(error);
      }
      router.push(game7URL);
    } else {
      window.alert("Incorrect!");
    }
  };

  useEffect(() => {
    const userId = document.cookie["TheGameUserID"];
    console.log({ userId });
    if (!userId || userId === "" || userId === "undefined") {
      // router.push("/");
    }
    fetchUniqueFlag();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/next-page/id={${flag}}`);
    window.alert("Invalid credentials");
  };

  return (
    <div>
      <div>
        <h1>Check network tab</h1>
      </div>
      <form>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" />
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

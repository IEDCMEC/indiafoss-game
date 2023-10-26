import axios from "axios";
import { useState, useEffect } from "react";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderBoard = async () => {
    const res = await axios.get("/api/leaderboard");

    if (res.status === 200) setLeaderboard(res.data);
    else console.log(res.data);
  };

  useEffect(() => {
    fetchLeaderBoard();
  }, []);

  return (
    <>
      <p>{JSON.stringify(leaderboard)}</p>
    </>
  );
}

export default Leaderboard;

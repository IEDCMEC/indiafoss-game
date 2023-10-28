import { useEffect, useState } from "react";
import bg from "../assets/bg.png";
import Image from "next/image";

export default function Show() {

  const [isLeaderBoard, setIsLeaderBoard] = useState(false);
  let baseUrl = "https://game.iedcmec.in";

  async function changer() {
    console.log("called");  
    setIsLeaderBoard((prev) => !prev);
  }

  useEffect(() => {
    setInterval(changer, 5000);
  }, []);

  if (isLeaderBoard) {
    return (
      <iframe
        src={`${baseUrl}/leaderboard`}
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
      ></iframe>
    );
  } else {
    return (
      <Image
        src={bg}
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
      />
    );
  }
}

import { useEffect, useState } from "react";
import generateUniqueFlag from "@/utils/UniqueFlag";

const game3FlagStaticPart = "flag{dfsafewcvascd";

export default function Game3() {
  const [flag, setFlag] = useState("");

  const fetchUniqueFlag = () => {
    const newFlag = generateUniqueFlag();
    setFlag(`${game3FlagStaticPart}${newFlag}}`);
  };

  useEffect(() => {
    if(window.localStorage.getItem("token") === null){
      router.push("/")
    }
    document.cookie = `flag=${flag};path=/game-3`;
  }, [flag]);

  useEffect(() => {
    fetchUniqueFlag();
  }, []);

  return (
    <div>
      <div>
        <h1>Cookie check</h1>
      </div>
    </div>
  );
}

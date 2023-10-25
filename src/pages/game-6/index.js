import { useEffect, useState } from "react";

import generateUniqueFlag from "@/utils/UniqueFlag";

const game1FlagStaticPart = "flag{dskajfhsdhk";

export default function Game6() {
  const [flag, setFlag] = useState("");

  const fetchUniqueFlag = () => {
    const newFlag = generateUniqueFlag();
    setFlag(`${game1FlagStaticPart}${newFlag}}`);
  };

  useEffect(() => {
      if(window.localStorage.getItem("token") === null){
        router.push("/")
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
        <input type="submit" value="Submit" onClick={handleFormSubmit}/>
      </form>
    </div>
  );
}

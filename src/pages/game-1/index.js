import React, { useState, useEffect } from "react";

import generateUniqueFlag from "@/utils/UniqueFlag";

const game1FlagStaticPart = "flag{dskajfhsdhk";

export default function Game1() {
  const [flag, setFlag] = useState("");

  const fetchUniqueFlag = () => {
    const newFlag = generateUniqueFlag();
    setFlag(`${game1FlagStaticPart}${newFlag}}`);
  };

  useEffect(() => {
    fetchUniqueFlag();
  }, []);

  return (
    <div>
      <div>
        <h1>HTML Inspect</h1>
      </div>
      <div>
        <p style={{ display: "none" }}>{flag}</p>
      </div>
    </div>
  );
}

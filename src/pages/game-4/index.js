import { useEffect, useState } from "react";
import generateUniqueFlag from "@/utils/UniqueFlag";


export default function Game4() {
  useEffect(() => {
    if(window.localStorage.getItem("token") === null){
      router.push("/")
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Cookie check</h1>
      </div>
      <div>
        <p>API: /api/game-4</p>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import generateUniqueFlag from "@/utils/UniqueFlag";


export default function Game5() {
  useEffect(() => {
    if(window.localStorage.getItem("token") === null){
      router.push("/")
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Head api</h1>
      </div>
      <div>
        <p>API: /api/game-5</p>
      </div>
    </div>
  );
}

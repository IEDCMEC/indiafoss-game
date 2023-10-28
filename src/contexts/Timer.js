import { useRouter } from "next/router";
import React, { createContext, useContext, useState, useEffect } from "react";

export const TimerContext = createContext();

export const useTimer = () => {
  return useContext(TimerContext);
};

export const TimerProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(300);
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("progressing") === "true") {
      const timerFromLocalStorage = window.localStorage.getItem("timer");
      if (timerFromLocalStorage) {
        setSeconds(parseInt(timerFromLocalStorage));
      }
    }

    const timer = setInterval(() => {
      if (window.localStorage.getItem("progressing") === "true") {
        setSeconds((prevSeconds) => {
          const updatedSeconds = prevSeconds - 1;
          window.localStorage.setItem("timer", updatedSeconds);
          return updatedSeconds;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (seconds < 1) {
      window.alert("Time's up!");
      setSeconds(300);
      window.localStorage.setItem("progressing", "false");
      router.replace("/complete");
    }
  }, [seconds]);

  return (
    <TimerContext.Provider
      value={{
        timer: seconds,
        setSeconds: setSeconds,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

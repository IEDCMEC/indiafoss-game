import React, { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export const useTimer = () => {
  return useContext(TimerContext);
};
export const TimerProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    // If there is a timer in localStorage, use that value
    const timerFromLocalStorage = window.localStorage.getItem("timer");
    if (timerFromLocalStorage) {
      setSeconds(parseInt(timerFromLocalStorage));
    }

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        const updatedSeconds = prevSeconds - 1;
        window.localStorage.setItem("timer", updatedSeconds);
        return updatedSeconds;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <TimerContext.Provider value={seconds}>{children}</TimerContext.Provider>
  );
};
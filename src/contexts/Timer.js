import React, { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export const useTimer = () => {
  return useContext(TimerContext);
};

export const TimerProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <TimerContext.Provider value={seconds}>{children}</TimerContext.Provider>
  );
};

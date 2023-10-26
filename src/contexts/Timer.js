import React, { createContext, useContext, useState, useEffect } from "react";

export const TimerContext = createContext();

export const useTimer = () => {
  return useContext(TimerContext);
};

export const TimerProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    // If there is a timer in localStorage, use that value
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

  return (
    <TimerContext.Provider value={{
      timer: seconds,
      setSeconds: setSeconds,
    }} >
      {children}
    </TimerContext.Provider>
  );
};

import React from "react";
import { createContext } from "react";
import { useState } from "react";

const ContextProvider = createContext();

const ApiContext = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    flag: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    flag: "",
  });

  return (
    <ContextProvider.Provider
      value={{ formData, setFormData, validationErrors, setValidationErrors }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default ApiContext;
export { ContextProvider };

import React, { createContext, useState, useEffect } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) setToken(savedToken);
    setLoading(false);
  }, []);

  return (
    <userContext.Provider value={{ token, setToken, loading }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;

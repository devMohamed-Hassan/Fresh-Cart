import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = () => {
      const savedToken = localStorage.getItem("userToken");
      if (savedToken) setToken(savedToken);
      setLoading(false);
    };
    fetchToken();
  }, []);

  return (
    <UserContext.Provider value={{ token, setToken, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUser = () => useContext(UserContext);

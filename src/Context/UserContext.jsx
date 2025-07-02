import React, { createContext, useState, useEffect } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
     const [token, setToken] = useState("");

     useEffect(() => {
          const savedToken = localStorage.getItem("userToken");
          if (savedToken) {
               setToken(savedToken);
          }
     }, []);

     return (
          <userContext.Provider value={{ token, setToken }}>
               {children}
          </userContext.Provider>
     );
};

export default UserContextProvider;

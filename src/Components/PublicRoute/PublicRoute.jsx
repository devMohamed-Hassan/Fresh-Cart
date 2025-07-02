import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

function PublicRoute({ children }) {
  const { token } = useContext(userContext);

  if (token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default PublicRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

function PublicRoute({ children }) {
  const { token } = useUser();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;

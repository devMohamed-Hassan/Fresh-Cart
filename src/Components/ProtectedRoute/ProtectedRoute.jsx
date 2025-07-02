import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

const ProtectedRoute = ({ children }) => {
     const { token } = useContext(userContext);
     if (!token) {
          return <Navigate to="/login" replace />;
     }
     return children;
};

export default ProtectedRoute;

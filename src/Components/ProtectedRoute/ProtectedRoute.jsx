import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(userContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

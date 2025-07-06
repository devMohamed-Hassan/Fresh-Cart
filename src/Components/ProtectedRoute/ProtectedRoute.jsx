import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useUser();

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

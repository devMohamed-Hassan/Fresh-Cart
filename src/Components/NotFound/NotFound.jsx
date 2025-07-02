import React from "react";
import notfound from "../../assets/images/error.svg";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <img
        src={notfound}
        alt="Page Not Found"
        className="max-w-xs md:max-w-md lg:max-w-lg"
      />
      <h1 className="text-2xl font-bold mt-6">Oops! Page Not Found</h1>
      <p className="text-gray-500 mt-2">
        The page you’re looking for doesn’t exist.
      </p>
    </div>
  );
}

export default NotFound;

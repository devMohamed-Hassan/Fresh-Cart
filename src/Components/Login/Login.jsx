import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

function Login() {
  const { setToken } = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      if (data.message === "success") {

        setSuccessMessage("Login successful! Redirecting...");
        setErrorMessage("");
        resetForm();

        setTimeout(() => {
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userName", data.user.name);
          setToken(data.token);
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage("Invalid response. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
      setSuccessMessage("");
    }
    finally {
      setLoading(flase);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const renderValidationIcon = (field) => {
    if (!formik.touched[field]) return null;
    const isValid = !formik.errors[field];
    return (
      <FontAwesomeIcon
        icon={isValid ? faCheckCircle : faTimesCircle}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl ${isValid ? "text-green-500" : "text-red-500"}`}
      />
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        className="w-full sm:max-w-md bg-white shadow-lg rounded-2xl px-6 py-8 space-y-6"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

        {errorMessage && (
          <div className="p-3 rounded-md bg-red-100 text-red-700 border border-red-300 text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-md bg-green-100 text-green-700 border border-green-300 text-sm">
            {successMessage}
          </div>
        )}


        <div className="relative">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition
          ${formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : formik.touched.email
                    ? "border-green-500 focus:ring-green-300"
                    : "border-gray-300 focus:ring-blue-300"
                } bg-gray-50`}
            />
            {renderValidationIcon("email")}
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition
          ${formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : formik.touched.password
                    ? "border-green-500 focus:ring-green-300"
                    : "border-gray-300 focus:ring-blue-300"
                } bg-gray-50`}
            />
            {renderValidationIcon("password")}
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <div className="text-right">
          <Link to="/reset" className="text-sm text-green-600 hover:underline">
            Forgot Password?
          </Link>
        </div>


        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold shadow transition duration-150
    flex justify-center items-center gap-2
    ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
        >
          {loading ? (
            <>
              <span className="text-white">Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </button>


        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>

  );
}

export default Login;

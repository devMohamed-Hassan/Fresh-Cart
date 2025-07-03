import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

function Register() {
  const { setToken } = useContext(userContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {

        setSuccessMessage("Registration successful! Welcome aboard.");
        setErrorMessage("");
        resetForm();
        setTimeout(() => {
          setToken(data.token);
          localStorage.setItem("userToken", data.token);
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage("Unexpected response. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      setSuccessMessage("");
    }
  };



  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be 15 characters or less")
      .required("Name is required"),
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, number and special character"
      )
      .matches(/^\S*$/, "Password cannot contain spaces")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    phone: Yup.string()
      .trim()
      .matches(
        /^(01[0125])[0-9]{8}$/,
        "Phone must start with 010, 011, 012, or 015 and be 11 digits"
      )
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const renderValidationIcon = (field) => {
    if (!formik.touched[field]) return null;
    if (formik.errors[field]) {
      return (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-500 text-xl"
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-500 text-xl"
      />
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <form
        className="w-full sm:max-w-md bg-white shadow-lg rounded-2xl px-6 py-8 space-y-6"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Register Now
        </h2>

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
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your full name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition
          ${formik.touched.name && formik.errors.name
                ? "border-red-500 focus:ring-red-300"
                : formik.touched.name
                  ? "border-green-500 focus:ring-green-300"
                  : "border-gray-300 focus:ring-blue-300"
              } bg-gray-50`}
          />
          {renderValidationIcon("name")}
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>


        <div className="relative">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
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
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
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
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="rePassword" className="block mb-1 text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            placeholder="••••••••"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition
          ${formik.touched.rePassword && formik.errors.rePassword
                ? "border-red-500 focus:ring-red-300"
                : formik.touched.rePassword
                  ? "border-green-500 focus:ring-green-300"
                  : "border-gray-300 focus:ring-blue-300"
              } bg-gray-50`}
          />
          {renderValidationIcon("rePassword")}
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.rePassword}</p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="01xxxxxxxxx"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition
          ${formik.touched.phone && formik.errors.phone
                ? "border-red-500 focus:ring-red-300"
                : formik.touched.phone
                  ? "border-green-500 focus:ring-green-300"
                  : "border-gray-300 focus:ring-blue-300"
              } bg-gray-50`}
          />
          {renderValidationIcon("phone")}
          {formik.touched.phone && formik.errors.phone && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold shadow transition duration-150"
        >
          Register
        </button>
      </form>
    </div>

  );
}

export default Register;

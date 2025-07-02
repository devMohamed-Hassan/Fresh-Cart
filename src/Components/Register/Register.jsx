import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
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
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gray-50">
      <h2 className="self-start mb-6 text-2xl font-bold text-gray-800">
        Register Now:
      </h2>

      {errorMessage && (
        <div className="w-full max-w-6xl mx-auto mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-lg">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="w-full max-w-6xl mx-auto mb-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded-lg">
          {successMessage}
        </div>
      )}

      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-6xl mx-auto"
        onSubmit={formik.handleSubmit}
      >

        <div className="mb-5 relative">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`bg-gray-50 border ${formik.touched.name && formik.errors.name
              ? "border-red-500"
              : formik.touched.name && !formik.errors.name
                ? "border-green-500"
                : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Your full name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderValidationIcon("name")}
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div className="mb-5 relative">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`bg-gray-50 border ${formik.touched.email && formik.errors.email
              ? "border-red-500"
              : formik.touched.email && !formik.errors.email
                ? "border-green-500"
                : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="example@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderValidationIcon("email")}
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`bg-gray-50 border ${formik.touched.password && formik.errors.password
              ? "border-red-500"
              : formik.touched.password && !formik.errors.password
                ? "border-green-500"
                : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderValidationIcon("password")}
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="mb-5 relative">
          <label
            htmlFor="repassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Re-Password:
          </label>
          <input
            type="password"
            id="repassword"
            name="rePassword"
            className={`bg-gray-50 border ${formik.touched.rePassword && formik.errors.rePassword
              ? "border-red-500"
              : formik.touched.rePassword && !formik.errors.rePassword
                ? "border-green-500"
                : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Re-enter your password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderValidationIcon("rePassword")}
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.rePassword}
            </p>
          )}
        </div>

        <div className="mb-5 relative">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`bg-gray-50 border ${formik.touched.phone && formik.errors.phone
              ? "border-red-500"
              : formik.touched.phone && !formik.errors.phone
                ? "border-green-500"
                : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="01xxxxxxxxx"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderValidationIcon("phone")}
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-[var(--main-color)] hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

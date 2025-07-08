import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Utility/logoutUser";
import { toast } from "react-toastify";


function MyProfile() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName")
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(15, "Name must be 15 characters or less")
        .required("Name is required"),
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .trim()
        .matches(
          /^(01[0125])[0-9]{8}$/,
          "Phone must start with 010, 011, 012, or 015 and be 11 digits"
        )
        .required("Phone is required"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      const token = localStorage.getItem("userToken");

      try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/users/updateMe/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        setLoading(false);

        if (!response.ok) {
          if (data.message?.toLowerCase().includes("invalid token")) {
            return logoutUser(navigate, "Session expired. Please login again.");
          }

          return toast.error(data.message || "Failed to update profile.");
        }

        toast.success("Profile updated successfully!");
        setTimeout(() => {
          logoutUser(navigate);
        }, 1500);
      } catch (error) {
        setLoading(false);
        console.error("Network error:", error);
        toast.error("Something went wrong. Please try again later.");
      }
    }

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

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      logoutUser(navigate, "You must login first.");
    }
  }, [navigate]);


  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6 space-y-6"
    >

      <div className="text-center">
        <img
          src={`https://ui-avatars.com/api/?name=${userName}&background=00C950&color=fff&size=128`}
          alt={userName}
          className="mx-auto w-24 h-24 rounded-full shadow"
        />
        <h2 className="mt-3 text-xl font-bold text-gray-800">
          {userName}
        </h2>
      </div>

      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 text-left">
          Name
        </label>
        <div className="relative">
          <input
            id="name"
            name="name"
            type="text"
            placeholder={userName}
            className={`w-full px-4 py-2 rounded-md border text-sm bg-gray-50 focus:outline-none focus:ring-2 transition ${formik.touched.name && formik.errors.name
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
              }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {renderValidationIcon("name")}
        </div>

        {formik.touched.name && formik.errors.name && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 text-left">
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={`w-full px-4 py-2 rounded-md border text-sm bg-gray-50 focus:outline-none focus:ring-2 transition ${formik.touched.email && formik.errors.email
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
              }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {renderValidationIcon("email")}
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700 text-left">
          Phone
        </label>
        <div className="relative">
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="01xxxxxxxxx"
            className={`w-full px-4 py-2 rounded-md border text-sm bg-gray-50 focus:outline-none focus:ring-2 transition ${formik.touched.phone && formik.errors.phone
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
              }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {renderValidationIcon("phone")}
        </div>

        {formik.touched.phone && formik.errors.phone && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.phone}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium shadow-sm transition duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Updating...
          </>
        ) : (
          <>
            Update
          </>
        )}
      </button>

    </form>


  );
}

export default MyProfile;

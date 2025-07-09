import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { logoutUser } from "../../Utility/logoutUser";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your new password"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const token = localStorage.getItem("userToken");

      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              token,
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();
        setLoading(false);

        if (!response.ok) {
          if (data.message?.toLowerCase().includes("invalid token")) {
            return logoutUser(navigate, "Session expired. Please login again.");
          }
          return toast.error(data.message || "Failed to change password.");
        }

        toast.success("Password changed successfully!");
        setTimeout(() => logoutUser(navigate), 1500);
      } catch (error) {
        setLoading(false);
        console.error("Network error:", error);
        toast.error("Something went wrong. Please try again later.");
      }
    },
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
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6 space-y-6"
    >
      <h3 className="text-lg font-semibold text-center text-gray-800">Change Password</h3>

      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="w-full px-4 py-2 rounded-md border bg-gray-50 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPassword}
          />
          {renderValidationIcon("currentPassword")}
        </div>

        {formik.touched.currentPassword && formik.errors.currentPassword && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.currentPassword}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 rounded-md border bg-gray-50 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {renderValidationIcon("password")}
        </div>

        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            className="w-full px-4 py-2 rounded-md border bg-gray-50 text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
          {renderValidationIcon("rePassword")}
        </div>

        {formik.touched.rePassword && formik.errors.rePassword && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.rePassword}</p>
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
            Changing Password...
          </>
        ) : (
          "Change Password"
        )}
      </button>
    </form>
  );
}

export default ChangePassword;

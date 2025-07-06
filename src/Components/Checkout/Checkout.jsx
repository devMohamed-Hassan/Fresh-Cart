import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const EGYPT_CITIES = [
  "Cairo", "Giza", "Alexandria", "Tanta", "Mansoura", "Assiut", "Aswan", "Suez",
  "Zagazig", "Fayoum", "Ismailia", "Port Said", "Luxor", "Qena", "Beni Suef",
  "Minya", "Sohag", "Damanhur", "Hurghada", "Sharm El Sheikh", "Kafr El Sheikh",
  "Damietta", "Banha", "Mahalla", "Qalyub", "Shibin El Kom", "Mit Ghamr", "Arish",
  "6th of October City", "Obour", "New Cairo", "New Administrative Capital",
  "El Mahalla El Kubra", "Helwan", "Sadat City", "10th of Ramadan City",
  "Borg El Arab", "Rafah", "Rashid", "El Tur", "Marsa Matruh", "Marsa Alam", "El Alamein"
];

function Checkout() {
  const { id: cartId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  useEffect(() => {
    if (!cartId) {
      setErrorMessage("Invalid cart ID. Please try again.");
    }
  }, [cartId]);

  const handleCheckout = async (values) => {
    try {
      setPaying(true);
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-three-lyart.vercel.app`,
        {
          shippingAddress: {
            details: values.address,
            phone: values.phone,
            city: values.city,
          },
        },
        {
          headers: {
            token,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.status === "success") {
        setSuccessMessage("Redirecting to payment...");
        setTimeout(() => {
          window.location.href = data.session.url;
        }, 2000);
      }

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Could not initiate payment. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .trim()
      .matches(/^01[0125]\d{8}$/, "Invalid Egyptian phone number")
      .required("Phone number is required"),
    city: Yup.string().trim().required("City is required"),
    address: Yup.string().trim().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      address: "",
    },
    validationSchema,
    onSubmit: handleCheckout,
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Checkout</h2>

        {errorMessage && (
          <div className="text-red-500 text-sm flex justify-between items-center">
            <span>{errorMessage}</span>
            <button
              type="button"
              className="text-xs text-blue-600 underline ml-2"
              onClick={() => formik.handleSubmit()}
            >
              Try Again
            </button>
          </div>
        )}

        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder="01XXXXXXXXX"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md px-3 py-2 mt-1 pr-10 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            {renderValidationIcon("phone")}
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <div className="relative">
            <select
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!formik.values.phone || formik.errors.phone}
              title={!formik.values.phone || formik.errors.phone ? "Enter a valid phone number first" : ""}
              className={`w-full border rounded-md px-3 py-2 mt-1 pr-10 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 ${!formik.values.phone || formik.errors.phone ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                }`}
            >
              <option value="">Select City</option>
              {EGYPT_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {renderValidationIcon("city")}
          </div>
          {formik.touched.city && formik.errors.city && (
            <p className="text-sm text-red-500">{formik.errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <div className="relative">
            <input
              type="text"
              name="address"
              placeholder="Street name, building, apartment..."
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!formik.values.city}
              title={!formik.values.city ? "Select a city first" : ""}
              className={`w-full border rounded-md px-3 py-2 mt-1 pr-10 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 ${!formik.values.city ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                }`}
            />
            {renderValidationIcon("address")}
          </div>
          {formik.touched.address && formik.errors.address && (
            <p className="text-sm text-red-500">{formik.errors.address}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={paying}
          className={`w-full flex justify-center items-center gap-2 py-2 font-semibold rounded-md shadow ${paying ? "bg-gray-400 cursor-not-allowed text-white" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
          {paying ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Processing...
            </>
          ) : (
            <>
              <i className="fas fa-credit-card"></i> Pay Now
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default Checkout;

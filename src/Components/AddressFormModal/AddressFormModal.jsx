import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function AddressFormModal({ showForm, setShowForm, setAddresses }) {
  const token = localStorage.getItem("userToken");

  const formik = useFormik({
    initialValues: {
      name: "",
      details: "",
      city: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      details: Yup.string().required("Address details are required"),
      city: Yup.string().required("City is required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
        .required("Phone is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to add address");
          return;
        }

        toast.success("Address added successfully!");
        setAddresses((prev) => [...prev, data.data]);
        resetForm();
        setShowForm(false);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    },
  });

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4 text-center">Add New Address</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 border rounded-md text-sm"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}

          <input
            type="text"
            name="details"
            placeholder="Address details"
            className="w-full px-3 py-2 border rounded-md text-sm"
            {...formik.getFieldProps("details")}
          />
          {formik.touched.details && formik.errors.details && (
            <p className="text-red-500 text-sm">{formik.errors.details}</p>
          )}

          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full px-3 py-2 border rounded-md text-sm"
            {...formik.getFieldProps("city")}
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-500 text-sm">{formik.errors.city}</p>
          )}

          <input
            type="text"
            name="phone"
            placeholder="01xxxxxxxxx"
            className="w-full px-3 py-2 border rounded-md text-sm"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
            >
              {formik.isSubmitting ? (
                <svg
                  className="animate-spin h-4 w-4 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressFormModal;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaCity, FaPhone, FaTrash, FaPlus } from "react-icons/fa";
import { BarLoader } from "react-spinners";
import AddressFormModal from "../AddressFormModal/AddressFormModal";

function UserAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("userToken");
      try {
        setLoading(true);
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
          headers: {
            token: token,
          },
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
          return toast.error(data.message || "Failed to load addresses");
        }

        setAddresses(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching addresses:", error);
        toast.error("Something went wrong. Please try again later.");
      }
    };

    fetchAddresses();
  }, []);

  const handleDeleteAddress = async (id) => {
    const token = localStorage.getItem("userToken");
    try {
      setDeletingId(id);
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        method: "DELETE",
        headers: { token },
      });

      const data = await res.json();
      setDeletingId(null);

      if (!res.ok) return toast.error(data.message || "Failed to delete address");

      toast.success("Address deleted");
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="py-2">
        <BarLoader color="#0aad0a" height={4} width="100%" />
      </div>
    );
  }

  if (addresses.length === 0) {

    <div
      onClick={() => setShowForm(true)}
      className="flex items-center justify-center p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-200 transition"
    >
      <div className="flex flex-col items-center text-gray-600">
        <FaPlus className="text-xl mb-1" />
        <span className="text-sm font-medium">Add New Address</span>
      </div>
    </div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
      {addresses.map((addr) => (
        <div
          key={addr._id}
          className="relative p-4 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <button
            onClick={() => handleDeleteAddress(addr._id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            title="Delete Address"
          >
            {deletingId === addr._id ? (
              <svg
                className="animate-spin h-4 w-4 text-gray-500"
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
              <FaTrash />
            )}
          </button>

          <div className="flex items-center gap-2 mb-2 text-gray-800">
            <FaMapMarkerAlt className="text-green-500" />
            <p>{addr.details}</p>
          </div>

          <div className="flex items-center gap-2 mb-2 text-gray-800">
            <FaCity className="text-gray-400" />
            <p>{addr.city}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <FaPhone className="text-gray-500" />
            <p>+2{addr.phone}</p>
          </div>
        </div>
      ))}

      <div
        onClick={() => setShowForm(true)}
        className="flex items-center justify-center p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-200 transition"
      >
        <div className="flex flex-col items-center text-gray-600">
          <FaPlus className="text-xl mb-1" />
          <span className="text-sm font-medium">Add New Address</span>
        </div>
      </div>
      <AddressFormModal
        showForm={showForm}
        setShowForm={setShowForm}
        setAddresses={setAddresses}
      />

    </div>
  );
}

export default UserAddresses;

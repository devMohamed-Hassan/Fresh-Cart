import React, { useContext, useState } from "react";
import { useWishlist } from "../../Context/WishlistContext";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useCart } from "../../Context/CartContext";

function Wishlist() {
  const { addToCart } = useCart();
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (productId, type, value) => {
    setLoadingStates((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], [type]: value },
    }));
  };

  const handleRemove = async (productId) => {
    try {
      setLoading(productId, "remove", true);
      await removeFromWishlist(productId);
      toast.info("Removed from wishlist!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong removing item from wishlist.",
        {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        }
      );
    } finally {
      setLoading(productId, "remove", false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      setLoading(product.id, "addToCart", true);
      await addToCart(product.id);
      toast.success("Added to cart successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      await removeFromWishlist(product.id);
    } catch (error) {
      console.error("Error in adding to cart & removing from wishlist:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong!",
        {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        }
      );
    } finally {
      setLoading(product.id, "addToCart", false);
    }
  };

  if (loading) {
    return (
      <div className="py-2">
        <BarLoader color="#0aad0a" height={4} width="100%" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Your Wishlist is Empty
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const isAddToCartLoading = loadingStates[product.id]?.addToCart;
          const isRemoveLoading = loadingStates[product.id]?.remove;

          return (
            <div
              key={product.id}
              className="border border-gray-300 rounded-2xl p-5 flex flex-col bg-white relative"
            >
              <div className="relative mb-4 overflow-hidden rounded-xl aspect-w-1 aspect-h-1">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-full object-contain bg-white"
                />
              </div>
              <h1 className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                {product.category?.name}
              </h1>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-800">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-10 h-10 bg-white hover:bg-green-100 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  disabled={isAddToCartLoading}
                >
                  {isAddToCartLoading ? (
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
                    <i className="fa-solid fa-cart-shopping text-xl text-green-600 leading-none align-middle transition-colors duration-300"></i>
                  )}
                </button>
              </div>
              <p className="text-green-600 font-extrabold text-base mb-2">
                {product.price} EGP
              </p>
              <p className="flex items-center font-semibold mb-4 gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <i
                    key={i}
                    className={`fa-solid fa-star ${i < Math.round(product.ratingsAverage)
                      ? "text-yellow-500"
                      : "text-gray-300"
                      }`}
                  ></i>
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  {product.ratingsAverage.toFixed(1)}
                </span>
              </p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 mt-auto transition duration-300"
                onClick={() => handleRemove(product.id)}
                disabled={isRemoveLoading}
              >
                {isRemoveLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                    Removing...
                  </span>
                ) : (
                  "Remove"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;

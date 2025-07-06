import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { useWishlist } from "../../Context/WishlistContext";

function ProductCard({ product }) {
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { title, price, imageCover, category, ratingsAverage, id } = product;
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const handleWishlist = async () => {
    try {
      setLoadingWishlist(true);
      if (isWishlisted(id)) {
        await removeFromWishlist(id);
        toast.info("Removed from wishlist.", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        await addToWishlist(product);
        toast.success("Added to wishlist!", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update wishlist. Try again!";
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoadingWishlist(false);
    }
  };

  async function handleAddToCart() {
    try {
      setLoadingCart(true);
      await addToCart(id);
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Cart error:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add product to cart.";
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoadingCart(false);
    }
  }

  return (
    <div className="border border-gray-300 rounded-2xl p-5 hover:shadow-xl transition-shadow duration-300 product bg-white flex flex-col relative">
      <div className="relative mb-4 overflow-hidden rounded-xl aspect-w-1 aspect-h-1">
        <img
          src={imageCover}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-xs text-gray-400 uppercase tracking-wide mb-1">
        {category.name}
      </h1>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">
          {title.split(" ").slice(0, 2).join(" ")}
        </h2>
        <button
          className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-colors duration-300 flex items-center justify-center w-7 h-7"
          onClick={handleWishlist}
          disabled={loadingWishlist}
        >
          {loadingWishlist ? (
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
            <i
              className={`fa-heart ${isWishlisted(id)
                ? "fa-solid text-red-500"
                : "fa-regular text-gray-500"
                } text-xl leading-none align-middle transition-colors duration-300`}
            ></i>
          )}
        </button>
      </div>

      <p className="text-green-600 font-extrabold text-base mb-2">
        {price} EGP
      </p>
      <p className="flex items-center font-semibold mb-4 gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <i
            key={i}
            className={`fa-solid fa-star ${i < Math.round(ratingsAverage)
              ? "text-yellow-500"
              : "text-gray-300"
              }`}
          ></i>
        ))}
        <span className="ml-2 text-gray-600 text-sm">
          {ratingsAverage.toFixed(1)}
        </span>
      </p>
      <button
        className={`bg-green-500 btn text-white font-semibold rounded-lg py-2 mt-auto transition duration-300 ${loadingCart
          ? "opacity-70 cursor-not-allowed"
          : "hover:bg-green-600 hover:bg-opacity-90"
          }`}
        onClick={handleAddToCart}
        disabled={loadingCart}
      >
        {loadingCart ? (
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
            Adding...
          </span>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}

export default ProductCard;

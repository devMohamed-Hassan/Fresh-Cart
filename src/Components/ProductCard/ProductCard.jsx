import React, { useContext } from "react";
import styles from "./ProductCard.module.css";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { title, price, imageCover, category, ratingsAverage, id } = product;

  async function handleAddToCart() {
    try {
      const result = await addToCart(id);
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product to cart.",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        }
      );
    }
  }

  return (
    <div className="border rounded-2xl p-5 hover:shadow-xl transition-shadow duration-300 product bg-white flex flex-col">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={imageCover}
          alt={title}
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h1 className="text-xs text-gray-400 uppercase tracking-wide mb-1">
        {category.name}
      </h1>
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        {title.split(" ").slice(0, 2).join(" ")}
      </h2>
      <p className="text-green-600 font-extrabold text-base mb-2">{price} EGP</p>
      <p className="flex items-center font-semibold mb-4 gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <i
            key={i}
            className={`fa-solid fa-star ${i < Math.round(ratingsAverage) ? "text-yellow-500" : "text-gray-300"
              }`}
          ></i>
        ))}
        <span className="ml-2 text-gray-600 text-sm">
          {ratingsAverage.toFixed(1)}
        </span>
      </p>
      <button
        className="bg-[var(--main-color)] btn text-white font-semibold rounded-lg py-2 mt-auto transition-colors duration-300 hover:bg-opacity-90"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { PropagateLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const {
    getCartItems,
    updateCartItemQuantity,
    clearCart,
    removeCartItem
  } = useContext(CartContext);

  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const data = await getCartItems();
        setCartItems(data.data);
        setError(null);
      } catch (err) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [getCartItems]);

  const removeItem = async (productId) => {
    try {
      const response = await removeCartItem(productId);
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      setClearing(true);
      await clearCart();
      setCartItems({ products: [], totalCartPrice: 0 });
    } catch (err) {
      console.error("Failed to clear cart:", err);
    } finally {
      setClearing(false);
    }
  };

  const handleIncrement = async (itemId, currentCount) => {
    try {
      const newQty = currentCount + 1;
      const response = await updateCartItemQuantity(itemId, newQty);
      setCartItems(response.data);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };


  const handleDecrement = async (itemId, currentCount) => {
    try {
      const newQty = Math.max(1, currentCount - 1);
      const response = await updateCartItemQuantity(itemId, newQty);
      setCartItems(response.data);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };


  return (
    <section className="max-w-6xl mx-auto p-4 bg-gray-100 mt-8 rounded-2xl">
      <h1 className="text-2xl font-semibold mb-4 bg-white p-2 rounded border border-gray-300 shadow-md">
        Your Shopping Cart
      </h1>

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <PropagateLoader size={20} color="#0aad0a" />
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (!cartItems || cartItems.products.length === 0) && (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      {!loading && !error && cartItems?.products.length > 0 && (
        <>
          <div className="bg-white p-2 mb-4 border border-gray-300 shadow-md">
            <p className="mb-2 text-gray-700 font-semibold">
              Total items:{" "}
              <span className="font-medium">
                {cartItems.products.reduce((acc, item) => acc + item.count, 0)}
              </span>
            </p>
            <p className="mb-4 text-gray-700 font-semibold">
              Total price:{" "}
              <span className="font-medium text-green-800">
                {cartItems.totalCartPrice.toLocaleString("en-US")}
                <span className="font-semibold text-black"> EGP</span>
              </span>

            </p>
          </div>

          <ul className="space-y-4">
            {cartItems.products.map((item) => (
              <li
                key={item._id}
                className="flex items-start gap-4 bg-white p-5 rounded-lg shadow-md border border-gray-300"
              >
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover aspect-square rounded-md border border-gray-300 shadow-md"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.product.title}</h2>
                  <p className="text-sm text-gray-600">
                    Category: {item.product.category.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: {item.price.toLocaleString("en-US")} EGP
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleDecrement(item.product._id, item.count)}
                    className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-bold flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="px-3 text-gray-800 font-medium">{item.count}</span>
                  <button
                    onClick={() => handleIncrement(item.product._id, item.count)}
                    className="px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white font-bold flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="px-2 py-1 rounded bg-red-700 hover:bg-red-800 text-white font-bold flex items-center justify-center"
                  >
                    <i className="fas fa-trash"></i>
                  </button>

                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={handleClearCart}
            className={`px-4 py-2 rounded shadow flex items-center gap-2 mt-4 text-sm font-semibold 
              ${clearing ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"}`}
            disabled={clearing}
          >
            {clearing ? (<><i className="fas fa-spinner fa-spin"></i>Clearing...</>) : (
              <><i className="fas fa-trash"></i>Clear Cart</>)}
          </button>
        </>
      )}
    </section>
  );
}

export default Cart;

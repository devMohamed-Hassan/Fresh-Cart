import React, { useEffect, useState, useContext } from "react";
import { useCart } from "../../Context/CartContext";
import { BarLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faShoppingCart, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";


function Cart() {
  const {
    getCartItems,
    updateCartItemQuantity,
    clearCart,
    removeCartItem
  } = useCart();


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

  if (loading) {
    return (
      <div className="py-6">
        <BarLoader color="#0aad0a" height={4} width="100%" />
      </div>

    )
  }
  return (
    <section className="w-full mt-8 mb-8 px-4 min-h-[300px]">
      <div className="bg-white  text-[#350C2E] w-full max-w-4xl mx-auto rounded-2xl p-6 shadow-lg max-h-[85vh] flex flex-col">
        {cartItems?.products?.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 font-medium gap-2 p-10">
            <p className="bg-gray-100 p-3 mb-3 rounded-sm">Your cart is empty.</p>
            <NavLink
              to="/products"
              className="text-green-500 hover:text-green-500 underline text-sm transition"
            >
              &lt; Browse Products

            </NavLink>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-gray-500 font-semibold flex items-center gap-2">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-green-400" />
                  <span>Total items:</span>{" "}
                  <span className="font-bold text-sm text-gray-500">
                    {cartItems?.products?.reduce((acc, item) => acc + item.count, 0) ?? 0}
                  </span>
                </p>
                <p className="text-gray-500 font-semibold text-sm flex items-center gap-2">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-500" />
                  <span>
                    Total price:{" "}
                    <span className="text-green-700 font-bold text-base">
                      +{cartItems?.totalCartPrice?.toLocaleString("en-US") ?? "0"}
                    </span>{" "}
                    <span className="text-gray-500 font-semibold">EGP</span>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar flex-1">
              <ul className="space-y-4">
                {cartItems?.products?.map((item) => (
                  <li
                    key={item._id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-200"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                    />
                    <div className="flex-1 space-y-1 text-sm">
                      <h3 className="font-semibold line-clamp-2 text-gray-600">
                        {item.product.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Category: <span className="font-medium">{item.product.category.name}</span>
                      </p>
                      <p className="text-xs font-semibold text-gray-500">
                        Price:{" "}
                        <span className="text-green-700 font-semibold">
                          +{item.price.toLocaleString("en-US")} EGP
                        </span>
                      </p>

                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="mt-1 inline-block text-xs font-semibold text-red-600 hover:text-red-800 hover:underline cursor-pointer transition-colors duration-200"
                        title="Remove Item"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center justify-end sm:flex-col gap-2 min-w-[110px]">
                      <div className="flex items-center  border-gray-200 rounded-md overflow-hidden ">
                        <button
                          onClick={() => handleDecrement(item.product._id, item.count)}
                          className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-gray-700 bg-white">
                          {item.count}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.product._id, item.count)}
                          className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between gap-4 mt-4">
                <NavLink
                  to={`/checkout/${cartItems?._id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition shadow"
                >
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                  Go to Checkout
                </NavLink>

                <button
                  onClick={handleClearCart}
                  disabled={clearing}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition shadow ${clearing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                >
                  {clearing ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Clearing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-trash"></i> Clear Cart
                    </>
                  )}
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;

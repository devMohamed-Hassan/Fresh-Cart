import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

export const CartContext = createContext();

function CartContextProvider(props) {
  const token = localStorage.getItem("userToken");
  const [cart, setCart] = useState({ products: [], totalCartPrice: 0 });

  async function refreshCart() {
    if (!token) return;
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token } }
      );
      setCart(response.data.data);
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  }

  async function addToCart(productId) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token } }
      );
      await refreshCart();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function getCartItems() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function updateCartItemQuantity(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: { token } }
      );
      await refreshCart();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function removeCartItem(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token } }
      );
      await refreshCart();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function clearCart() {
    try {
      const response = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token } }
      );
      await refreshCart();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (token) {
      refreshCart();
    }
  }, [token]);

  const cartContextValue = {
    cart,
    refreshCart,
    addToCart,
    getCartItems,
    updateCartItemQuantity,
    clearCart,
    removeCartItem,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;

export const useCart = () => useContext(CartContext);

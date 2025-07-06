import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
     const [wishlist, setWishlist] = useState([]);
     const [loading, setLoading] = useState(false);
     const token = localStorage.getItem("userToken");

     const fetchWishlist = async () => {
          try {
               setLoading(true);
               const { data } = await axios.get(
                    "https://ecommerce.routemisr.com/api/v1/wishlist",
                    { headers: { token } }
               );
               setWishlist(data.data);
          } catch (err) {
               console.error("Error loading wishlist:", err);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchWishlist();
     }, []);

     const addToWishlist = async (product) => {
          try {
               await axios.post(
                    "https://ecommerce.routemisr.com/api/v1/wishlist",
                    { productId: product.id },
                    { headers: { token } }
               );
               setWishlist((prev) => [...prev, product]);
          } catch (err) {
               console.error("Error adding to wishlist:", err);
          }
     };

     const removeFromWishlist = async (productId) => {
          try {
               await axios.delete(
                    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                    { headers: { token } }
               );
               setWishlist((prev) => prev.filter((item) => item.id !== productId));
          } catch (err) {
               console.error("Error removing from wishlist:", err);
          }
     };

     const isWishlisted = (productId) => wishlist.some((item) => item.id === productId);

     return (
          <WishlistContext.Provider
               value={{
                    wishlist,
                    loading,
                    addToWishlist,
                    removeFromWishlist,
                    isWishlisted,
                    fetchWishlist,
               }}
          >
               {children}
          </WishlistContext.Provider>
     );
};

export const useWishlist = () => useContext(WishlistContext);

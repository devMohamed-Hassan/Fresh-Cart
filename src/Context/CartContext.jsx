import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

function CartContextProvider(props) {

     async function addToCart(productId) {
          try {
               const token = localStorage.getItem("userToken");
               const response = await axios.post(
                    "https://ecommerce.routemisr.com/api/v1/cart",
                    { productId },
                    { headers: { token } }
               );
               return response.data;
          } catch (error) {
               console.error("addToCart error:", error);
               throw error;
          }
     }

     const cartContextValue = {
          addToCart,

     };

     return (
          <CartContext.Provider value={cartContextValue}>
               {props.children}
          </CartContext.Provider>
     );
}

export default CartContextProvider;

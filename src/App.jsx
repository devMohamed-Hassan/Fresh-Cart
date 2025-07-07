import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";


import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { initFlowbite } from "flowbite";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import { WishlistProvider } from "./Context/WishlistContext";
import Wishlist from "./Components/Wishlist/Wishlist";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Checkout from "./Components/Checkout/Checkout";


function App() {
  const queryClient = new QueryClient();

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "checkout/:id", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute> <Wishlist /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute>, },
        { path: "products/:slug", element: <ProtectedRoute><Products /></ProtectedRoute>, },
        { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "register", element: <PublicRoute><Register /></PublicRoute> },
        { path: "login", element: <PublicRoute><Login /></PublicRoute> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  useEffect(() => {
    initFlowbite();
  }, []);

  return (

    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <WishlistProvider>
          <RouterProvider router={routes} />
          <ToastContainer position="top-center" autoClose={3000} />
        </WishlistProvider>
      </CartContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

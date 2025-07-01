import { useEffect } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { initFlowbite } from "flowbite";
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "brands", element: <Brands /> },
        { path: "products", element: <Products /> },
        { path: "categories", element: <Categories /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  useEffect(() => {
    initFlowbite();
  }, []); // on mounting, Native Flowbite without Framework
  return (
    <>
      
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;

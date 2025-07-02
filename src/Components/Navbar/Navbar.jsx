import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { userContext } from "../../Context/UserContext";




function Navbar() {
  const navigate = useNavigate();
  const { token } = useContext(userContext);
  const handleSignout = () => {
    localStorage.removeItem("userToken");
    setToken("");
    navigate("/");
  };
  return (
    <nav className="bg-white  w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Logo" />
        </NavLink>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ul className="flex gap-x-3">
            <li>
              <i className="fa fa-brands fa-instagram"></i>
            </li>
            <li>
              <i className="fa fa-brands fa-tiktok"></i>
            </li>
            <li>
              <i className="fa fa-brands fa-twitter"></i>
            </li>
            <li>
              <i className="fa fa-brands fa-linkedin"></i>
            </li>
            <li>
              <i className="fa fa-brands fa-youtube"></i>
            </li>
            {token && <li>
              <NavLink className="cursor-pointer"
                onClick={handleSignout}
              >SignOut</NavLink>
            </li>}

          </ul>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-3 text-white rounded-sm md:bg-transparent  md:p-0"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100   md:p-0"
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="block py-2 px-3 text-gray-900 rounded-sm 0 md:p-0"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className="block py-2 px-3 text-gray-900 rounded-sm md:p-0"
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className="block py-2 px-3 text-gray-900 rounded-sm md:p-0"
              >
                Brands
              </NavLink>
            </li>
            {!token && <>
              <li>
                <NavLink
                  to="/login"
                  className="block py-2 px-3 text-gray-900 rounded-sm md:p-0"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="block py-2 px-3 text-gray-900 rounded-sm md:p-0"
                >
                  Register
                </NavLink>
              </li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useContext, useState ,useEffect} from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);




const { cart } = useContext(CartContext);
const totalItems = cart.products.reduce((acc, item) => acc + item.count, 0);


  const handleSignout = () => {
    localStorage.removeItem("userToken");
    setToken("");
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm font-semibold transition-colors ${isActive ? "text-main" : "text-gray-700 hover:text-green-600"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} className="h-8" alt="FreshCart" />
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <Link to="/cart" className="relative text-white hover:text-gray-200">
            <FaShoppingCart size={24} className="text-green-600" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                {totalItems}
              </span>
            )}
          </Link>
          <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
          <NavLink to="/categories" className={navLinkClasses}>Categories</NavLink>
          <NavLink to="/brands" className={navLinkClasses}>Brands</NavLink>
          {!token ? (
            <>
              <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
              <NavLink to="/register" className={navLinkClasses}>Register</NavLink>
            </>
          ) : (
            <button
              onClick={handleSignout}
              className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 hover:text-white transition-colors duration-200 px-2 py-1 rounded-md text-sm font-semibold"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Sign Out
            </button>

          )}
        </div>

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex gap-3 text-lg text-gray-500">
            <li><i className="fa-brands fa-instagram hover:text-pink-600"></i></li>
            <li><i className="fa-brands fa-tiktok hover:text-black"></i></li>
            <li><i className="fa-brands fa-twitter hover:text-blue-500"></i></li>
            <li><i className="fa-brands fa-linkedin hover:text-blue-700"></i></li>
            <li><i className="fa-brands fa-youtube hover:text-red-600"></i></li>
          </ul>

          <button
            type="button"
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <NavLink to="/" className={navLinkClasses} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/cart" className={navLinkClasses} onClick={toggleMenu}>Cart</NavLink>
          <NavLink to="/products" className={navLinkClasses} onClick={toggleMenu}>Products</NavLink>
          <NavLink to="/categories" className={navLinkClasses} onClick={toggleMenu}>Categories</NavLink>
          <NavLink to="/brands" className={navLinkClasses} onClick={toggleMenu}>Brands</NavLink>

          {!token ? (
            <div className="flex gap-4 mt-2">
              <NavLink to="/login" className={navLinkClasses} onClick={toggleMenu}>Login</NavLink>
              <NavLink to="/register" className={navLinkClasses} onClick={toggleMenu}>Register</NavLink>
            </div>
          ) : (
            <button
              onClick={() => {
                handleSignout();
                toggleMenu();
              }}
              className="block text-red-600 hover:text-red-800 text-sm font-semibold px-4 py-2"
            >
              Sign Out
            </button>
          )}
        </div>
      )}

    </nav>
  );
}

export default Navbar;

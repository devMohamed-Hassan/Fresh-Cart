import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import useClickOutside from "../../Hooks/useClick";
import { useWishlist } from "../../Context/WishlistContext";

function Navbar() {
  const { token, setToken } = useContext(userContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const menuRef = useRef(null);
  const totalItems = cart?.products?.reduce((acc, item) => acc + item.count, 0) || 0;
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length
  const username = localStorage.getItem("userName") || "User";

  useClickOutside(menuRef, () => setIsMenuOpen(false), isMenuOpen);
  useClickOutside(avatarRef, () => setIsAvatarMenuOpen(false), isAvatarMenuOpen);

  const handleSignout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setToken("");
    navigate("/");
  };

  const navLinkClasses = ({ isActive }) =>
    `block py-1 text-sm font-semibold transition-colors duration-200 
   border-b-0 sm:border-b-2
   ${isActive
      ? "text-green-600 sm:border-[var(--main-color)]"
      : "text-gray-700 border-transparent hover:text-green-600 hover:sm:border-green-600"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} className="h-8" alt="FreshCart" />
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
          <NavLink to="/categories" className={navLinkClasses}>Categories</NavLink>
          <NavLink to="/brands" className={navLinkClasses}>Brands</NavLink>
          {!token && (
            <NavLink to="/login" className={navLinkClasses}>
              Login
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {token && (
            <>
              <Link to="/wishlist" className="relative text-gray-600 hover:text-pink-500">
                <i className="fa-regular fa-heart text-xl"></i>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative text-gray-600 hover:text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"></path></svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            </>
          )}

          {token && (
            <div className="relative flex items-center gap-2 px-2" ref={avatarRef}>
              <span className="text-sm font-semibold text-gray-500 truncate max-w-[140px]">
                Welcome, {username || "User"}
              </span>
              <button
                onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <i className="fa-solid fa-circle-user text-3xl text-green-600 rounded"></i>
              </button>

              {isAvatarMenuOpen && (
                <div className="absolute right-0 top-12 w-45 mt-1 bg-white shadow-lg rounded-md z-50 overflow-hidden">

                  <div className="px-4 py-3 bg-gray-100 border-b border-gray-300">
                    <p className="text-sm text-gray-700 font-medium">
                      <span className="block font-semibold">Welcome,</span><span className="text-gray-500 font-semibold">{username || "User"}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/change-password");
                      setIsAvatarMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-sm text-gray-800 px-4 py-2 font-semibold hover:bg-gray-100 transition-colors duration-200"
                  >
                    <i className="fa-solid fa-key text-base text-red-500"></i>
                    Change Password
                  </button>

                  <button
                    onClick={() => {
                      handleSignout();
                      setIsAvatarMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-sm bg-red-600 font-semibold text-white px-4 py-2 hover:bg-red-800 transition-colors duration-200"
                  >
                    <i className="fa-solid fa-right-from-bracket text-base"></i>
                    Log Out
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}

          className="md:hidden px-4 pb-4 pt-3 space-y-2 bg-white shadow-md rounded-b-lg border-t border-gray-200">

          {token && (
            <div className="flex items-center  bg-gray-100 p-2 justify-between pb-2 border-b border-gray-200 rounded-sm">
              <p className="text-sm text-gray-600 font-medium">
                <span className="text-gray-800 font-semibold">Welcome, </span>
                <span className="text-gray-400 font-semibold">{username || "User"}</span>
              </p>
            </div>
          )}
          <div className="bg-gray-100 w-full p-2 rounded-sm">
            <NavLink to="/" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Products</NavLink>
            <NavLink to="/categories" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Categories</NavLink>
            <NavLink to="/brands" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Brands</NavLink>

          </div>


          {token && (
            <div className="flex items-center  pt-3 border-t border-gray-500">
              <button
                onClick={() => {
                  handleSignout();
                  setIsMenuOpen(prev => !prev);
                }}
                className="w-3/2 flex items-center justify-center gap-2 text-sm px-3 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 rounded-md transition"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Log Out
              </button>

              <NavLink
                to="/wishlist"
                className="w-1/4 flex justify-center text-red-500 text-lg hover:text-red-600 transition relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-regular fa-heart text-xl "></i>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 font-bold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {wishlistCount}
                  </span>
                )}

              </NavLink>

              <NavLink
                to="/cart"
                className="w-1/4 flex justify-center text-green-600 text-lg hover:text-green-700 transition relative"
                onClick={() => setIsMenuOpen(false)}
              >

                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"></path></svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 font-bold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {totalItems}
                  </span>
                )}
              </NavLink>

            </div>
          )}
        </div>
      )}



    </nav>
  );
}

export default Navbar;

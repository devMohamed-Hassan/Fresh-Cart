import React from "react";
import qrCode from "../../assets/images/QR.png"
import googlePlay from "../../assets/images/Google_Play_Store.svg"
import appStore from "../../assets/images/app-store.svg"
import logo from "../../assets/images/frshcart-dark.svg"


const Footer = () => {
  return (
    <footer className="bg-black text-white px-5 md:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-5 gap-8 py-10">
        <div className="flex flex-col">
          <img src={logo} alt="FreshCart" className="w-full mb-3 -translate-y-3" />
          <h2 className="text-xl font-bold mb-4">Exclusive</h2>
          <p className="mb-2 font-semibold">Subscribe</p>
          <p className="text-gray-400 mb-4">Get 10% off your first order</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 flex-grow rounded-l bg-green-500 text-white placeholder-white focus:outline-none  focus:ring-green-500 focus:border-green-400"
            />
            <button className="bg-green-500 p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Support</h2>
          <p className="text-gray-400 mb-2">Abo Tesht, Qena, Egypt.</p>
          <p className="text-gray-400 mb-2">mohamed.h.ismael@gmail.com</p>
          <p className="text-gray-400">+20 123 456 7899</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Account</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">My Account</a></li>
            <li><a href="#" className="hover:text-white">Login / Register</a></li>
            <li><a href="#" className="hover:text-white">Cart</a></li>
            <li><a href="#" className="hover:text-white">Wishlist</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Quick Link</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms Of Use</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Download App</h2>
          <p className="text-gray-400 mb-4 text-sm">Save $3 with App New User Only</p>
          <div className="flex items-center space-x-3 mb-4">
            <img src={qrCode} alt="QR code" className="w-16 h-16" />
            <div className="flex flex-col space-y-2 w-24">
              <img src={googlePlay} alt="Google Play" className="h-8 w-full object-contain" />
              <img src={appStore} alt="App Store" className="h-8 w-full object-contain" />
            </div>
          </div>
          <div className="flex space-x-5 text-gray-400 text-lg">
            <a href="#"><i className="fab fa-facebook-f hover:text-white"></i></a>
            <a href="#"><i className="fab fa-twitter hover:text-white"></i></a>
            <a href="#"><i className="fab fa-instagram hover:text-white"></i></a>
            <a href="#"><i className="fab fa-linkedin-in hover:text-white"></i></a>
            <a href="#"><i className="fab fa-tiktok hover:text-white"></i></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm border-t border-gray-700 py-4">
        &copy; Copyright Rimel 2025. All rights reserved.
      </div>
    </footer>

  );
};

export default Footer;

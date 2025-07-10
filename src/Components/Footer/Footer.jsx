import React from "react";
import qrCode from "../../assets/images/QR.png"
import googlePlay from "../../assets/images/Google_Play_Store.svg"
import appStore from "../../assets/images/app-store.svg"
import logo from "../../assets/images/frshcart-dark.svg"

const Footer = () => {
  return (
    <footer className="bg-black text-white px-5 md:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 py-10">

        <div className="flex flex-col">
          <img src={logo} alt="FreshCart" className="w-60 sm:w-48 mb-3 -translate-y-3" />
          <p className="mb-2 font-semibold">Subscribe</p>
          <p className="text-gray-400 mb-4 text-sm">Get 10% off your first order</p>
          <div className="flex w-full max-w-xs overflow-hidden rounded shadow-md bg-white">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-2 text-gray-800 placeholder-gray-500 focus:outline-none min-w-0"
            />
            <button className="bg-green-500 p-2 px-4 text-white hover:bg-green-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-4">Support</h2>
          <p className="text-gray-400 mb-2 text-sm break-words">5 Abbas El Akkad St, Nasr City, Cairo, Egypt</p>
          <p className="text-gray-400 mb-2 text-sm break-words">support@freshcart.dev</p>
          <p className="text-gray-400 text-sm">+20 123 456 7899</p>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-4">Quick Link</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms Of Use</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold mb-2">Download App</h2>
            <p className="text-gray-400 text-sm mb-4">Save $3 with App New User Only</p>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3 bg-gray-900 rounded-lg shadow-md w-fit">
              <img src={qrCode} alt="QR code" className="w-20 h-20 rounded" />
              <div className="flex flex-col gap-2 w-28">
                <img src={googlePlay} alt="Google Play" className="h-10 object-contain" />
                <img src={appStore} alt="App Store" className="h-10 object-contain" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-gray-400 text-lg mt-4">
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

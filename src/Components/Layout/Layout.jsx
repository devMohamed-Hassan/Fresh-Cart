import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      <header className="w-full shadow-sm sticky top-0 z-50 bg-white">
        <Navbar />
      </header>

      <main className="flex-grow bg-gray-100 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
          <Outlet />
        </div>
      </main>

      <footer className="w-full border-t bg-gray-50">
        <Footer />
      </footer>
      
    </div>
  );
}

export default Layout;

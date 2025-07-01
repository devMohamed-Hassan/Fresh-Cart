import React from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <div className="container mx-auto px-4 flex flex-col flex-grow">
          <Navbar />
          <main className="flex-grow py-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;

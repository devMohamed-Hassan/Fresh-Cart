import React, { useState } from "react";
import MyProfile from "../MyProfile/MyProfile";
import { FaUserCircle, FaLock, FaMapMarkedAlt } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import ChangePassword from "../ChangePassword/ChangePassword";
import UserAddresses from "../UserAddresses/UserAddresses";


function ManageAccount() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabClass = (tab) =>
    `flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${activeTab === tab
      ? "bg-green-100 text-green-700 font-medium"
      : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        <aside className="w-full md:w-64 border-r border-gray-200 bg-gray-50 p-6">
          <nav className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Manage My Account
              </h2>
              <ul className="space-y-2">
                <li
                  onClick={() => setActiveTab("profile")}
                  className={tabClass("profile")}
                >
                  <FaUserCircle className="inline-block mr-2 text-gray-500" />
                  My Profile
                </li>
                <li
                  onClick={() => setActiveTab("changePassword")}
                  className={tabClass("changePassword")}
                >
                  <FaLock className="inline-block mr-2 text-gray-500" />
                  Change Password
                </li>
                <li
                  onClick={() => setActiveTab("address")}
                  className={tabClass("address")}
                >
                  <FaMapMarkedAlt className="inline-block mr-2 text-gray-500" />
                  Address Book
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                My Orders
              </h2>
              <ul className="space-y-2">
                <li onClick={() => setActiveTab("returns")} className={tabClass("returns")}>
                  <RiRefund2Line className="inline-block mr-2 text-lg text-gray-500" />
                  Order Revisions
                </li>

              </ul>
            </div>
          </nav>
        </aside>
        <main className="bg-gray-100 flex-1 p-6 overflow-y-auto">
          <div className="w-full mx-auto">
            {activeTab === "profile" && <MyProfile />}
            {activeTab === "changePassword" && <ChangePassword />}
            {activeTab === "address" && (<UserAddresses />)}
            {activeTab === "returns" && (
              <div className="text-gray-700">returns</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageAccount;

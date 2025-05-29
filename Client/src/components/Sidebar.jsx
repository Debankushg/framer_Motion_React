// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#333333] text-white fixed top-8 left-0 flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">My Sidebar</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded">
          Profile
        </Link>
        <Link to="/appointments" className="hover:bg-gray-700 p-2 rounded">
          Recent Appointments
        </Link>
        <Link to="/contact" className="hover:bg-gray-700 p-2 rounded">
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

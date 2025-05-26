import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";

const Navbar = ({ setToken }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setToken(null);
  };

  return (
    <nav className="bg-[#242424] text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/">
          <motion.h1
            className="text-3xl font-bold text-white  uppercase"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 5 }}
            transition={{ duration: 0.5 }}
          >
            Coffee <span className="text-amber-500">Coder</span>
          </motion.h1>
        </Link>
      </div>
      <div className="space-x-6 text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-amber-400 font-semibold" : "hover:text-amber-400"
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-amber-400 font-semibold" : "hover:text-amber-400"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "text-amber-400 font-semibold" : "hover:text-amber-400"
          }
        >
          Services
        </NavLink>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-amber-500 ,font-semibold text-#242424 py-1.5 px-4 rounded hover:bg-amber-700 cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-amber-500 ,font-semibold text-#242424 py-1.5 px-4 rounded hover:bg-amber-700 cursor-pointer"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

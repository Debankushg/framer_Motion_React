import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";

import { Dropdown, Space } from "antd";

const Navbar = ({ setToken }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    setToken(null);
  };

  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      extra: "⌘P",
      onClick: () => navigate("/profile"),
    },
    {
      key: "3",
      label: "Logout",
      extra: "⌘B",
      onClick: handleLogout,
    },
    {
      key: "4",
      label: "Dashboard",
      icon: <SettingOutlined />,
      extra: "⌘S",
      onClick: () => navigate("/dashboard"),
    },
  ];

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleRegistration = () => {
    navigate("/register");
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
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            icon={<DownOutlined />}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <div className="bg-amber-500 ,font-semibold text-#242424   hover:bg-amber-700 cursor-pointer rounded-full">
                  <img
                    className="w-[38px] h-[38px] rounded-full"
                    src={
                      user?.image
                        ? user.image
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="User"
                  />
                </div>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <NavLink
            to="/login"
            className="bg-amber-500 ,font-semibold text-#242424 py-2.5 px-4 rounded hover:bg-amber-700 cursor-pointer"
          >
            Login
          </NavLink>
        )}

        {!token && (
          <button
            onClick={handleRegistration}
            className="bg-amber-500 ,font-semibold text-#242424 py-1.5 px-4 rounded hover:bg-amber-700 cursor-pointer"
          >
            Register
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div>
      <div className="flex d-dashboard">
        <Sidebar
        //   isSidebarOpen={isSidebarOpen}
        //   setIsSidebarOpen={setIsSidebarOpen}
        />
        <div
          className={`${
            isSidebarOpen ? "ml-64" : "ml-16"
          }  w-full d-dashboard__area`}
        >
          {/* <Header /> */}
          <div className="container mx-auto ">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import * as motion from "motion/react-client";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Navigate, Route } from "react-router";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./pages/Footer";
import Services from "./pages/Services";
import { ConfigProvider, theme } from "antd";

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
};

export default App;

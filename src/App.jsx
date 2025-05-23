import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Private/Dashboard";
import IdleTimerComponent from "./components/IdleTimeOut";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem("user"))?.token || null;
  });

  // Optional: listen to storage events (e.g., if token cleared in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(JSON.parse(localStorage.getItem("user"))?.token || null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [localStorage, setToken]);

  // You must also update this `setToken(null)` on logout in your logout logic!

  const AppContent = () => (
    <>
      <Navbar setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLogin={(tok) => setToken(tok)} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );

  return (
    <BrowserRouter>
      {token ? (
        <IdleTimerComponent setToken={setToken}>
          <AppContent />
        </IdleTimerComponent>
      ) : (
        <AppContent />
      )}
    </BrowserRouter>
  );
};

export default App;

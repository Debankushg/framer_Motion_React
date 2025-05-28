import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Auth/Login";
import Registration from "./pages/Auth/Registration";
import Dashboard from "./pages/Private/Dashboard";
import IdleTimerComponent from "./components/IdleTimeOut";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Private/Profile";

const App = () => {
  const [token, setToken] = useState();
  const tokens = localStorage.getItem("token");
  // Optional: listen to storage events (e.g., if token cleared in another tab)
  useEffect(() => {
    setToken(tokens);

    window.addEventListener("storage", token);
    return () => window.removeEventListener("storage", token);
  }, [localStorage, setToken]);

  const AppContent = () => (
    <>
      <Navbar setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLogin={(tok) => setToken(tok)} />}
        />
        <Route path="/register" element={<Registration />} />
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
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

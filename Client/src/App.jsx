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
import Layout from "./layout/Layout";
import Appointments from "./pages/Private/Appointments";
import AppointmentList from "./pages/Private/AppointmentList";
import CreateJobApp from "./pages/Private/CreateJobApp";
import JobList from "./pages/Private/JobApplications";
import JobDetails from "./pages/Private/JobDetails";
import TimeCalender from "./pages/Private/TimeCalender";

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
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
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
          <Route
            path="/create-appointment"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <AppointmentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-job-post"
            element={
              <ProtectedRoute>
                <CreateJobApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-applications-list"
            element={
              <ProtectedRoute>
                <JobList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-details/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/time-calender"
            element={
              <ProtectedRoute>
                <TimeCalender />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      {!token && <Footer />}
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

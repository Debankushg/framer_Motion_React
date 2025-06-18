import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"; // No BrowserRouter here
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
import Joyride from "react-joyride";

const getStepsForRoute = (path) => {
  switch (path) {
    case "/":
      return [
        {
          target: ".home-step-1",
          content: "Welcome to the Home page! Here's the first step.",
        },
        {
          target: ".home-step-2",
          content: "This is the second step on the Home page.",
        },
      ];
    case "/about":
      return [
        {
          target: ".about-step-1",
          content: "Welcome to the About page! Here's the first step.",
        },
        {
          target: ".about-step-2",
          content: "This is the second step on the About page.",
        },
      ];
    case "/services":
      return [
        {
          target: ".services-step-1",
          content: "Welcome to the Services page! Here's the first step.",
        },
        {
          target: ".services-step-2",
          content: "This is the second step on the Services page.",
        },
      ];
    default:
      return [];
  }
};

const App = () => {
  const [token, setToken] = useState();
  const tokens = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const [runTour, setRunTour] = useState(false);
  const [steps, setSteps] = useState(getStepsForRoute(location.pathname));

  useEffect(() => {
    setToken(tokens);
    window.addEventListener("storage", () =>
      setToken(localStorage.getItem("token"))
    );
    return () =>
      window.removeEventListener("storage", () =>
        setToken(localStorage.getItem("token"))
      );
  }, [tokens]);

  const handleCallback = (data) => {
    if (data.status === "finished" || data.status === "skipped") {
      localStorage.setItem("tourCompleted", true);
      setRunTour(false);
    }

    if (data.action === "next") {
      if (location.pathname === "/") {
        navigate("/about");
      } else if (location.pathname === "/about") {
        navigate("/services");
      }
    }
  };

  useEffect(() => {
    setSteps(getStepsForRoute(location.pathname));
  }, [location.pathname]);

  const AppContent = () => (
    <>
      <Navbar setToken={setToken} />
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        callback={handleCallback}
      />
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
            path="/appointments"
            element={
              <ProtectedRoute>
                <AppointmentList />
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
    <>
      {token ? (
        <IdleTimerComponent setToken={setToken}>
          <AppContent />
        </IdleTimerComponent>
      ) : (
        <AppContent />
      )}
    </>
  );
};

export default App;

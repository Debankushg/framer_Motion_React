import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const TimeoutModal = ({ onClose, setToken }) => {
  const navigate = useNavigate();
  const appTimeOut = {
    warning: 30, // seconds countdown
  };

  const [secondsToGo, setSecondsToGo] = useState(appTimeOut.warning);
  const timerRef = useRef(null);

  useEffect(() => {
    // Start countdown timer
    timerRef.current = setInterval(() => {
      setSecondsToGo((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const handleLogout = () => {
    clearInterval(timerRef.current);
    localStorage.removeItem("user");
    navigate("/login");
    setToken(null);
    console.log("Logged out");
    if (onClose) onClose();
    // Your logout logic here
  };

  const handleStayLoggedIn = () => {
    clearInterval(timerRef.current); // Stop the timer
    console.log("Stay logged in");
    setSecondsToGo(appTimeOut.warning); // Reset countdown if you want
    if (onClose) onClose(); // Close modal if parent wants to handle it
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">
          It looks like you’re away!
        </h2>
        <p className="mb-6">
          We’ll log you out in <span className="font-bold">{secondsToGo}</span>{" "}
          seconds.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-amber-600 hover:bg-amber-700 cursor-pointer text-white font-semibold py-2 px-6 rounded"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-[#242424] hover:bg-[#1f1f1f] text-white cursor-pointer font-semibold py-2 px-4 rounded"
            type="button"
            onClick={handleStayLoggedIn}
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeoutModal;

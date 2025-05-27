import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service/Auth";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return passwordRegex.test(password);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitRegistration = async (data) => {
    try {
      const response = await registerUser(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, and special character"
      );
      return;
    }

    try {
      const data = { username, email, fullname, password };
      const response = await submitRegistration(data);

      if (response.status === "success") {
        toast.success("Registration successful");
        navigate("/login"); // adjust as needed
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      console.log(error, "error In REF");

      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#242424] px-4">
      <div className="max-w-md w-full bg-[#00000081] rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-amber-500 not-last:mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-amber-500 font-medium mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="w-full px-4 py-3 border text-amber-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-amber-500 font-medium mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border text-amber-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label
              htmlFor="fullname"
              className="block text-amber-500 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 border text-amber-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-amber-500 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border text-amber-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-[#242424] text-amber-50 font-semibold rounded-md hover:bg-[#1f1f1f] transition ${
              !username || !email || !fullname || !password
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={!username || !email || !fullname || !password}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;

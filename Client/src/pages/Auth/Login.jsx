import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
  const isValidPassword = (password) => passwordRegex.test(password);
  // const Usertoken = Math.random().toString(36).substring(2, 15);

  const userLogin = async (data) => {
    try {
      const response = await loginUser(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (email && isValidPassword(password) && rememberMe) {
    const data = { email, password };
    const response = await userLogin(data);

    if (response.status === "success") {
      toast.success("Login successful");
      navigate("/dashboard");
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } else {
      toast.error(response?.message);
    }
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#242424] px-4">
      <div className="max-w-md w-full bg-[#00000081] rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-amber-500 not-last:mb-6 text-center">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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

          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-amber-500 select-none"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-[#242424] text-amber-50 font-semibold rounded-md hover:bg-[#1f1f1f] transition ${
              !email || !password || !rememberMe
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={!email || !password || !rememberMe}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

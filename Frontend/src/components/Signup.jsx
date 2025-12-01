import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.6, ease: "easeOut" },
  }),
};

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://api-snap.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-4">

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0.1}
        className="backdrop-blur-xl bg-white/70 p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/40"
      >
        <motion.h2
          variants={fadeUp}
          custom={0.2}
          className="text-3xl font-bold text-center text-purple-700 mb-6"
        >
          Create an Account
        </motion.h2>

        <form onSubmit={handleSignup} className="space-y-6">

          {error && (
            <motion.p
              variants={fadeUp}
              custom={0.25}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Full Name */}
          <motion.div variants={fadeUp} custom={0.3}>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp} custom={0.4}>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={fadeUp} custom={0.5}>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={fadeUp}
            custom={0.6}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-medium shadow-md hover:bg-purple-700 transition"
          >
            Sign Up
          </motion.button>

          {/* Login Link */}
          <motion.div
            variants={fadeUp}
            custom={0.7}
            className="text-center text-sm text-gray-600 mt-4"
          >
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-medium hover:underline">
              Login
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;

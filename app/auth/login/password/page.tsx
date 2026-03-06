"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel, Eye, EyeOff } from "@hugeicons/core-free-icons";

const EnterPassword: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    router.push("/");
  };

  const handleSignIn = () => {
    if (password) {
      router.push("/account/personal-details");
    }
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <HugeiconsIcon icon={Cancel} className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Enter Password
          </h2>
          <p className="text-gray-600 text-sm">
            Please fill in the information below to complete your Sign Up
            process
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <HugeiconsIcon icon={EyeOff} className="w-5 h-5" />
              ) : (
                <HugeiconsIcon icon={Eye} className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleForgotPassword}
          className="text-primary hover:underline text-sm font-medium mb-6"
        >
          Forgot Password
        </button>

        <motion.button
          onClick={handleSignIn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors mb-6"
        >
          Sign In
        </motion.button>

        <p className="text-xs text-gray-500 text-center">
          By Signing In Or Registering, I Confirm That I Have Read And Agreed To
          Ezzifly{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms And Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default EnterPassword;

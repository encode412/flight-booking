"use client";
import React, { useState } from "react";
import { Cancel } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { VerificationCodeModalProps } from "@/types/auth";

const VerifyEmail: React.FC<VerificationCodeModalProps> = ({}) => {
  const router = useRouter();
  const email = "  ";

  const [code, setCode] = useState("");

  const handleClose = () => {
    router.push("/");
  };

  const handleContinue = () => {
    router.push("/auth/forgot-password/reset-password");
  };

  const handleRequestNewCode = () => {};

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
          className="absolute top-6 right-6 text-gray-800 cursor-pointer hover:text-gray-600 transition-colors"
        >
          <HugeiconsIcon icon={Cancel} className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Enter Verification Code
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We have sent a verification code to {email}. Please check your inbox
          and enter the code below
        </p>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Code
          </label>
          <input
            type="text"
            placeholder="Enter Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          onClick={handleRequestNewCode}
          className="text-blue-600 hover:underline text-sm font-medium mb-6"
        >
          Request New Code
        </button>

        <motion.button
          onClick={handleContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 mb-4"
        >
          Continue
        </motion.button>

        <p className="text-xs text-gray-500 text-center">
          By Signing In Or Registering, I Confirm That I Have Read And Agreed To
          Ezzifly{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms And Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;

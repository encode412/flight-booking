"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel, Eye, EyeOff } from "@hugeicons/core-free-icons";

import { PersonalInfoModalProps } from "@/types/auth";

const PersonalInfo: React.FC<PersonalInfoModalProps> = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    router.back();
  };

  const handleRegister = () => {
    router.push("/account/personal-details");
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

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personal Information
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Please fill in the information below to complete your Sign Up process
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Create Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <HugeiconsIcon icon={EyeOff} className="w-5 h-5" />
              ) : (
                <HugeiconsIcon icon={Eye} className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <motion.button
          onClick={handleRegister}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 mb-4"
        >
          Register
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

export default PersonalInfo;

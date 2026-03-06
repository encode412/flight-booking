"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NewPasswordModalProps } from "@/types/auth";
import { Cancel, Eye, EyeOff } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";


const ResetPassword: React.FC<NewPasswordModalProps> = ({}) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClose = () => {
    router.push("/");
  };

  const handleChange = () => {
    if (newPassword === confirmPassword) {
      router.push("/auth/login/password");
    }
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
          className="absolute top-6 right-6 text-gray-800 cursor-pointer hover:text-gray-600 transition-colors"
        >
          <HugeiconsIcon icon={Cancel} className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Enter New Password
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter a new password of your choice
        </p>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNew ? (
                <HugeiconsIcon icon={EyeOff} className="w-5 h-5" />
              ) : (
                <HugeiconsIcon icon={Eye} className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? (
                <HugeiconsIcon icon={EyeOff} className="w-5 h-5" />
              ) : (
                <HugeiconsIcon icon={Eye} className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <motion.button
          onClick={handleChange}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 mb-4"
        >
          Change
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

export default ResetPassword;

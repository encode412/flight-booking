"use client";

import { EnterEmailModalProps } from "@/types/auth";
import { Cancel } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPassword: React.FC<EnterEmailModalProps> = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const handleClose = () => {
    router.back();
  };

  const handleSend = () => {
    console.log("Send to:", email);
    router.push("/auth/forgot-password/verify-email");
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

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Email</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please enter your email address you used to register. We will send a
          verification code to this email address
        </p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
        >
          Send
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

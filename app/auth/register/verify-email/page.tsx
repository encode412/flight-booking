"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cancel } from "@hugeicons/core-free-icons";

import { VerifyEmailModalProps } from "@/types/auth";

const VerifyEmail: React.FC<VerifyEmailModalProps> = ({}) => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const email = "  ";

  const handleClose = () => {
    router.push("/");
  };

  const handleVerify = () => {
    if (code) {
      router.push("/auth/register/personal-info");
    }
  };

  const handleRequestNewCode = () => {};

  const handleLogin = () => {
    router.push("/auth/login/email");
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
          className="absolute cursor-pointer top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <HugeiconsIcon icon={Cancel} className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Enter Verification Code
          </h2>
          <p className="text-gray-600 text-base">
            We&apos;ve sent a verification code to{" "}
            <span className="text-accent font-medium">{email}</span>. Please
            enter this code to continue.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 font-semibold mb-2">Code</label>
          <input
            type="text"
            placeholder="Enter Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent  focus:border-transparent"
          />
        </div>

        <button
          onClick={handleRequestNewCode}
          className="text-primary hover:underline text-sm font-medium mb-6"
        >
          Request New Code
        </button>

        <motion.button
          onClick={handleVerify}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-accent cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors mb-4"
        >
          Verify
        </motion.button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <p className="text-center text-sm text-gray-600">
          Already Have an Account?{" "}
          <Link href="/auth/login/email">
            <button
              onClick={handleLogin}
              className="text-primary cursor-pointer hover:underline font-semibold"
            >
              Login
            </button>
          </Link>
        </p>

        <p className="text-xs text-gray-500 text-center mt-6">
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

export default VerifyEmail;

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
  X,
} from "@hugeicons/core-free-icons";

import { footerSections } from "@/constants";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribed:", email);
      setEmail("");
    }
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="hidden sm:px-8 lg:px-16 wrapper py-12 md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-normal text-gray-300 text-base mb-5">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-white hover:text-gray-300 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="justify-items-end">
            <div className="mb-6">
              <Image
                src="/images/logo-white.svg"
                alt="Ezzifly Logo"
                width={150}
                height={40}
                className="mb-4"
              />
              <div className="flex gap-4">
                <Link
                  href="https://facebook.com"
                  className="text-white hover:text-white transition-colors"
                >
                  <HugeiconsIcon icon={Facebook} className="w-5 h-5" />
                </Link>
                <Link
                  href="https://x.com"
                  className="text-white hover:text-white transition-colors"
                >
                  <HugeiconsIcon icon={Twitter} className="w-5 h-5" />
                </Link>
                <Link
                  href="https://instagram.com"
                  className="text-white hover:text-white transition-colors"
                >
                  <HugeiconsIcon icon={Instagram} className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <p className="text-white text-sm">Copyrights © 2025 Ezzifly</p>
          </div>
        </div>
      </div>
      <div className="sm:px-8 lg:px-16 hidden md:block wrapper py-12 border-b border-gray-700">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="max-w-lg">
            <h3 className="text-2xl md:text-3xl font-medium mb-3">
              Want Insights from Ezzifly sent to your Inbox?
            </h3>
            <p className="text-gray-400 text-sm">
              Get notified when flight prices drop and when the best deals
              become available for your travels.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <div className="flex gap-2 bg-white rounded-lg p-1">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-gray-900 outline-none rounded-lg"
              />
              <motion.button
                onClick={handleSubscribe}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              By clicking subscribe, you will receive updates from us. You
              always have the choice to unsubscribe.
            </p>
          </div>
        </div>
      </div>

      <div className="sm:px-8 lg:px-16 wrapper py-12">
        <div className="block md:hidden">
          <div className="mb-8">
            <Image
              src="/images/logo-white.svg"
              alt="Ezzifly Logo"
              width={150}
              height={40}
              className="mb-2"
            />
            <p className="text-sm text-gray-400">Fly High, Dream Higher</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    Company Details
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Our Policy</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Socials</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <HugeiconsIcon icon={Facebook} className="w-4 h-4" />
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    Ezzifly
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <HugeiconsIcon icon={Instagram} className="w-4 h-4" />
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    Ezzifly
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <HugeiconsIcon icon={X} className="w-4 h-4" />
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    Ezzifly
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <HugeiconsIcon icon={Mail} className="w-4 h-4" />
                  <a
                    href="mailto:ezziflywithu@gmail.com"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    ezziflywithu@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <HugeiconsIcon icon={Phone} className="w-4 h-4" />
                  <a
                    href="tel:09053081230"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    09053081230
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Account</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-white hover:text-gray-300"
                  >
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-600 mb-6" />

          <p className="text-sm text-center text-gray-300">
            Copyrights © 2025 Ezzifly. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

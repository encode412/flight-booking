"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import { navigationItems } from "@/constants";
import { AccountLayoutProps } from "@/types/layout";

interface User {
  name: string;
  avatar?: string;
}

interface AccountLayoutWithNavProps extends AccountLayoutProps {
  user?: User;
}

const AccountLayout: React.FC<AccountLayoutWithNavProps> = ({ children }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    console.log("Sign out");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="wrapper sm:px-8 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="bg-white pr-5 rounded-2xl h-full shadow-sm border border-gray-200 overflow-hidden">
              <nav className="p-2 flex flex-col gap-5">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center text-black gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                        isActive ? "bg-red-50" : "hover:bg-red-50"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-500 rounded-r" />
                      )}
                      <HugeiconsIcon icon={Icon} className="w-5 h-5 shrink-0" />
                      <span className="font-normal">{item.label}</span>
                    </Link>
                  );
                })}

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mt-2"
                >
                  <HugeiconsIcon
                    icon={Logout01Icon}
                    className="w-5 h-5 shrink-0"
                  />
                  <span className="font-medium">Sign Out</span>
                </button>
              </nav>
            </div>
          </aside>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between"
            >
              <span className="font-semibold text-gray-900">Account Menu</span>

              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <nav className="p-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                            isActive
                              ? "bg-red-50 text-red-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r" />
                          )}

                          <HugeiconsIcon
                            icon={Icon}
                            className="w-5 h-5 shrink-0"
                          />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      );
                    })}

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mt-2"
                    >
                      <HugeiconsIcon
                        icon={Logout01Icon}
                        className="w-5 h-5 shrink-0"
                      />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;

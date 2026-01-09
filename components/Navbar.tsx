"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown, Cancel, Menu } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion, Variants } from "framer-motion";

import Button from "./Button";
import Dropdown, { DropdownOption } from "./Dropdown";

const countries = [
  { code: "NGN", name: "Nigeria", flag: "🇳🇬", currency: "NGN" },
  { code: "USD", name: "United States", flag: "🇺🇸", currency: "USD" },
  { code: "GBP", name: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
  { code: "EUR", name: "European Union", flag: "🇪🇺", currency: "EUR" },
  { code: "CAD", name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { code: "GHS", name: "Ghana", flag: "🇬🇭", currency: "GHS" },
  { code: "KES", name: "Kenya", flag: "🇰🇪", currency: "KES" },
  { code: "ZAR", name: "South Africa", flag: "🇿🇦", currency: "ZAR" },
];

const languages = [
  { code: "EN", name: "English" },
  { code: "FR", name: "Français" },
  { code: "ES", name: "Español" },
  { code: "DE", name: "Deutsch" },
];

const Navbar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<DropdownOption>(countries[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const navLinks = [
    { label: "Flights", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Blogs", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const drawerVariants: Variants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: "100%",
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="wrapper lg:px-16">
        <div className="flex items-center justify-between h-20">
          <div className="flex gap-x-6">
            <div className="flex w-25 md:w-50 items-center">
              <Link href="/" className="flex items-center gap-10">
                <Image
                  alt="Ezzifly"
                  src="/images/logo.svg"
                  width={130}
                  height={40}
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-700 text-[15px] hover:text-primary font-normal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Dropdown
              options={languages}
              selected={selectedLanguage.code}
              onSelect={(option) => setSelectedLanguage(option)}
            />

            <Dropdown
              options={countries}
              selected={
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span>{selectedCountry.code}</span>
                </div>
              }
              onSelect={(option) => setSelectedCountry(option)}
              icon={ArrowDown}
            />

            <Link href="/auth/register">
              <Button variant="primary" size="md">
                Sign In or Register
              </Button>
            </Link>
          </div>

          <div className="flex gap-3 md:hidden ">
            <Link href="/auth/register">
              <Button variant="primary" size="md">
                Sign In or Register
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <HugeiconsIcon size={24} icon={Cancel} />
              ) : (
                <HugeiconsIcon
                  size={24}
                  icon={Menu}
                  className="w-6 h-6 text-gray-700"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              ref={containerRef}
              className="md:hidden fixed right-0 top-0 bottom-0 w-5/6 bg-white z-50"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col h-full">
                <div className="flex flex-col h-full">
                  <div className="px-6 absolute right-0 py-4 border-b border-gray-200">
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <HugeiconsIcon size={24} icon={Cancel} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <Link
                      href="/cart"
                      className="flex items-center gap-3 py-4 text-gray-700 hover:text-primary transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="text-base font-medium">Cart</span>
                    </Link>

                    <div className="py-6 space-y-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-2xl">
                            {selectedCountry.flag}
                          </span>
                          <span className="text-base font-medium text-gray-900">
                            {selectedLanguage.name} ({selectedCountry.code})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-base font-medium text-gray-900">
                          {selectedCountry.currency} -
                        </span>
                        <span className="text-base text-gray-600">
                          {selectedCountry.name === "Nigeria"
                            ? "Nigerian Naira"
                            : selectedCountry.name}
                        </span>
                      </div>
                    </div>

                    <div className="py-6 space-y-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-normal transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

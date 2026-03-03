"use client";

import { ArrowDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectDropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  icon?: any;
  placeholder?: string;
  className?: string;
}

const SelectDropdown = ({
  label,
  value,
  options,
  onChange,
  icon: Icon,
  className,
  placeholder,
}: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full">
      <div
        className={`border p-2 md:border-gray-400 border-white rounded-lg bg-white md:bg-transparent hover:border-primary transition-colors focus-within:ring-1 focus-within:ring-secondary focus-within:border-primary ${className}`}
      >
        <label className="block px-1 text-sm font-medium text-gray-800 mb-1">
          {label}
        </label>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-1 py-2 bg-transparent text-left outline-none"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {Icon && (
              <HugeiconsIcon
                icon={Icon}
                className="w-4 h-4 text-gray-500 shrink-0"
              />
            )}
            <span
              className={`text-sm truncate ${
                value ? "text-gray-900" : "text-gray-500"
              } ${className ? "text-white" : ""}`}
            >
              {selectedOption?.label || placeholder || `Select ${label}`}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <HugeiconsIcon
              icon={ArrowDown}
              className="w-4 h-4 text-gray-600 shrink-0"
            />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <div
              className="hidden md:block fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed md:absolute left-0 right-0 md:left-auto md:right-auto bottom-0 md:bottom-auto md:top-full md:mt-2 z-50 w-full md:w-auto md:min-w-[320px] bg-white rounded-t-2xl md:rounded-xl shadow-2xl border-t md:border border-gray-200 max-h-[70vh] md:max-h-96 overflow-hidden flex flex-col"
            >
              <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {options.length > 5 && (
                <div className="p-3 border-b border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      autoFocus
                    />
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <div className="overflow-y-auto flex-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleSelect(option.value)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0 ${
                        value === option.value ? "bg-primary/5" : ""
                      }`}
                    >
                      {Icon && (
                        <HugeiconsIcon
                          icon={Icon}
                          className={`w-4 h-4 shrink-0 ${
                            value === option.value
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm font-medium truncate ${
                            value === option.value
                              ? "text-primary"
                              : "text-gray-900"
                          }`}
                        >
                          {option.label}
                        </div>
                      </div>
                      {value === option.value && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 text-primary shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      )}
                    </motion.button>
                  ))
                ) : (
                  <div className="px-5 py-8 text-center text-gray-500">
                    <p className="text-sm">No options found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectDropdown;

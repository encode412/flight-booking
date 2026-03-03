"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ArrowDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface DropdownProps {
  options: { code: string; name: string; flag?: string; currency?: string }[];
  selected: string | React.ReactNode;
  onSelect: (option: {
    code: string;
    name: string;
    flag?: string;
    currency?: string;
  }) => void;
}

const Dropdown = ({ options, selected, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
      >
        <span className="font-medium text-gray-700">{selected}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <HugeiconsIcon icon={ArrowDown} className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-64 overflow-y-auto"
            >
              <motion.div variants={containerVariants}>
                {options.map((option, index) => (
                  <motion.button
                    key={option.code}
                    variants={optionVariants}
                    whileHover={{
                      backgroundColor: "rgba(243, 244, 246, 1)",
                      x: 4,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelect(option);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                  >
                    {option.flag && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.03 + 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="text-2xl"
                      >
                        {option.flag}
                      </motion.span>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {option.name}
                      </span>
                      {option.currency && (
                        <span className="text-xs text-gray-500">
                          {option.currency}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;

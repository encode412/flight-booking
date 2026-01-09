"use client";
import React from "react";
import { easeOut, motion } from "framer-motion";
import Image from "next/image";

import { whyEzziflyFeatures } from "@/constants";

const WhyEzzifly = () => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut
      },
    },
  };

  return (
    <section className="py-10 md:hidden block lg:px-16 bg-gray-50">
      <div className="wrapper">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xl font-semibold text-left mb-12"
        >
          Why Ezzifly
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {whyEzziflyFeatures.map((feature, index) => {
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl p-8 shadow-sm transition-shadow duration-300"
              >
                <motion.div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-20 h-20 flex items-center justify-center"
                  >
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={400}
                      height={400}
                      className="w-16 h-16 text-pink-500"
                    />
                  </motion.div>
                </motion.div>

                <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyEzzifly;

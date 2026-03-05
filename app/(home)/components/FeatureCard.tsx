"use client";

import { Feature } from "@/types/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      className="flex-1 min-w-70 p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-6 flex items-center justify-center">
          <HugeiconsIcon
            icon={Icon}
            className="w-12 h-12 text-primary"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;

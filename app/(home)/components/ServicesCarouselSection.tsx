"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

import NavigationButton from "./NavigationButton";
import ServiceCard from "./ServiceCard";
import { services } from "@/constants";

const ServicesCarouselSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemsPerView = 3;

  const headerRef = useRef(null);
  const carouselRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isCarouselInView = useInView(carouselRef, {
    once: true,
    margin: "-100px",
  });

  const handleNext = (): void => {
    setCurrentIndex((prev) => {
      if (prev >= services.length - itemsPerView) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrev = (): void => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return services.length - itemsPerView;
      }
      return prev - 1;
    });
  };

  return (
    <div className="py-14 md:py-24 pb-14">
      <div className="lg:px-16 wrapper">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-between items-start mb-8"
        >
          <div>
            <h2 className="text-2xl font-semibold text-black mb-2">Services</h2>
            <p className="text-[#1E1E1E]">
              Discover our various services available for you
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
            }
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex gap-3"
          >
            <NavigationButton direction="left" onClick={handlePrev} />
            <NavigationButton direction="right" onClick={handleNext} />
          </motion.div>
        </motion.div>

        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0, y: 40 }}
          animate={
            isCarouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
          }
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative overflow-hidden"
        >
          <motion.div
            className="flex gap-6"
            animate={{
              x: `-${currentIndex * (500 + 24)}px`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isCarouselInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.1,
                  ease: "easeOut",
                }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesCarouselSection;

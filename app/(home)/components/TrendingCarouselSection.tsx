"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import NavigationButton from "./NavigationButton";
import DestinationCard from "./DestinationCard";
import { destinations } from "@/constants";

const TrendingCarouselSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);
  const [cardWidth, setCardWidth] = useState<number>(0);

  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isCarouselInView = useInView(carouselRef, {
    once: true,
    margin: "-100px",
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }

      if (cardRef.current) {
        const card = cardRef.current;
        const cardRect = card.getBoundingClientRect();
        const gap = 24;
        setCardWidth(cardRect.width + gap);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const timer = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const handleNext = (): void => {
    setCurrentIndex((prev) => {
      if (prev >= destinations.length - itemsPerView) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrev = (): void => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return destinations.length - itemsPerView;
      }
      return prev - 1;
    });
  };

  return (
    <div className="bg-white py-10 md:py-14">
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
            <h2 className="text-2xl font-semibold text-black mb-2">
              Trending Destinations
            </h2>
            <p className="text-[#1E1E1E]">
              Find the hottest places travelers are exploring right now
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
              x: cardWidth ? `-${currentIndex * cardWidth}px` : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                ref={index === 0 ? cardRef : null}
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
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrendingCarouselSection;

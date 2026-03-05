"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { features } from "@/constants";
import FeatureCard from "./FeatureCard";
import { About, MobileAbout } from "@/assets";

const AboutSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });

  return (
    <section className="py-10 mdpy-14">
      <div className="lg:px-16 wrapper">
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isImageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="relative md:block hidden w-full h-[600px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              width={600}
              height={600}
              src={About}
              alt="Traveler with map overlooking ocean"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative md:hidden block w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              width={500}
              height={400}
              src={MobileAbout}
              alt="Traveler with map overlooking ocean"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            About Ezzilify
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Making Flight Booking Simple and Stress-Free
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Ezzilify is a modern flight booking platform designed to make
              travel easier, faster, and more affordable. We connect travelers
              with top airlines worldwide, giving you the power to search,
              compare, and book flights with just a few clicks. Our goal is
              simple — to help you reach your destination without the stress of
              complicated booking processes.
            </p>
            <p>
              Founded with a vision to transform how people travel, Ezzilify was
              built on the belief that booking a flight should be as effortless
              as choosing your destination. We leverage cutting-edge technology
              and smart design to give every traveler a smooth, transparent, and
              enjoyable experience.
            </p>
          </div>
          <button className="mt-6 text-accent font-semibold hover:text-red-600 transition-colors">
            Read More
          </button>
        </motion.div>

        <div className="md:flex hidden flex-wrap py-16 gap-6 justify-center">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

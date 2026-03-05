import { Service } from "@/types/card";
import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <motion.div
      className="relative w-125 shrink-0 h-62 rounded-2xl overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        width={800}
        height={500}
        src={service.image}
        alt={service.alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6">
        <h3 className="text-white font-bold text-xl tracking-wide">
          {service.title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

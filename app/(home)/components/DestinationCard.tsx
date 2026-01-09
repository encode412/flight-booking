import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface Destination {
  id: number;
  from: string;
  to: string;
  image: StaticImageData;
  alt: string;
}

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <motion.div
      className="relative w-80 shrink-0 cursor-pointer group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-87.5 rounded-2xl overflow-hidden mb-4 shadow-lg">
        <Image
          width={500}
          height={400}
          src={destination.image}
          alt={destination.alt}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-1">
        <h3 className="text-gray-900 font-bold text-lg">
          {destination.from} to {destination.to}
        </h3>
      </div>
    </motion.div>
  );
};

export default DestinationCard;

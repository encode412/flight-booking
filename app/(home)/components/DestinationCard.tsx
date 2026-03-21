import Link from "next/link";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import { getFlightBySlug } from "@/constants/flights";
import { formatNaira } from "@/lib/interswitch/format";

interface Destination {
  id: number;
  slug: string;
  image: StaticImageData;
  alt: string;
}

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const flight = getFlightBySlug(destination.slug);

  if (!flight) return null;

  const price = formatNaira(flight.totalMinor);

  return (
    <Link
      href={`/checkout?route=${encodeURIComponent(destination.slug)}`}
      aria-label={`Book ${flight.origin} to ${flight.destination}, ${price}`}
      className="block"
    >
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
            {flight.origin} to {flight.destination}
          </h3>
          <p className="text-red-500 font-semibold">{price}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default DestinationCard;

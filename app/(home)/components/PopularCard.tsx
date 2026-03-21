import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plane } from "@hugeicons/core-free-icons";

import { PopularRoute } from "@/types/card";
import { getFlightBySlug } from "@/constants/flights";
import { formatNaira } from "@/lib/interswitch/format";

interface PopularCardProps {
  route: PopularRoute;
}

const PopularCard: React.FC<PopularCardProps> = ({ route }) => {
  // Cities, trip type and fare all come from the catalogue so the price on
  // the card is literally the amount checkout charges.
  const flight = getFlightBySlug(route.slug);

  if (!flight) return null;

  const price = formatNaira(flight.totalMinor);

  return (
    <Link
      href={`/checkout?route=${encodeURIComponent(route.slug)}`}
      aria-label={`Book ${flight.origin} to ${flight.destination}, ${price}`}
      className="block"
    >
      <motion.div
        className="relative shrink-0 w-100 rounded-2xl overflow-hidden cursor-pointer group"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-80 w-full overflow-hidden">
          <Image
            width={500}
            height={400}
            src={route.image}
            alt={route.alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-900 font-semibold">{flight.origin}</span>
            <HugeiconsIcon
              icon={Plane}
              className="w-4 h-4 text-red-500 rotate-45"
            />
            <span className="text-gray-900 font-semibold">
              {flight.destination}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-red-500 font-semibold text-lg">{price}</span>
            <span className="text-gray-600 text-sm">{flight.tripType}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PopularCard;

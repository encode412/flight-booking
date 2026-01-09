import Image from "next/image";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plane } from "@hugeicons/core-free-icons";

import { PopularRoute } from "@/types/card";

interface PopularCardProps {
  route: PopularRoute;
}

const PopularCard: React.FC<PopularCardProps> = ({ route }) => {
  return (
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
          <span className="text-gray-900 font-semibold">{route.from}</span>
          <HugeiconsIcon
            icon={Plane}
            className="w-4 h-4 text-red-500 rotate-45"
          />
          <span className="text-gray-900 font-semibold">{route.to}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-red-500 font-semibold text-lg">{route.price}</span>
          <span className="text-gray-600 text-sm">{route.tripType}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularCard;

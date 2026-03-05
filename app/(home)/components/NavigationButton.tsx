import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
}) => {
  const Icon = direction === "left" ? ArrowLeft02Icon : ArrowRight02Icon;

  return (
    <motion.button
      onClick={onClick}
      className="w-12 h-12 relative z-50 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <HugeiconsIcon icon={Icon} className="w-6 h-6 text-gray-800" />
    </motion.button>
  );
};

export default NavigationButton;

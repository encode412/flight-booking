import { HugeiconsIcon } from "@hugeicons/react";

interface TabButtonProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ icon: Icon, label, active, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center cursor-pointer gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
      active
        ? "bg-primary text-white shadow-lg"
        : "text-white/90 hover:text-white hover:bg-white/10"
    }`}
  >
    <HugeiconsIcon icon={Icon} className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

export default TabButton;

"use client";

import { useState } from "react";
import { Cancel } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import DateInput from "@/components/DateInput";
import LocationInput from "@/components/LocationInput";

interface FlightLegProps {
  index: number;
  onRemove: () => void;
  showRemove: boolean;
}

const FlightLeg = ({ index, onRemove, showRemove }: FlightLegProps) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LocationInput
          label="From"
          value={from}
          onChange={setFrom}
          placeholder="Select"
        />
        <LocationInput
          label="To"
          value={to}
          onChange={setTo}
          placeholder="Select"
        />
        <DateInput label="Depart" value={depart} onChange={setDepart} />
      </div>
      {showRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-red-50 hover:border-red-500 transition-colors"
        >
          <HugeiconsIcon
            icon={Cancel}
            className="w-4 h-4 text-gray-600 hover:text-red-500"
          />
        </button>
      )}
    </div>
  );
};

export default FlightLeg;

"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Car,
  Hotel,
  MapPin,
  Plane,
  Plus,
  Search,
  Users,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import TabButton from "@/components/TabButton";
import FlightLeg from "./FlightLeg";
import SelectDropdown from "@/components/SelectDropdown";
import LocationInput from "@/components/LocationInput";
import DateInput from "@/components/DateInput";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [tripType, setTripType] = useState("Round Trip");
  const [travelClass, setTravelClass] = useState("Economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState("");
  const [flightLegs, setFlightLegs] = useState([1]);

  const tripTypes = [
    { value: "Round Trip", label: "Round Trip" },
    { value: "One Way", label: "One Way" },
    { value: "Multi Trip", label: "Multi Trip" },
  ];

  const travelClasses = [
    { value: "Economy", label: "Economy" },
    { value: "Premium Economy", label: "Premium Economy" },
    { value: "Business", label: "Business" },
    { value: "First Class", label: "First Class" },
  ];

  const travellerOptions = [
    { value: "1", label: "1 Traveller" },
    { value: "2", label: "2 Travellers" },
    { value: "3", label: "3 Travellers" },
    { value: "4", label: "4 Travellers" },
    { value: "5", label: "5+ Travellers" },
  ];

  const addFlightLeg = () => {
    setFlightLegs([...flightLegs, flightLegs.length + 1]);
  };

  const removeFlightLeg = (index: number) => {
    setFlightLegs(flightLegs.filter((_, i) => i !== index));
  };

  const renderContent = () => {
    if (
      activeTab === "hotels" ||
      activeTab === "cars" ||
      activeTab === "tours"
    ) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Coming Soon !!!!</h2>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="md:flex w-fit hidden gap-3 sm:gap-4">
          <div className="flex-1 sm:w-auto sm:min-w-[140px]">
            <SelectDropdown
              label=""
              value={tripType}
              options={tripTypes}
              onChange={setTripType}
            />
          </div>
          <div className="flex-1 sm:w-auto sm:min-w-[140px]">
            <SelectDropdown
              label=""
              value={travelClass}
              options={travelClasses}
              onChange={setTravelClass}
            />
          </div>
        </div>

        <div className="md:hidden flex gap-2">
          <div className="flex-1">
            <SelectDropdown
              className="bg-transparent!"
              label=""
              value={tripType}
              options={tripTypes}
              onChange={setTripType}
            />
          </div>
          <div className="flex-1 sm:w-fit">
            <SelectDropdown
              className="bg-transparent!"
              label=""
              value={travelClass}
              options={travelClasses}
              onChange={setTravelClass}
            />
          </div>
        </div>

        {tripType !== "Multi Trip" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
            {tripType === "Round Trip" && (
              <DateInput
                label="Return"
                value={returnDate}
                onChange={setReturnDate}
              />
            )}
            <SelectDropdown
              label="Travellers"
              value={travellers}
              options={travellerOptions}
              onChange={setTravellers}
              icon={Users}
            />
            {tripType === "Round Trip" && (
              <div className="md:flex md:items-end">
                <button className="w-full h-[56px] md:h-[50px] bg-primary text-white rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center text-lg md:text-base">
                  <span className="md:hidden">Search</span>
                  <HugeiconsIcon
                    icon={Search}
                    className="w-5 h-5 hidden md:block"
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {tripType === "One Way" && (
          <div className="flex justify-center">
            <button className="px-8 py-3 bg-primary text-white rounded-lg cursor-pointer transition-colors flex items-center gap-2 font-medium">
              <HugeiconsIcon icon={Search} className="w-5 h-5" />
              Search Flights
            </button>
          </div>
        )}

        {tripType === "Multi Trip" && (
          <div className="space-y-6">
            {flightLegs.map((leg, index) => (
              <FlightLeg
                key={leg}
                index={index}
                onRemove={() => removeFlightLeg(index)}
                showRemove={flightLegs.length > 1}
              />
            ))}

            <button
              onClick={addFlightLeg}
              className="flex items-center gap-2 text-primary hover:text-blue-800 font-medium transition-colors"
            >
              <HugeiconsIcon icon={Plus} className="w-5 h-5" />
              Add Flight
            </button>

            <div className="flex justify-center">
              <button className="w-full md:w-auto px-12 py-4 bg-primary text-white rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-2 font-medium text-lg">
                <HugeiconsIcon icon={Search} className="w-6 h-6" />
                Search Flights
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-150 ">
      <Image
        src="/images/hero-bg.webp"
        alt="Hero Background"
        fill
        className="object-cover md:block hidden object-center absolute inset-0"
      />
      <Image
        src="/images/mobile-hero-bg.webp"
        alt="Hero Background"
        fill
        className="object-cover md:hidden block object-center absolute inset-0"
      />
      <div className="absolute inset-0 md:bg-linear-to-b bg-linear-to-t from-black/60 via-black/50 to-black/70 md:from-black/80 md:via-black/60 md:to-black/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="text-center mb-12 md:block hidden">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4">
            Fly Smart. Travel Easier
          </h1>
          <p className="text-lg md:text-xl font-light text-[#C3C3C3] max-w-3xl mx-auto">
            Book reliable flights in seconds and move with confidence anywhere
            you go
          </p>
        </div>

        <div className="mb-6 md:hidden block">
          <h1 className="text-3xl font-extrabold text-white text-center">
            Travel Safe with us and Enjoy Seamless Movement
          </h1>
        </div>

        <div className="hidden md:flex justify-center mb-8">
          <div className="inline-flex bg-white/5 backdrop-blur-xs p-2 rounded-full gap-2">
            <TabButton
              icon={Plane}
              label="Flights"
              active={activeTab === "flights"}
              onClick={() => setActiveTab("flights")}
            />
            <TabButton
              icon={Hotel}
              label="Hotels"
              active={activeTab === "hotels"}
              onClick={() => setActiveTab("hotels")}
            />
            <TabButton
              icon={Car}
              label="Cars"
              active={activeTab === "cars"}
              onClick={() => setActiveTab("cars")}
            />
            <TabButton
              icon={MapPin}
              label="Tours"
              active={activeTab === "tours"}
              onClick={() => setActiveTab("tours")}
            />
          </div>
        </div>

        <div
          className={`rounded-2xl md:shadow-2xl p-4 sm:p-6 md:p-8 ${
            activeTab === "hotels" ||
            activeTab === "cars" ||
            activeTab === "tours"
              ? "bg-transparent text-white md:cursor-not-allowed"
              : "md:bg-white"
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

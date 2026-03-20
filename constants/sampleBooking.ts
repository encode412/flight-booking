import type { SampleBooking } from "@/types/payment";

/**
 * Standalone demo itinerary for the checkout page.
 * Amounts are in kobo (minor units) — `totalMinor` is what gets charged.
 */
export const sampleBooking: SampleBooking = {
  reference: "EZZ-DEMO-2026",
  airline: "Emirates",
  flightNumber: "EK 783",
  origin: "Lagos",
  originCode: "LOS",
  destination: "Dubai",
  destinationCode: "DXB",
  departureDate: "2026-12-18",
  departureTime: "16:45",
  arrivalDate: "2026-12-18",
  arrivalTime: "23:55",
  duration: "7h 10m",
  cabin: "Economy",
  tripType: "Round Trip",
  passengers: 1,
  baseFareMinor: 115_000_000,
  taxesMinor: 8_650_000,
  totalMinor: 123_650_000,
};

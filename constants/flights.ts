import type { BookableFlight } from "@/types/flight";

/**
 * Bookable flight inventory.
 *
 * This is the single source of truth for fares: the home-page cards render
 * their price from `totalMinor`, and checkout charges `totalMinor` to
 * Interswitch. Amounts are in kobo (minor units).
 *
 * `baseFareMinor + taxesMinor` always equals `totalMinor` — the checkout
 * displays all three, so they must add up.
 *
 * The previous display prices (`"₦2,500,00"`, `"₦1,900,00"`, …) were
 * malformed one digit short of a whole million; they are restored here as
 * ₦2,500,000 / ₦1,900,000 / ₦1,000,000 / ₦1,500,000.
 */
export const flights: BookableFlight[] = [
  {
    slug: "lagos-london",
    reference: "EZZ-LON-2026",
    airline: "British Airways",
    flightNumber: "BA 75",
    origin: "Lagos",
    originCode: "LOS",
    destination: "London",
    destinationCode: "LHR",
    departureDate: "2026-12-18",
    departureTime: "23:20",
    arrivalDate: "2026-12-19",
    arrivalTime: "05:50",
    duration: "6h 30m",
    cabin: "Economy",
    tripType: "Round Trip",
    passengers: 1,
    baseFareMinor: 232_500_000,
    taxesMinor: 17_500_000,
    totalMinor: 250_000_000,
  },
  {
    slug: "abuja-dubai",
    reference: "EZZ-DXB-2026",
    airline: "Emirates",
    flightNumber: "EK 713",
    origin: "Abuja",
    originCode: "ABV",
    destination: "Dubai",
    destinationCode: "DXB",
    departureDate: "2026-12-20",
    departureTime: "21:30",
    arrivalDate: "2026-12-21",
    arrivalTime: "04:20",
    duration: "6h 50m",
    cabin: "Economy",
    tripType: "One Way",
    passengers: 1,
    baseFareMinor: 177_000_000,
    taxesMinor: 13_000_000,
    totalMinor: 190_000_000,
  },
  {
    slug: "accra-paris",
    reference: "EZZ-PAR-2026",
    airline: "Air France",
    flightNumber: "AF 867",
    origin: "Accra",
    originCode: "ACC",
    destination: "Paris",
    destinationCode: "CDG",
    departureDate: "2026-12-22",
    departureTime: "13:00",
    arrivalDate: "2026-12-22",
    arrivalTime: "19:30",
    duration: "6h 30m",
    cabin: "Economy",
    tripType: "One Way",
    passengers: 1,
    baseFareMinor: 93_000_000,
    taxesMinor: 7_000_000,
    totalMinor: 100_000_000,
  },
  {
    slug: "kogi-canada",
    reference: "EZZ-YTZ-2026",
    airline: "Air Canada",
    flightNumber: "AC 87",
    origin: "Kogi",
    originCode: "KGI",
    destination: "Canada",
    destinationCode: "YYZ",
    departureDate: "2026-12-19",
    departureTime: "08:00",
    arrivalDate: "2026-12-19",
    arrivalTime: "22:40",
    duration: "14h 40m",
    cabin: "Economy",
    tripType: "Round Trip",
    passengers: 1,
    baseFareMinor: 139_500_000,
    taxesMinor: 10_500_000,
    totalMinor: 150_000_000,
  },
  {
    slug: "rome-germany",
    reference: "EZZ-FRA-2026",
    airline: "Lufthansa",
    flightNumber: "LH 233",
    origin: "Rome",
    originCode: "FCO",
    destination: "Germany",
    destinationCode: "FRA",
    departureDate: "2026-12-23",
    departureTime: "16:45",
    arrivalDate: "2026-12-23",
    arrivalTime: "18:50",
    duration: "2h 05m",
    cabin: "Economy",
    tripType: "One Way",
    passengers: 1,
    baseFareMinor: 116_000_000,
    taxesMinor: 9_000_000,
    totalMinor: 125_000_000,
  },
  {
    slug: "mumbai-rome",
    reference: "EZZ-FCO-2026",
    airline: "Emirates",
    flightNumber: "EK 501",
    origin: "Mumbai",
    originCode: "BOM",
    destination: "Rome",
    destinationCode: "FCO",
    departureDate: "2026-12-21",
    departureTime: "20:45",
    arrivalDate: "2026-12-22",
    arrivalTime: "11:05",
    duration: "14h 20m",
    cabin: "Economy",
    tripType: "One Way",
    passengers: 1,
    baseFareMinor: 163_000_000,
    taxesMinor: 12_000_000,
    totalMinor: 175_000_000,
  },
];

const flightsBySlug = new Map<string, BookableFlight>(
  flights.map((flight) => [flight.slug, flight])
);

/**
 * Looks up a bookable flight by its `/checkout?route=` key.
 * Returns `undefined` for a missing or malformed slug.
 */
export function getFlightBySlug(
  slug: string | null | undefined
): BookableFlight | undefined {
  if (!slug) return undefined;
  return flightsBySlug.get(slug);
}

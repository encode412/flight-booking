/**
 * Formats an amount in kobo (minor units) as Nigerian Naira.
 * `₦1,236,500.00` for `123650000`.
 */
export function formatNaira(minorUnits: number): string {
  const major = minorUnits / 100;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(major);
}

/**
 * Formats an ISO date (`2026-12-18`) as `Fri, 18 Dec 2026`.
 * Pinned to UTC so the itinerary never shifts a day across timezones.
 */
export function formatFlightDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

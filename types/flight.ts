import type { SampleBooking } from "./payment";

/**
 * A flight a user can pick on the home page and pay for at checkout.
 *
 * It is just a `SampleBooking` with a stable key, so the itinerary shown on
 * the card and the amount charged by Interswitch always come from the same
 * object — a card can never advertise one fare and charge another.
 */
export interface BookableFlight extends SampleBooking {
  /** Stable key used in `/checkout?route=<slug>`. */
  slug: string;
}

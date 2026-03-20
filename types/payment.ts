/**
 * Types for the Interswitch Web Checkout (sandbox) payment integration.
 */

/** Interswitch environment the integration is pointed at. */
export type InterswitchMode = "TEST" | "LIVE";

/** A single bookable itinerary used by the standalone checkout page. */
export interface SampleBooking {
  reference: string;
  airline: string;
  flightNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  duration: string;
  cabin: string;
  tripType: string;
  passengers: number;
  /** Base fare in kobo (minor units). */
  baseFareMinor: number;
  /** Taxes and carrier charges in kobo (minor units). */
  taxesMinor: number;
  /** Amount actually charged, in kobo (minor units). */
  totalMinor: number;
}

/** Public payment configuration handed from the server page to the client form. */
export interface CheckoutClientProps {
  cashierUrl: string;
  merchantCode: string;
  payItemId: string;
  currencyCode: string;
  mode: InterswitchMode;
  /** Absolute URL Interswitch redirects the browser back to. */
  redirectUrl: string;
  booking: SampleBooking;
}

/** Query params Interswitch appends to `site_redirect_url` when `payment_response_type=GET`. */
export interface PaymentRedirectPayload {
  txnref: string | null;
  amount: string | null;
  resp: string | null;
  desc: string | null;
}

/** Body posted to `/api/interswitch/verify`. */
export interface VerifyRequest {
  txnRef: string;
  /** Expected amount in kobo (minor units). */
  amount: number;
}

/**
 * Raw payload returned by
 * `GET /collections/api/v1/gettransaction.json`.
 * Interswitch uses PascalCase keys on this endpoint.
 */
export interface TransactionVerificationResponse {
  Amount?: number;
  CardNumber?: string;
  MerchantReference?: string;
  PaymentReference?: string;
  RetrievalReferenceNumber?: string;
  TransactionDate?: string;
  ResponseCode?: string;
  ResponseDescription?: string;
  AccountNumber?: string;
  SplitAccounts?: unknown[];
}

/** Normalised verification result returned to the browser. */
export interface VerificationResult {
  success: boolean;
  responseCode: string;
  responseDescription: string;
  /** Amount we expected to be charged, in kobo. */
  expectedAmountMinor: number;
  /** Amount Interswitch reports as paid, in kobo. */
  paidAmountMinor: number | null;
  amountMatches: boolean;
  retrievalReferenceNumber: string;
  paymentReference: string;
  merchantReference: string;
  transactionDate: string;
}

/** Successful or failed response from `/api/interswitch/verify`. */
export type VerifyApiResponse = VerificationResult | { error: string };

/**
 * Interswitch Web Checkout configuration.
 *
 * Defaults to the public sandbox credentials so the integration works with
 * zero setup; every value can be overridden through environment variables.
 *
 * Public (not secret) by design: `merchantCode` and `payItemId` are posted
 * from the browser as part of the official Web Redirect flow, so they are
 * exposed with the `NEXT_PUBLIC_` prefix. Nothing secret is required for
 * this integration path — the transaction requery is unauthenticated.
 */

import type { InterswitchMode } from "@/types/payment";

/** Sandbox cashier — change to the LIVE host when going to production. */
const CASHIER_BASE = {
  TEST: "https://newwebpay-sandbox.interswitchng.com",
  LIVE: "https://newwebpay.interswitchng.com",
} as const;

/** Sandbox API host used for the server-side transaction requery. */
const API_BASE = {
  TEST: "https://sandbox.interswitchng.com",
  LIVE: "https://webpay.interswitchng.com",
} as const;

/** Shared sandbox credentials published in the Interswitch quickstart. */
const SANDBOX_MERCHANT_CODE = "MX6072";
const SANDBOX_PAY_ITEM_ID = "9405967";

/** ISO 4217 numeric code for Nigerian Naira. */
export const NGN_CURRENCY_CODE = "566";

/**
 * Mode is `LIVE` only when explicitly set to `LIVE` — anything else
 * (unset, typo, TEST) stays safely on the sandbox.
 */
export const interswitchMode: InterswitchMode =
  (process.env.NEXT_PUBLIC_INTERSWITCH_MODE ?? "").toUpperCase() === "LIVE"
    ? "LIVE"
    : "TEST";

export const interswitchConfig = {
  mode: interswitchMode,
  isSandbox: interswitchMode === "TEST",
  merchantCode:
    process.env.NEXT_PUBLIC_INTERSWITCH_MERCHANT_CODE || SANDBOX_MERCHANT_CODE,
  payItemId:
    process.env.NEXT_PUBLIC_INTERSWITCH_PAY_ITEM_ID || SANDBOX_PAY_ITEM_ID,
  currencyCode: NGN_CURRENCY_CODE,
  /** Form action the browser POSTs the payment request to. */
  cashierUrl: `${CASHIER_BASE[interswitchMode]}/collections/w/pay`,
  /** Base URL for server-side API calls (transaction requery). */
  apiBaseUrl: API_BASE[interswitchMode],
  /** Server-side requery endpoint used to confirm the transaction. */
  getTransactionPath: "/collections/api/v1/gettransaction.json",
} as const;

/**
 * Resolves the absolute origin of this app so `site_redirect_url` is always
 * a full URL, as required by Web Checkout.
 *
 * Uses `NEXT_PUBLIC_APP_URL` when set (recommended in production), otherwise
 * falls back to the forwarded request host, then to localhost.
 */
export async function resolveAppUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_APP_URL;
  if (configured) return configured.replace(/\/+$/, "");

  const { headers } = await import("next/headers");
  const h = await headers();

  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");

  return `${proto}://${host}`.replace(/\/+$/, "");
}

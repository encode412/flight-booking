import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { interswitchConfig, resolveAppUrl } from "@/lib/interswitch/config";
import { sampleBooking } from "@/constants/sampleBooking";
import { getFlightBySlug } from "@/constants/flights";
import CheckoutClient from "./components/CheckoutClient";

interface CheckoutPageProps {
  searchParams: Promise<{ route?: string | string[] }>;
}

/** Reads `/checkout?route=<slug>`, tolerating a repeated param. */
function readSlug(raw: string | string[] | undefined): string | undefined {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const slug = value?.trim();
  return slug ? slug : undefined;
}

export async function generateMetadata({
  searchParams,
}: CheckoutPageProps): Promise<Metadata> {
  const flight = getFlightBySlug(readSlug((await searchParams).route));

  if (!flight) {
    return {
      title: "Checkout | Ezzifly",
      description:
        "Review your itinerary and pay securely with Interswitch Web Checkout.",
    };
  }

  return {
    title: `${flight.origin} to ${flight.destination} | Ezzifly`,
    description: `Book ${flight.airline} ${flight.flightNumber} from ${flight.origin} to ${flight.destination} and pay securely with Interswitch Web Checkout.`,
  };
}

/**
 * Server component: resolves the selected flight (or the demo itinerary when
 * no `?route=` is given) alongside the public payment configuration and the
 * absolute redirect URL, then hands them to the client checkout form.
 * Nothing secret is exposed here — Web Redirect does not require it.
 */
export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const slug = readSlug((await searchParams).route);
  const flight = getFlightBySlug(slug);

  // A bad ?route= is a broken link: 404 instead of quietly charging for a
  // different flight than the one the user clicked.
  if (slug && !flight) notFound();

  const booking = flight ?? sampleBooking;
  const appUrl = await resolveAppUrl();

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        <CheckoutClient
          cashierUrl={interswitchConfig.cashierUrl}
          merchantCode={interswitchConfig.merchantCode}
          payItemId={interswitchConfig.payItemId}
          currencyCode={interswitchConfig.currencyCode}
          mode={interswitchConfig.mode}
          redirectUrl={`${appUrl}/payment/response`}
          booking={booking}
        />
      </main>

      <Footer />
    </>
  );
}

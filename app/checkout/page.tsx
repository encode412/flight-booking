import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { interswitchConfig, resolveAppUrl } from "@/lib/interswitch/config";
import { sampleBooking } from "@/constants/sampleBooking";
import CheckoutClient from "./components/CheckoutClient";

export const metadata = {
  title: "Checkout | Ezzifly",
  description:
    "Review your itinerary and pay securely with Interswitch Web Checkout.",
};

/**
 * Server component: resolves the public payment configuration and the
 * absolute redirect URL, then hands them to the client checkout form.
 * Nothing secret is exposed here — Web Redirect does not require it.
 */
export default async function CheckoutPage() {
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
          booking={sampleBooking}
        />
      </main>

      <Footer />
    </>
  );
}

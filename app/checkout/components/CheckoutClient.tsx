"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock, CreditCard, Lock, MapPin, Plane, Users } from "@hugeicons/core-free-icons";

import Button from "@/components/Button";
import { formatFlightDate, formatNaira } from "@/lib/interswitch/format";
import type { CheckoutClientProps } from "@/types/payment";

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputStyles =
  "w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary";

const labelStyles = "block text-sm font-semibold text-gray-900 mb-2";

/**
 * Builds a unique merchant transaction reference for this payment attempt.
 * Interswitch requires `txn_ref` to be unique per transaction.
 */
function createTransactionReference(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `EZZ${Date.now()}${random}`;
}

const CheckoutClient = ({
  cashierUrl,
  merchantCode,
  payItemId,
  currencyCode,
  mode,
  redirectUrl,
  booking,
}: CheckoutClientProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  /**
   * Once set, the hidden cashier form renders and auto-submits, POSTing the
   * payment request straight to the Interswitch sandbox cashier.
   */
  const [paymentRequest, setPaymentRequest] = useState<
    Record<string, string> | null
  >(null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (paymentRequest && formRef.current) {
      formRef.current.submit();
    }
  }, [paymentRequest]);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    if (!firstName.trim()) next.firstName = "First name is required";
    if (!lastName.trim()) next.lastName = "Last name is required";

    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "Enter a valid email address";
    }

    const digits = phone.replace(/\D/g, "");
    if (!digits) {
      next.phone = "Phone number is required";
    } else if (digits.length < 7) {
      next.phone = "Enter a valid phone number";
    }

    return next;
  };

  const handlePay = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    setPaymentRequest({
      merchant_code: merchantCode,
      pay_item_id: payItemId,
      txn_ref: createTransactionReference(),
      amount: String(booking.totalMinor),
      currency: currencyCode,
      cust_name: fullName,
      cust_email: email.trim(),
      cust_id: email.trim(),
      pay_item_name: `Ezzifly ${booking.origin} to ${booking.destination}`,
      site_redirect_url: redirectUrl,
      // GET puts the result in query params so the confirmation page can read it.
      payment_response_type: "GET",
    });
  };

  const isRedirecting = paymentRequest !== null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Checkout
        </h1>
        {mode === "TEST" && (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
            Sandbox
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* ---------------------------- Passenger details ---------------------------- */}
        <form
          onSubmit={handlePay}
          noValidate
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <HugeiconsIcon icon={Users} className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">
              Passenger &amp; contact details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className={labelStyles}>
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputStyles}
              />
              {errors.firstName && (
                <p className="text-xs text-accent mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className={labelStyles}>
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputStyles}
              />
              {errors.lastName && (
                <p className="text-xs text-accent mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="email" className={labelStyles}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyles}
              />
              {errors.email && (
                <p className="text-xs text-accent mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelStyles}>
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="0801 234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputStyles}
              />
              {errors.phone && (
                <p className="text-xs text-accent mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-6">
            <p className="text-xs text-gray-500 leading-relaxed">
              Payment is processed by <strong>Interswitch</strong> on their
              secure sandbox cashier. Ezzifly never sees or stores your card
              details. You will be redirected back here automatically once the
              payment attempt completes.
            </p>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isRedirecting}>
            <span className="inline-flex items-center justify-center gap-2">
              <HugeiconsIcon icon={Lock} className="w-4 h-4" />
              Pay {formatNaira(booking.totalMinor)}
            </span>
          </Button>
        </form>

        {/* ------------------------------ Fare summary ------------------------------ */}
        <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 mb-5">
            <HugeiconsIcon icon={Plane} className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">
              Your itinerary
            </h2>
          </div>

          <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <p className="text-xl font-bold text-gray-900">
                {booking.originCode}
              </p>
              <p className="text-sm text-gray-600">{booking.origin}</p>
              <p className="text-sm text-gray-900 font-medium mt-1">
                {booking.departureTime}
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1 pt-1">
              <span className="text-xs text-gray-500">{booking.duration}</span>
              <div className="w-full border-t border-dashed border-gray-300 relative">
                <HugeiconsIcon
                  icon={Plane}
                  className="w-4 h-4 text-primary absolute -top-2 left-1/2 -translate-x-1/2 bg-white"
                />
              </div>
              <span className="text-xs text-gray-500">{booking.tripType}</span>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">
                {booking.destinationCode}
              </p>
              <p className="text-sm text-gray-600">{booking.destination}</p>
              <p className="text-sm text-gray-900 font-medium mt-1">
                {booking.arrivalTime}
              </p>
            </div>
          </div>

          <ul className="py-4 space-y-3 text-sm border-b border-gray-100">
            <li className="flex items-center gap-2 text-gray-700">
              <HugeiconsIcon icon={Clock} className="w-4 h-4 text-gray-400" />
              {formatFlightDate(booking.departureDate)}
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <HugeiconsIcon icon={MapPin} className="w-4 h-4 text-gray-400" />
              {booking.airline} · {booking.flightNumber}
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <HugeiconsIcon icon={Users} className="w-4 h-4 text-gray-400" />
              {booking.passengers} passenger · {booking.cabin}
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <HugeiconsIcon
                icon={CreditCard}
                className="w-4 h-4 text-gray-400"
              />
              Booking ref {booking.reference}
            </li>
          </ul>

          <dl className="pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Base fare</dt>
              <dd className="text-gray-900 font-medium">
                {formatNaira(booking.baseFareMinor)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Taxes &amp; carrier charges</dt>
              <dd className="text-gray-900 font-medium">
                {formatNaira(booking.taxesMinor)}
              </dd>
            </div>
            <div className="flex justify-between pt-3 mt-1 border-t border-gray-100">
              <dt className="text-base font-semibold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-primary">
                {formatNaira(booking.totalMinor)}
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-xs text-gray-500">
            Charged in Nigerian Naira (NGN). Amount sent to Interswitch:{" "}
            <span className="font-mono">{booking.totalMinor}</span> kobo.
          </p>
        </aside>
      </div>

      {/* --------------------- Auto-submitting cashier redirect form --------------------- */}
      {paymentRequest && (
        <form
          ref={formRef}
          method="post"
          action={cashierUrl}
          className="hidden"
          aria-hidden="true"
        >
          {Object.entries(paymentRequest).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <input type="submit" value="Continue to secure payment" />
        </form>
      )}

      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
            >
              <div className="mx-auto mb-4 w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Redirecting to payment
              </h3>
              <p className="text-sm text-gray-600">
                Taking you to the Interswitch secure cashier to complete your
                payment.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutClient;

"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { formatNaira } from "@/lib/interswitch/format";
import type { VerificationResult, VerifyApiResponse } from "@/types/payment";

type Status = "loading" | "success" | "failed" | "error" | "incomplete";

interface ResultState {
  status: Status;
  result?: VerificationResult;
  message?: string;
}

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CrossIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const formatTimestamp = (value: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

/**
 * Reads the redirect from the Interswitch cashier and performs the
 * authoritative server-side requery. The `resp` query param returned by the
 * gateway is deliberately NOT trusted — only `/api/interswitch/verify` decides
 * the outcome.
 */
const PaymentResult = () => {
  const searchParams = useSearchParams();

  const txnRef = searchParams.get("txnref");
  const amountParam = searchParams.get("amount");
  const gatewayResp = searchParams.get("resp");
  const gatewayDesc = searchParams.get("desc");

  const amountMinor = Number(amountParam);

  const [state, setState] = useState<ResultState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  const runVerification = useCallback(async () => {
    setState({ status: "loading" });

    try {
      const response = await fetch("/api/interswitch/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txnRef, amount: amountMinor }),
      });

      const data = (await response.json()) as VerifyApiResponse;

      if (!response.ok || "error" in data) {
        setState({
          status: "error",
          message:
            "error" in data
              ? data.error
              : "Unable to confirm the transaction with Interswitch.",
        });
        return;
      }

      setState({
        status: data.success ? "success" : "failed",
        result: data,
      });
    } catch {
      setState({
        status: "error",
        message: "Something went wrong while confirming your payment.",
      });
    }
  }, [txnRef, amountMinor]);

  useEffect(() => {
    if (!txnRef || !Number.isInteger(amountMinor) || amountMinor <= 0) {
      setState({ status: "incomplete" });
      return;
    }

    void runVerification();
  }, [txnRef, amountMinor, runVerification, attempt]);

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {state.status === "loading" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
            <div className="mx-auto mb-5 w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <h1 className="text-lg font-semibold text-gray-900 mb-2">
              Confirming your payment
            </h1>
            <p className="text-sm text-gray-600">
              Verifying transaction{" "}
              <span className="font-mono break-all">{txnRef}</span> directly
              with Interswitch. Do not close this page.
            </p>
          </div>
        )}

        {state.status === "incomplete" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              <CrossIcon />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Missing payment details
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              We could not find a transaction reference in the redirect. If you
              were sent here by mistake, start your booking again.
            </p>
            <Link href="/checkout">
              <Button variant="primary" size="md">
                Back to checkout
              </Button>
            </Link>
          </div>
        )}

        {state.status === "success" && state.result && (
          <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-10 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckIcon />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Payment confirmed
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Interswitch approved this transaction and the amount matches what
              we charged. Your booking is confirmed.
            </p>

            <dl className="text-left bg-gray-50 rounded-xl p-4 space-y-3 text-sm mb-6">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Amount paid</dt>
                <dd className="font-semibold text-gray-900">
                  {formatNaira(
                    state.result.paidAmountMinor ??
                      state.result.expectedAmountMinor
                  )}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Retrieval reference</dt>
                <dd className="font-mono text-gray-900 break-all text-right">
                  {state.result.retrievalReferenceNumber || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Payment reference</dt>
                <dd className="font-mono text-gray-900 break-all text-right">
                  {state.result.paymentReference || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Transaction date</dt>
                <dd className="text-gray-900">
                  {formatTimestamp(state.result.transactionDate)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Transaction ref</dt>
                <dd className="font-mono text-gray-900 break-all text-right">
                  {state.result.merchantReference || txnRef}
                </dd>
              </div>
            </dl>

            <Link href="/">
              <Button variant="primary" size="md" fullWidth>
                Back to home
              </Button>
            </Link>
          </div>
        )}

        {state.status === "failed" && state.result && (
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-10 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-accent">
              <CrossIcon />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Payment not completed
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              {state.result.responseDescription ||
                "Interswitch did not approve this transaction."}
            </p>

            {!state.result.amountMatches && state.result.paidAmountMinor !== null && (
              <p className="text-sm text-accent bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
                Amount mismatch: expected{" "}
                {formatNaira(state.result.expectedAmountMinor)} but Interswitch
                reported {formatNaira(state.result.paidAmountMinor)}. Value was
                not delivered.
              </p>
            )}

            <p className="text-xs text-gray-500 mb-6">
              Response code{" "}
              <span className="font-mono">{state.result.responseCode || "—"}</span>
              {gatewayDesc ? ` · ${gatewayDesc}` : ""}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/checkout">
                <Button variant="primary" size="md">
                  Try again
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="md">
                  Back to home
                </Button>
              </Link>
            </div>
          </div>
        )}

        {state.status === "error" && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-10 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <CrossIcon />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Could not confirm payment
            </h1>
            <p className="text-sm text-gray-600 mb-2">{state.message}</p>
            <p className="text-xs text-gray-500 mb-6">
              We never rely on the browser redirect alone — this check must
              succeed before your booking is confirmed. Please retry.
              {gatewayResp ? ` (gateway reported ${gatewayResp})` : ""}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                size="md"
                onClick={() => setAttempt((n) => n + 1)}
              >
                Retry verification
              </Button>
              <Link href="/checkout">
                <Button variant="ghost" size="md">
                  Back to checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const PaymentResponsePage = () => (
  <>
    <Navbar />
    <Suspense
      fallback={
        <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-16">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <PaymentResult />
    </Suspense>
    <Footer />
  </>
);

export default PaymentResponsePage;

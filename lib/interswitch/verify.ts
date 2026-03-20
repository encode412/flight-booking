import { interswitchConfig } from "./config";
import type {
  TransactionVerificationResponse,
  VerificationResult,
} from "@/types/payment";

/**
 * Confirms a transaction with Interswitch before value is delivered.
 *
 * This MUST run server-side: the browser redirect payload (`resp`) is
 * untrusted and can be forged, so it is never used to decide the outcome.
 *
 * Two checks are required, per the Interswitch docs:
 *   1. `ResponseCode === "00"` (approved)
 *   2. the returned `Amount` equals the amount we intended to charge
 *
 * @param txnRef       The merchant transaction reference (`txn_ref`).
 * @param amountMinor  The amount we intended to charge, in kobo.
 * @throws Error when the requery itself fails (network / non-2xx response).
 */
export async function verifyTransaction(
  txnRef: string,
  amountMinor: number
): Promise<VerificationResult> {
  const url = new URL(
    interswitchConfig.getTransactionPath,
    interswitchConfig.apiBaseUrl
  );

  url.searchParams.set("merchantcode", interswitchConfig.merchantCode);
  url.searchParams.set("transactionreference", txnRef);
  url.searchParams.set("amount", String(amountMinor));

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Interswitch requery failed with status ${response.status}`
    );
  }

  const data = (await response.json()) as TransactionVerificationResponse;

  const responseCode = data.ResponseCode ?? "";
  const paidAmountMinor =
    typeof data.Amount === "number" && Number.isFinite(data.Amount)
      ? data.Amount
      : null;

  const amountMatches = paidAmountMinor === amountMinor;

  return {
    success: responseCode === "00" && amountMatches,
    responseCode,
    responseDescription: data.ResponseDescription ?? "",
    expectedAmountMinor: amountMinor,
    paidAmountMinor,
    amountMatches,
    retrievalReferenceNumber: data.RetrievalReferenceNumber ?? "",
    paymentReference: data.PaymentReference ?? "",
    merchantReference: data.MerchantReference ?? "",
    transactionDate: data.TransactionDate ?? "",
  };
}

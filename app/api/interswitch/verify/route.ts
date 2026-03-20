import { NextResponse } from "next/server";

import { verifyTransaction } from "@/lib/interswitch/verify";
import type { VerifyRequest } from "@/types/payment";

export const runtime = "nodejs";

/**
 * Server-side transaction requery.
 *
 * The browser is redirected back from the Interswitch cashier with an
 * untrusted `resp` code. This route performs the authoritative check
 * (`ResponseCode === "00"` AND amount match) against the Interswitch API,
 * so the client never decides whether payment succeeded.
 *
 * NOTE: because this app has no persistence, the expected amount is supplied
 * by the caller. A production integration should store the initiated
 * transaction server-side (or use Interswitch webhooks) instead of trusting
 * the client-supplied amount.
 */
export async function POST(request: Request) {
  let body: Partial<VerifyRequest>;

  try {
    body = (await request.json()) as Partial<VerifyRequest>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const txnRef = typeof body.txnRef === "string" ? body.txnRef.trim() : "";
  const amountMinor =
    typeof body.amount === "number" ? body.amount : Number(body.amount);

  if (!txnRef) {
    return NextResponse.json(
      { error: "txnRef is required" },
      { status: 400 }
    );
  }

  if (!Number.isInteger(amountMinor) || amountMinor <= 0) {
    return NextResponse.json(
      { error: "amount must be a positive integer in kobo" },
      { status: 400 }
    );
  }

  try {
    const result = await verifyTransaction(txnRef, amountMinor);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[interswitch] requery failed:", error);
    return NextResponse.json(
      { error: "Unable to confirm the transaction with Interswitch" },
      { status: 502 }
    );
  }
}

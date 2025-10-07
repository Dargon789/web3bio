import { NextRequest, NextResponse } from "next/server";
import { gitcoinPassportMapping } from "@/components/utils/gitcoin";
import BigNumber from "bignumber.js";
import {
  isValidEthereumAddress,
  respondWithCache,
} from "@/components/utils/utils";

const GITCOIN_PASSPORT_API_END_POINT = "https://api.scorer.gitcoin.co";
const API_KEY = process.env.NEXT_PUBLIC_GITCOIN_API_KEY || "";

interface StampResponse {
  score: number;
  updatedAt: Date;
  stamps: any[];
}

async function fetchStamps(address: string): Promise<string[]> {
  const url = new URL(
    `${GITCOIN_PASSPORT_API_END_POINT}/registry/stamps/${address}`
  );
  url.searchParams.append("limit", "1000");
  url.searchParams.append("include_metadata", "false");
  const res = await fetch(url, {
    headers: { "x-api-key": API_KEY },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.items
    .map((x: any) => x?.credential?.credentialSubject?.provider)
    .filter(Boolean);
}

function calculateScore(detailsArr: any[]): number {
  return detailsArr
    .reduce(
      (total, cur) => BigNumber(total).plus(BigNumber(cur.weight)).toNumber(),
      0
    )
    .toFixed(1);
}

function createResponse(score: number, stamps: any[]): StampResponse {
  return {
    score,
    updatedAt: new Date(),
    stamps,
  };
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const address = req.nextUrl.searchParams.get("address");

  // Extra strict validation: only allow lowercase 0x-prefixed 40 hex digits
  const STRICT_ETH_ADDR_RE = /^0x[a-f0-9]{40}$/;
  if (
    !address ||
    !isValidEthereumAddress(address) ||
    !STRICT_ETH_ADDR_RE.test("0x" + address.replace(/^0x/i, "").toLowerCase())
  ) {
    return NextResponse.json(createResponse(0, []));
  }

  // Normalize address to lower-case with 0x prefix
  const safeAddress = "0x" + address.replace(/^0x/i, "").toLowerCase();

  const stamps = await fetchStamps(safeAddress);
  if (!stamps.length) return NextResponse.json(createResponse(0, []));

  const detailsArr = stamps.map(gitcoinPassportMapping).filter(Boolean);
  const score = calculateScore(detailsArr);

  return respondWithCache(JSON.stringify(createResponse(score, detailsArr)));
}

export const runtime = "edge";

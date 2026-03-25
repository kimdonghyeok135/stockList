import { getStockDataCandle } from "@/app/lib/api/yahoo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") ?? "1d";
  const interval = searchParams.get("interval") ?? "1m";
  const data = await getStockDataCandle(symbol, range, interval);
  return NextResponse.json(data);
}

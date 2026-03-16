import { getStockDataCandle } from "@/app/lib/api/yahoo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  const range = searchParams.get("range");
  const interval = searchParams.get("interval");
  const data = await getStockDataCandle(symbol!, range!, interval!);
  return NextResponse.json(data);
}

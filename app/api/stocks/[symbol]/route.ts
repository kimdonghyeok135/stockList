import { getStockInfo } from "@/app/lib/api/finnhub";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const data = await getStockInfo(symbol);
  return NextResponse.json(data);
}

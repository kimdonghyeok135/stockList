import { getStockDetailInfo } from "@/app/lib/api/finnhub";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const data = await getStockDetailInfo(symbol);
  return NextResponse.json(data);
}

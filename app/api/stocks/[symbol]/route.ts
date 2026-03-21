import { getStockInfo } from "@/app/lib/api/finnhub";
import { StockQuote } from "@/types/stock";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const data = await getStockInfo(symbol);
  const refineData: StockQuote = {
    currentPrice: data.c,
    priceChange: data.d,
    percentChange: data.dp,
    highPrice: data.h,
    lowPrice: data.l,
    openPrice: data.o,
    previousClose: data.pc,
    timestamp: data.t,
  };
  return NextResponse.json(refineData);
}

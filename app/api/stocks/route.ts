import { getStockList } from "@/app/lib/api/finnhub";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getStockList();
  const refineData = data.map((data) => ({
    id: data.id,
    symbol: data.symbol,
    data: {
      currentPrice: data.data.c,
      priceChange: data.data.d,
      percentChange: data.data.dp,
      highPrice: data.data.h,
      lowPrice: data.data.l,
      openPrice: data.data.o,
      previousClose: data.data.pc,
      timestamp: data.data.t,
    },
  }));
  return NextResponse.json(refineData);
}

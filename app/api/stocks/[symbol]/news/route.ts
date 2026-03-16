import { getStockNews } from "@/app/lib/api/yahoo";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const { searchParams } = new URL(req.url);
  const newsCnt = searchParams.get("newsCnt");
  const res = await getStockNews(symbol, parseInt(newsCnt!));
  return NextResponse.json({
    count: res?.count ?? 0,
    news: res?.news ?? [],
  });
}

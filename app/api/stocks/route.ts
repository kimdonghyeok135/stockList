import { getStocksLists } from "@/app/lib/api/finnhub";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getStocksLists();
  return NextResponse.json(data);
}

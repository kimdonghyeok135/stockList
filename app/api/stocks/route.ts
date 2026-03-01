import { NextResponse } from "next/server";
import { getStocksLists } from "@/app/lib/stock";

export async function GET() {
  const data = await getStocksLists();
  return NextResponse.json(data);
}

import type { StockItem } from "@/types/stock";

export const getStocks = async () => {
  const res = await fetch(`/api/stocks`);
  if (!res.ok) throw new Error("Failed to fetch stocks");
  const data: StockItem[] = await res.json();
  return data;
};

export interface StockData {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface StockItem {
  id: number;
  symbol: string;
  data: StockData;
}

export type StockViewMode = "all" | "liked";
export type StockSortKey = "price" | "changeRate";

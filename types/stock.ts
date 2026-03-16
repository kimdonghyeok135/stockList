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

export interface stockDetail {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string; // YYYY-MM-DD
  logo: string; // image URL
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

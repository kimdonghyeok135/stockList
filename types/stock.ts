export interface StockQuote {
  currentPrice: number;
  priceChange: number;
  percentChange: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  previousClose: number;
  timestamp: number;
}

export interface StockItem {
  id: number;
  symbol: string;
  data: StockQuote;
}

export type StockViewMode = "all" | "liked";
export type StockSortKey = "price" | "changeRate";

export interface StockProfile {
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

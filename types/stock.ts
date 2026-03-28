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

export interface FinnhubQuote {
  c: number; // current price
  d: number; // price change
  dp: number; // percent change
  h: number; // high price of the day
  l: number; // low price of the day
  o: number; // open price of the day
  pc: number; // previous close price
  t: number; // timestamp
}

export interface StockItem {
  id: number;
  symbol: string;
  data: StockQuote;
}

export interface FinnhubQuoteItem {
  id: number;
  symbol: string;
  data: FinnhubQuote;
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

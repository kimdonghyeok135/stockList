import { StockQuote } from "@/types/stock";

type StockInfoOriginal = {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
};
export function mapStockInfoToStockInfoDto({
  stockDetailPrice,
}: {
  stockDetailPrice: StockInfoOriginal;
}): StockQuote {
  const refineData: StockQuote = {
    currentPrice: stockDetailPrice.c,
    priceChange: stockDetailPrice.d,
    percentChange: stockDetailPrice.dp,
    highPrice: stockDetailPrice.h,
    lowPrice: stockDetailPrice.l,
    openPrice: stockDetailPrice.o,
    previousClose: stockDetailPrice.pc,
    timestamp: stockDetailPrice.t,
  };
  return refineData;
}

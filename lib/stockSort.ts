import type { StockItem, StockSortKey } from "@/types/stock";

export const sortStocks = (visibleList: StockItem[], key: StockSortKey, isUp: boolean) => {
  return isUp
    ? [...visibleList].sort((stock1, stock2) => {
        if (key === "price") return stock1.data.currentPrice - stock2.data.currentPrice;
        else if (key === "changeRate") return stock1.data.percentChange - stock2.data.percentChange;
        else return 0;
      })
    : [...visibleList].sort((stock1, stock2) => {
        if (key === "price") return stock2.data.currentPrice - stock1.data.currentPrice;
        else if (key === "changeRate") return stock2.data.percentChange - stock1.data.percentChange;
        else return 0;
      });
};

import type { StockItem, StockSortKey } from "@/types/stock";

export const sortStocks = (
  visibleList: StockItem[],
  key: StockSortKey,
  isUp: boolean
) => {
  return isUp
    ? [...visibleList].sort((stock1, stock2) => {
        if (key === "price") return stock1.data.c - stock2.data.c;
        else if (key === "changeRate") return stock1.data.dp - stock2.data.dp;
        else return 0;
      })
    : [...visibleList].sort((stock1, stock2) => {
        if (key === "price") return stock2.data.c - stock1.data.c;
        else if (key === "changeRate") return stock2.data.dp - stock1.data.dp;
        else return 0;
      });
};

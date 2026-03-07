interface StockData {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

interface StockItem {
  id: number;
  symbol: string;
  data: StockData;
}

export const sortStocks = (
  visibleList: StockItem[],
  key: "price" | "changeRate",
  isUp: boolean
) => {
  return isUp
    ? [...visibleList].sort((stock1, stock2) => {
        if (key === "price") return stock1.data.c - stock2.data.c;
        else if (key === "changeRate") return stock1.data.d - stock2.data.d;
        else return 0;
      })
    : [...visibleList].sort((stock1, stock2) => {
        if (key === "price") return stock2.data.c - stock1.data.c;
        else if (key === "changeRate") return stock2.data.d - stock1.data.d;
        else return 0;
      });
};

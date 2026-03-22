import { describe, expect, it } from "vitest";
import { sortStocks } from "./stockSort";
import type { StockItem } from "@/types/stock";

const stocks: StockItem[] = [
  {
    id: 1,
    symbol: "AAA",
    data: {
      currentPrice: 300,
      priceChange: 10,
      percentChange: 5,
      highPrice: 310,
      lowPrice: 290,
      openPrice: 295,
      previousClose: 290,
      timestamp: 1,
    },
  },
  {
    id: 2,
    symbol: "BBB",
    data: {
      currentPrice: 100,
      priceChange: -2,
      percentChange: -1.5,
      highPrice: 110,
      lowPrice: 95,
      openPrice: 102,
      previousClose: 102,
      timestamp: 2,
    },
  },
  {
    id: 3,
    symbol: "CCC",
    data: {
      currentPrice: 200,
      priceChange: 3,
      percentChange: 1.2,
      highPrice: 205,
      lowPrice: 190,
      openPrice: 198,
      previousClose: 197,
      timestamp: 3,
    },
  },
];

describe("sortStocks", () => {
  it("price(currentPrice) 기준 오름차순으로 정렬한다", () => {
    const result = sortStocks(stocks, "price", true);

    expect(result.map((stock) => stock.symbol)).toEqual(["BBB", "CCC", "AAA"]);
  });

  it("price(currentPrice) 기준 내림차순으로 정렬한다", () => {
    const result = sortStocks(stocks, "price", false);

    expect(result.map((stock) => stock.symbol)).toEqual(["AAA", "CCC", "BBB"]);
  });

  it("changeRate 기준 오름차순으로 정렬한다", () => {
    const result = sortStocks(stocks, "changeRate", true);

    expect(result.map((stock) => stock.symbol)).toEqual(["BBB", "CCC", "AAA"]);
  });

  it("changeRate 기준 내림차순으로 정렬한다", () => {
    const result = sortStocks(stocks, "changeRate", false);

    expect(result.map((stock) => stock.symbol)).toEqual(["AAA", "CCC", "BBB"]);
  });

  it("원본 배열을 변경하지 않는다", () => {
    const original = [...stocks];

    sortStocks(stocks, "price", true);

    expect(stocks).toEqual(original);
  });
});

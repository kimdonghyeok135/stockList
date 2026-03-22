import { describe, expect, it } from "vitest";
import { mapStockInfoToStockInfoDto } from "./stock";

describe("mapStockInfoToStockInfoDto", () => {
  it("API 응답 필드를 StockQuote 형태로 변환한다", () => {
    const result = mapStockInfoToStockInfoDto({
      stockDetailPrice: {
        c: 100,
        d: 5,
        dp: 5,
        h: 110,
        l: 90,
        o: 95,
        pc: 95,
        t: 1234567890,
      },
    });
    expect(result).toEqual({
      currentPrice: 100,
      priceChange: 5,
      percentChange: 5,
      highPrice: 110,
      lowPrice: 90,
      openPrice: 95,
      previousClose: 95,
      timestamp: 1234567890,
    });
  });
});

it("음수와 소수 값을 포함해 각 필드를 정확히 대응시킨다", () => {
  const result = mapStockInfoToStockInfoDto({
    stockDetailPrice: {
      c: 101.25,
      d: -2.5,
      dp: -1.73,
      h: 111.75,
      l: 98.4,
      o: 103.1,
      pc: 103.75,
      t: 1711111111,
    },
  });

  expect(result).toEqual({
    currentPrice: 101.25,
    priceChange: -2.5,
    percentChange: -1.73,
    highPrice: 111.75,
    lowPrice: 98.4,
    openPrice: 103.1,
    previousClose: 103.75,
    timestamp: 1711111111,
  });
});

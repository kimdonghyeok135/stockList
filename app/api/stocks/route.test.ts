import { getStocksLists } from "@/app/lib/api/finnhub";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

vi.mock("@/app/lib/api/finnhub", () => ({
  getStocksLists: vi.fn(),
}));

describe("GET /api/stocks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("stock list를 StockItem 형태로 변환해 반환한다.", async () => {
    vi.mocked(getStocksLists).mockResolvedValue([
      {
        id: 0,
        symbol: "AAPL",
        data: {
          c: 150,
          d: 2,
          dp: 1.35,
          h: 155,
          l: 148,
          o: 149,
          pc: 148,
          t: 1633024800,
        },
      },
    ]);
    const response = await GET();
    const json = await response.json();
    expect(getStocksLists).toHaveBeenCalledTimes(1);

    expect(json).toEqual([
      {
        id: 0,
        symbol: "AAPL",
        data: {
          currentPrice: 150,
          priceChange: 2,
          percentChange: 1.35,
          highPrice: 155,
          lowPrice: 148,
          openPrice: 149,
          previousClose: 148,
          timestamp: 1633024800,
        },
      },
    ]);
  });
});

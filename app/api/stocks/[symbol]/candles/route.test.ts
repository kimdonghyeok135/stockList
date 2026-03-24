import { getStockDataCandle } from "@/app/lib/api/yahoo";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

vi.mock("@/app/lib/api/yahoo", () => ({
  getStockDataCandle: vi.fn(),
}));

describe("GET /api/stocks/[symbol]/candles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("symbol, range, interval을 넘겨 캔들 데이터를 조회한다", async () => {
    const mockData = {
      chart: {
        result: [
          {
            timestamp: [1711111111, 1711111171],
            indicators: {
              quote: [
                {
                  open: [100, 101],
                  high: [102, 103],
                  low: [99, 100],
                  close: [101, 102],
                },
              ],
            },
          },
        ],
      },
    };
    vi.mocked(getStockDataCandle).mockResolvedValue(mockData);
    const request = new NextRequest(
      "http://localhost/api/stocks/AAPL/candles?symbol=AAPL&range=1d&interval=1m"
    );
    const response = await GET(request, { params: Promise.resolve({ symbol: "AAPL" }) });
    const json = await response.json();

    expect(getStockDataCandle).toHaveBeenCalledWith("AAPL", "1d", "1m");
    expect(json).toEqual(mockData);
  });

  it("하위 API 호출 실패를 전파한다", async () => {
    vi.mocked(getStockDataCandle).mockRejectedValue(new Error("getStockDataCandle Fail"));
    const request = new NextRequest(
      "http://localhost/api/stocks/AAPL/candles?symbol=AAPL&range=1d&interval=1m"
    );
    await expect(GET(request, { params: Promise.resolve({ symbol: "AAPL" }) })).rejects.toThrow(
      "getStockDataCandle Fail"
    );
  });
});

import { getStockInfo } from "@/app/lib/api/finnhub";
import { beforeEach } from "node:test";
import { describe, expect, it, vi } from "vitest";
import { GET } from "./route";

vi.mock("@/app/lib/api/finnhub", () => ({
  getStockInfo: vi.fn(),
}));

describe("GET /api/stocks/[symbol]", () => {
  //오염 방지 위해 각 테스트마다 mock 초기화
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("stock quote를 StockQuote 형태로 변환해서 반환한다.", async () => {
    // getStockInfo의 반환값을 모킹
    vi.mocked(getStockInfo).mockResolvedValue({
      c: 150,
      d: 2,
      dp: 1.35,
      h: 155,
      l: 148,
      o: 149,
      pc: 148,
      t: 1633024800,
    });
    const response = await GET(new Request("http://localhost/api/stocks/AAPL"), {
      params: Promise.resolve({ symbol: "AAPL" }),
    });
    const json = await response.json();

    // getStockInfo이 1회 호출되었는지 검증
    expect(getStockInfo).toHaveBeenCalledTimes(1);

    // getStockInfo이 "AAPL" 심볼로 호출되었는지 검증
    expect(getStockInfo).toHaveBeenCalledWith("AAPL");

    expect(json).toEqual({
      currentPrice: 150,
      priceChange: 2,
      percentChange: 1.35,
      highPrice: 155,
      lowPrice: 148,
      openPrice: 149,
      previousClose: 148,
      timestamp: 1633024800,
    });
  });

  // getStockInfo이 실패할 때 에러가 그대로 전파되는지 검증
  it("하위 API호출 실패를 그대로 전파한다.", async () => {
    vi.mocked(getStockInfo).mockRejectedValue(new Error("getStockInfo Fail"));

    await expect(
      GET(new Request("http://localhost/api/stocks/AAPL"), {
        params: Promise.resolve({ symbol: "AAPL" }),
      })
    ).rejects.toThrow("getStockInfo Fail");
  });
});

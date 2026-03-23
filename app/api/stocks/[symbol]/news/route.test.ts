import { beforeEach, describe, expect, it, vi } from "vitest";
import { getStockNews } from "@/app/lib/api/yahoo";
import { GET } from "./route";

vi.mock("@/app/lib/api/yahoo", () => ({
  getStockNews: vi.fn(),
}));

describe("GET /api/stocks/[symbol]/news", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("symbol과 newsCnt를 넘겨 뉴스를 조회한다", async () => {
    vi.mocked(getStockNews).mockResolvedValue({
      count: 2,
      news: [
        { id: "1", title: "AAPL news 1" },
        { id: "2", title: "AAPL news 2" },
      ],
    });

    const request = new Request("http://localhost/api/stocks/AAPL/news?newsCnt=2");

    const response = await GET(request, {
      params: Promise.resolve({ symbol: "AAPL" }),
    });

    const json = await response.json();

    expect(getStockNews).toHaveBeenCalledWith("AAPL", 2);
    expect(json).toEqual({
      count: 2,
      news: [
        { id: "1", title: "AAPL news 1" },
        { id: "2", title: "AAPL news 2" },
      ],
    });
  });

  it("응답이 비어 있으면 기본값을 반환한다", async () => {
    vi.mocked(getStockNews).mockResolvedValue(undefined);

    const request = new Request("http://localhost/api/stocks/AAPL/news?newsCnt=3");

    const response = await GET(request, {
      params: Promise.resolve({ symbol: "AAPL" }),
    });

    const json = await response.json();

    expect(getStockNews).toHaveBeenCalledWith("AAPL", 3);
    expect(json).toEqual({
      count: 0,
      news: [],
    });
  });

  it("하위 API 호출 실패를 전파한다", async () => {
    vi.mocked(getStockNews).mockRejectedValue(new Error("getStockNews Fail"));

    const request = new Request("http://localhost/api/stocks/AAPL/news?newsCnt=2");

    await expect(
      GET(request, {
        params: Promise.resolve({ symbol: "AAPL" }),
      })
    ).rejects.toThrow("getStockNews Fail");
  });
});

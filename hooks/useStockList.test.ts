import { StockItem } from "@/types/stock";
import { describe, expect, it } from "vitest";

import { act, renderHook } from "@testing-library/react";
import { useStockList } from "./useStockList";

const stockList: StockItem[] = [
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

describe("useStockList", () => {
  it("초기 상태를 올바르게 반환한다", () => {
    const { result } = renderHook(() =>
      useStockList({
        stockList,
        has: () => false,
      })
    );
    expect(result.current.searchText).toBe("");
    expect(result.current.viewMode).toBe("all");
    expect(result.current.sortState).toBe("price");
    expect(result.current.isAscending).toBe(false);
    expect(result.current.more).toBe(1);
    expect(result.current.visibleList).toEqual(stockList);
  });

  it("searchText로 종목을 필터링한다.", () => {
    const { result } = renderHook(() =>
      useStockList({
        stockList,
        has: () => false,
      })
    );
    act(() => {
      result.current.setSearchText("AA");
    });
    expect(result.current.visibleList.map((stock) => stock.symbol)).toEqual(["AAA"]);
  });

  it("viewMode가 liked일 때 has가 true인 항목만 보여준다", () => {
    const { result } = renderHook(() =>
      useStockList({
        stockList,
        has: (symbol) => symbol === "AAA" || symbol === "BBB",
      })
    );

    act(() => {
      result.current.setViewMode("liked");
    });

    expect(result.current.visibleList.map((stock) => stock.symbol)).toEqual(["AAA", "BBB"]);
  });

  it("price 기준 기본 정렬은 내림차순이다", () => {
    const { result } = renderHook(() =>
      useStockList({
        stockList,
        has: () => false,
      })
    );
    expect(result.current.sortStockList.map((stock) => stock.symbol)).toEqual([
      "AAA",
      "CCC",
      "BBB",
    ]);
  });

  it("changeRate 기준으로 오름차순 정렬한다", () => {
    const { result } = renderHook(() =>
      useStockList({
        stockList,
        has: () => false,
      })
    );
    act(() => {
      result.current.setSortState("changeRate");
      result.current.setisAscending(true);
    });
    expect(result.current.sortStockList.map((stock) => stock.symbol)).toEqual([
      "BBB",
      "CCC",
      "AAA",
    ]);
  });

  it("stockList가 없으면 빈 배열을 기준으로 동작한다.", () => {
    const { result } = renderHook(() =>
      useStockList({
        stockList: [],
        has: () => false,
      })
    );
    expect(result.current.visibleList).toEqual([]);
    expect(result.current.sortStockList).toEqual([]);
  });
});

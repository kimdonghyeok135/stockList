import { useMemo, useState } from "react";
import { sortStocks } from "@/lib/stockSort";
import type { StockItem, StockSortKey, StockViewMode } from "@/types/stock";

type UseStockListParams = {
  stockList: StockItem[] | undefined;
  has: (symbol: string) => boolean;
};

export const useStockList = ({ stockList, has }: UseStockListParams) => {
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState<StockViewMode>("all");
  const [isAscending, setIsAscending] = useState(false);
  const [sortState, setSortState] = useState<StockSortKey>("price");
  const [more, setMore] = useState(1);
  const filteredList = useMemo(
    () =>
      (stockList ?? []).filter((stock) =>
        stock.symbol.toLowerCase().includes(searchText.toLowerCase())
      ),
    [stockList, searchText]
  );

  const visibleList = useMemo(
    () => (viewMode === "liked" ? filteredList.filter((stock) => has(stock.symbol)) : filteredList),
    [filteredList, has, viewMode]
  );

  const sortStockList = useMemo(
    () => sortStocks(visibleList, sortState, isAscending),
    [visibleList, sortState, isAscending]
  );

  return {
    searchText,
    setSearchText,
    viewMode,
    setViewMode,
    isAscending,
    setIsAscending,
    sortState,
    setSortState,
    more,
    setMore,
    visibleList,
    sortStockList,
  };
};

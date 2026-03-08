"use client";

import { ArrowBigDown } from "lucide-react";
import type { StockItem, StockViewMode } from "@/types/stock";
import { StockSkeleton } from "./StockSkeleton";
import { StockListItem } from "./StockListItem";

type StockListProps = {
  isLoading: boolean;
  visibleListLength: number;
  sortStockList: StockItem[];
  searchText: string;
  more: number;
  viewMode: StockViewMode;
  has: (symbol: string) => boolean;
  toggle: (symbol: string) => void;
  highlightMatch: (text: string, query: string) => React.ReactNode;
  onMore: () => void;
};

export const StockList = ({
  isLoading,
  visibleListLength,
  sortStockList,
  searchText,
  more,
  viewMode,
  has,
  toggle,
  highlightMatch,
  onMore,
}: StockListProps) => {
  return (
    <div className="space-y-3">
      {isLoading ? (
        <>
          {[
            ...Array(5)
              .fill(0)
              .map((_, i) => <StockSkeleton key={i} />),
          ]}
        </>
      ) : visibleListLength === 0 ? (
        <div className="rounded-xl border border-gray-700 bg-white/5 p-6 text-center text-gray-300">
          {viewMode === "liked" ? "관심목록이 없습니다." : "검색 결과가 없습니다."}
        </div>
      ) : (
        sortStockList
          .slice(0, more * 7)
          .map((stock) => (
            <StockListItem
              key={stock.id}
              stockItem={stock}
              searchText={searchText}
              has={has}
              toggle={toggle}
              highlightMatch={() => highlightMatch(stock.symbol, searchText)}
            />
          ))
      )}
      {!isLoading && (
        <div className="flex items-center justify-center animate-bounce" onClick={onMore}>
          {sortStockList.length % (more * 7) < 7 &&
          sortStockList.length !== 0 &&
          viewMode === "all" ? (
            <ArrowBigDown />
          ) : null}
        </div>
      )}
    </div>
  );
};

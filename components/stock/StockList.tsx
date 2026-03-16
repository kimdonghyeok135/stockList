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
  onMore,
}: StockListProps) => {
  const pageSize = 7;
  const visibleCount = more * pageSize;
  const hasMore = sortStockList.length > visibleCount;
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
          {viewMode === "liked"
            ? "관심 종목이 아직 없습니다. 하트를 눌러 추가해보세요."
            : "검색 결과가 없습니다. 다른 종목 코드를 입력해보세요."}
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
            />
          ))
      )}
      {!isLoading && (
        <div className="flex items-center justify-center animate-bounce" onClick={onMore}>
          {hasMore && viewMode === "all" ? <ArrowBigDown /> : null}
        </div>
      )}
    </div>
  );
};

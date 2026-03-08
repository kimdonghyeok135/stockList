"use client";

import { ArrowBigDown, Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "@/lib/toast";
import type { StockItem, StockViewMode } from "@/types/stock";
import { StockSkeleton } from "./StockSkeleton";

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
          관심목록이 없습니다.
        </div>
      ) : (
        sortStockList.slice(0, more * 7).map((stock) => (
          <Link key={stock.id} href={`/stockDetail/${stock.symbol}`} className="block no-underline">
            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-lg transition-all duration-200 ease-out active:scale-95 hover:scale-[1.02] hover:shadow-xl">
              <div className="flex items-center gap-4 ">
                {has(stock.symbol) ? (
                  <Heart
                    className="text-red-500 fill-red-500"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggle(stock.symbol);
                    }}
                  />
                ) : (
                  <Heart
                    className="text-red-500 fill-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toast.success("관심목록에 등록");
                      toggle(stock.symbol);
                    }}
                  />
                )}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">
                    {highlightMatch(stock.symbol, searchText)}
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900 font-bold">${stock.data.c}</p>
                <div
                  className={`flex items-center justify-end text-sm font-semibold ${stock.data.d > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  <span>{stock.data.d > 0 ? "+" : "-"}</span>
                  <span className="ml-1">{Math.abs(stock.data.d)} $</span>
                </div>
              </div>
            </div>
          </Link>
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

"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StockList } from "@/components/stock/StockList";
import { useStockList } from "@/hooks/useStockList";
import { getStocks } from "@/lib/services/getStocks";
import type { StockItem } from "@/types/stock";
import { useLikelist } from "./store/likelist";
import { StockSearchModal } from "@/components/stock/StockSearchModal";

export default function HomePage() {
  const [searchOpenModal, setSearchOpenModal] = useState(false);
  const { toggle, has } = useLikelist();

  const {
    data: stockList,
    isLoading,
    error,
  } = useQuery<StockItem[]>({
    queryKey: ["stocks"],
    queryFn: getStocks,
    refetchInterval: 300000,
  });

  const {
    searchText,
    setSearchText,
    viewMode,
    setViewMode,
    isUp,
    setIsUp,
    sortState,
    setSortState,
    more,
    setMore,
    visibleList,
    sortStockList,
  } = useStockList({ stockList, has });

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const start = lowerText.indexOf(lowerQuery);

    if (start === -1) return text;

    const end = start + query.length;

    return (
      <>
        {text.slice(0, start)}
        <span className="text-yellow-300 font-bold">{text.slice(start, end)}</span>
        {text.slice(end)}
      </>
    );
  };

  if (error) {
    return (
      <div className="p-6 text-center text-red-400 bg-red-900/20 rounded-3xl">
        <p>Failed to load data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a2b3c] text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <button className="text-sm border border-gray-600 px-3 py-1 rounded-full">Menu</button>
        <h1 className="text-xl font-bold tracking-widest">STOCKS</h1>
        <button
          className="text-sm border border-gray-600 px-3 py-1 rounded-full"
          onClick={() => setSearchOpenModal(true)}
        >
          Search
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setViewMode("all")}
          className={`flex-1 py-2 rounded-full text-sm font-bold border ${
            viewMode === "all"
              ? "bg-[#4fd1c5] text-[#1a2b3c] border-[#4fd1c5]"
              : "border-gray-600 text-gray-300"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setViewMode("liked")}
          className={`flex-1 py-2 rounded-full text-sm font-bold border ${
            viewMode === "liked"
              ? "bg-[#4fd1c5] text-[#1a2b3c] border-[#4fd1c5]"
              : "border-gray-600 text-gray-300"
          }`}
        >
          Liked
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-300">Sort:</span>
        <div className="flex flex-1 gap-2">
          <button
            type="button"
            className={
              sortState === "price"
                ? "flex-1 py-2 rounded-full text-xs font-bold border bg-[#4fd1c5] text-[#1a2b3c] border-[#4fd1c5]"
                : "flex-1 py-2 rounded-full text-xs font-bold border border-gray-600 text-gray-300"
            }
            onClick={() => setSortState("price")}
          >
            Price
          </button>
          <button
            type="button"
            className={
              sortState === "changeRate"
                ? "flex-1 py-2 rounded-full text-xs font-bold border bg-[#4fd1c5] text-[#1a2b3c] border-[#4fd1c5]"
                : "flex-1 py-2 rounded-full text-xs font-bold border border-gray-600 text-gray-300"
            }
            onClick={() => setSortState("changeRate")}
          >
            Change
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-full text-xs font-bold border border-gray-600 text-gray-300"
            onClick={() => setIsUp((prev) => !prev)}
          >
            {isUp ? "ASC" : "DESC"}
          </button>
        </div>
      </div>

      <StockList
        isLoading={isLoading}
        visibleListLength={visibleList.length}
        sortStockList={sortStockList}
        searchText={searchText}
        more={more}
        viewMode={viewMode}
        has={has}
        toggle={toggle}
        highlightMatch={highlightMatch}
        onMore={() => setMore((prev) => prev + 1)}
      />
      {searchOpenModal && (
        <StockSearchModal
          searchText={searchText}
          setSearchText={setSearchText}
          setSearchOpenModal={setSearchOpenModal}
        />
      )}
    </div>
  );
}

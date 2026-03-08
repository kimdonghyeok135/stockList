"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StockList } from "@/components/stock/StockList";
import { useStockList } from "@/hooks/useStockList";
import { getStocks } from "@/lib/services/getStocks";
import type { StockItem } from "@/types/stock";
import { useLikelist } from "./store/likelist";
import { StockSearchModal } from "@/components/stock/StockSearchModal";
import { StockAllorLiked } from "@/components/stock/StockAllorLiked";
import { StockSort } from "@/components/stock/StockSort";

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
      <StockAllorLiked setViewMode={setViewMode} viewMode={viewMode} />
      <StockSort setSortState={setSortState} setIsUp={setIsUp} sortState={sortState} isUp={isUp} />
      <StockList
        isLoading={isLoading}
        visibleListLength={visibleList.length}
        sortStockList={sortStockList}
        searchText={searchText}
        more={more}
        viewMode={viewMode}
        has={has}
        toggle={toggle}
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

"use client"

import { useQuery } from "@tanstack/react-query";
import { ArrowBigDown, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLikelist } from "../store/likelist";
import { toast } from "@/lib/toast";

function StockSkeleton() {
  return (
    <div className="flex items-center justify-between bg-white/10 rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="space-y-2">
          <div className="w-16 h-4 bg-gray-600 rounded"></div>
          <div className="w-10 h-3 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="text-right space-y-2">
        <div className="w-20 h-5 bg-gray-600 rounded ml-auto"></div>
        <div className="w-12 h-3 bg-gray-700 rounded ml-auto"></div>
      </div>
    </div>
  );
}

interface StockData {
  c: number;   // Current price
  d: number;   // Change
  dp: number;  // Percent change
  h: number;   // High price of the day
  l: number;   // Low price of the day
  o: number;   // Open price of the day
  pc: number;  // Previous close price
  t: number;   // Timestamp
}

interface StockItem {
  id: number;
  symbol: string;
  data: StockData;
}

export default function StockList(){
  
  const [searchOpenModal, setSearchOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "liked">("all");
  const [isUp, setIsUp] = useState(false);
  const [sortState, setSortState] = useState<"value" | "change">("value")
  const [more, setMore] = useState(1);

  const {toggle, has} = useLikelist()
  const highlightMatch = (text : string, query : string) => {
    if(!query) return text
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const start = lowerText.indexOf(lowerQuery);
    if(start === -1) return text

    //포함하고 있는 순간부터 끝까지
    const end = start + query.length;
    return (
      <>
        {text.slice(0,start)}
        <span className="text-yellow-300 font-bold">
          {text.slice(start,end)}
        </span>
        {text.slice(end)}
      </>
    )

  }

  const getStocks = async () => {
    const res = await fetch(`/api/stocks`);
    const data = await res.json();
    return data; 
  };

  const {data : stockList, isLoading, error} = useQuery<StockItem[]>({
    queryKey : ['stocks'],
    queryFn : getStocks,
    refetchInterval : 300000,
  });

  //검색창에서 입력한 것들만 매핑
  const filteredList = (stockList ?? []).filter((stock) =>
  stock.symbol.toLowerCase().includes(searchText.toLowerCase()))

  const visibleList = viewMode === "liked"
    ? filteredList.filter((stock) => has(stock.symbol))
    : filteredList;
  
  const sortList = isUp 
  ? visibleList.sort((stock1,stock2) => { 
    if(sortState === "value") return (stock1.data.c - stock2.data.c)
    else if(sortState === "change") return (stock1.data.d - stock2.data.d)
    else return 0
    }
    
  )
  : visibleList.sort((stock1,stock2) => {
    if(sortState === "value") return (stock2.data.c - stock1.data.c)
    else if(sortState === "change") return (stock2.data.d - stock1.data.d)
    else return 0
    }
  )

  
  if (error) {
    return (
      <div className="p-6 text-center text-red-400 bg-red-900/20 rounded-3xl">
        <p>Failed to load data.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#1a2b3c] text-white p-4 font-sans"
      
    >
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-sm border border-gray-600 px-3 py-1 rounded-full">Menu</button>
        <h1 className="text-xl font-bold tracking-widest">STOCKS</h1>
        <button className="text-sm border border-gray-600 px-3 py-1 rounded-full" onClick={() => setSearchOpenModal(true)}>Search</button>
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
          전체보기
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
          관심목록
        </button>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-300">정렬:</span>
        <div className="flex flex-1 gap-2">
        <button
          type="button"
          className = {
            sortState === "value" ? `flex-1 py-2 rounded-full text-xs font-bold border bg-[#4fd1c5] text-[#1a2b3c] border-[#4fd1c5]`
            : `flex-1 py-2 rounded-full text-xs font-bold border border-gray-600 text-gray-300`
          }
          onClick={() => setSortState("value")}
        >
            가격
          </button>
          <button
          type="button"
          className = {
            sortState === "change" ? `flex-1 py-2 rounded-full text-xs font-bold border bg-[#4fd1c5] text-[#1a2b3c] border-[#4fd1c5]`
            : `flex-1 py-2 rounded-full text-xs font-bold border border-gray-600 text-gray-300`
          }
          onClick={() => setSortState("change")}
        >
            등락률
          </button>
        <button
          type="button"
          className="px-3 py-2 rounded-full text-xs font-bold border border-gray-600 text-gray-300"  
          onClick={() => setIsUp(isUp ? false : true)}
          >
            {isUp ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <>
            {[...Array(5).fill(0).map((_, i) => 
              <StockSkeleton key={i} />
            )]
            }
          </>
        ) : visibleList.length === 0 ? (
           <div className="rounded-xl border border-gray-700 bg-white/5 p-6 text-center text-gray-300">
          관심목록이 없습니다.
          </div>
        ) : 
        ((sortList ?? []).slice(0,more * 7).map((stock) => (
          <Link 
            key={stock.id + ""}
            href = {`/stockDetail/${stock.symbol}`} 
            className="block no-underline"
          >
            <div 
              className="flex items-center justify-between bg-white rounded-xl p-4 shadow-lg transition-all duration-200 ease-out active:scale-95 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Symbol */}
              <div className="flex items-center gap-4 ">
                {has(stock.symbol) ? 
                <Heart className="text-red-500 fill-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggle(stock.symbol)
                  
                }}/> : 
                <Heart className="text-red-500 fill-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toast.success('관심목록 등록')
                  toggle(stock.symbol)
                }}
                />}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">
                    {highlightMatch(stock.symbol,searchText)}
                  </h3>
                  {/* <p className="text-gray-400 text-xs">{stock.symbol}</p> */}
                </div>
              </div>
              {/* Price */}
              <div className="text-right">
                <p className="text-gray-900 font-bold">${stock.data.c}</p>
                <div className={`flex items-center justify-end text-sm font-semibold ${stock.data.d > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <span>{stock.data.d > 0 ? '+' : '-'}</span>
                  <span className="ml-1">{Math.abs(stock.data.d)} %</span>
                </div>
              </div>
            </div>
            
          </Link>
        )))}
        {isLoading ? (<></>) : (
          <div className="flex items-center justify-center animate-bounce" onClick={() => {setMore((prev) => prev + 1)}}>
            {sortList.length % (more * 7) < 7 && sortList.length != 0 ? <ArrowBigDown /> : <></>}
          </div>
        )}
      </div>
      {/* Modal */}
      {searchOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-[#1e2e3e] p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Search</h2>
              <button
                type="button"
                className="text-xs uppercase tracking-widest border border-gray-600 px-3 py-1 rounded-full"
                onClick={() => setSearchOpenModal(false)}
              >
                Close
              </button>
            </div>
            <input
              autoFocus
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Type a symbol (e.g., AAPL)"
              className="w-full rounded-xl border border-gray-600 bg-[#162535] px-3 py-2 text-sm text-white placeholder-gray-400 outline-none focus:border-gray-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}
  // Pull-to-refresh handlers: only active when the window is at the top.
  

import { getStockDetailInfo, getStockInfo } from "@/app/lib/stock";

import { Bell, Share2 } from "lucide-react";
import Image from "next/image";
import LikeButton from "./_components/LikeButton.client";
import ActionPill from "./_components/ActionPill.client";
import Metric from "./_components/Metric.client";
import CandleStock from "./_components/CandleStock.client";
import News from "./_components/News.client";

type stockDetailType = {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string; // YYYY-MM-DD
  logo: string; // image URL
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
};

type stockData = {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
};

export default async function StockDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const stockDetailPrice: stockData = await getStockInfo(id);

  const stockDetailInfo: stockDetailType = await getStockDetailInfo(id);

  const isUp = stockDetailPrice.d > 0 ? true : false;

  return (
    <div className="min-h-screen bg-[#1a2b3c] text-white p-4 font-sans">
      {/* Header (리스트 페이지 톤 유지) */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-sm border border-gray-600 px-3 py-1 rounded-full">Menu</button>
        <h1 className="text-xl font-bold tracking-widest">DETAIL</h1>
        <button className="text-sm border border-gray-600 px-3 py-1 rounded-full">Search</button>
      </div>

      {/* Symbol Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* ME badge */}
          {/* <div className="h-12 w-12 rounded-2xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
            <span className="text-lg font-extrabold tracking-wide">ME</span>
          </div> */}
          <Image src={stockDetailInfo?.logo || "/no-logo.png"} alt="" width={48} height={48} />
          <div className="leading-tight">
            <p className="text-xs text-gray-300">Stock Detail</p>
            <h2 className="text-2xl font-extrabold tracking-wide">{stockDetailInfo.name}</h2>
          </div>
        </div>
        <LikeButton symbol={id} />
      </div>

      {/* Main Price Card */}
      <div className="rounded-3xl bg-white p-4 shadow-lg">
        {/* Price row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4fd1c5]" />
              Current Price
            </p>
            <div className="mt-1 flex items-end gap-2">
              <p className="text-4xl font-extrabold tracking-tight text-gray-900">
                ${stockDetailPrice.c}
              </p>
              <span className="text-sm text-gray-500 pb-1">USD</span>
            </div>
          </div>

          {/* change badge */}
          <div
            className={`rounded-2xl px-3 py-2 text-right ring-1 ${
              isUp ? "bg-emerald-50 ring-emerald-200" : "bg-rose-50 ring-rose-200"
            }`}
          >
            <p className={`text-sm font-extrabold ${isUp ? "text-emerald-600" : "text-rose-600"}`}>
              {isUp ? "▲" : "▼"} {stockDetailPrice.d}%
            </p>
            <p className={`text-xs font-semibold ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
              ({stockDetailPrice.dp})
            </p>
          </div>
        </div>

        <CandleStock symbol={id} />

        {/* Range Tabs */}
        {/* <div className="mt-4 flex items-center justify-center">
          <div className="flex w-full max-w-sm rounded-full bg-gray-100 p-1 ring-1 ring-gray-200">
            <button className="flex-1 py-2 rounded-full text-sm font-bold bg-[#4fd1c5] text-[#1a2b3c]">
              1D
            </button>
            <button className="flex-1 py-2 rounded-full text-sm font-bold text-gray-600">
              1W
            </button>
            <button className="flex-1 py-2 rounded-full text-sm font-bold text-gray-600">
              1M
            </button>
            <button className="flex-1 py-2 rounded-full text-sm font-bold text-gray-600">
              1Y
            </button>
          </div>
        </div> */}

        {/* Metrics (2x2) */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Metric label="고가" value={"$" + stockDetailPrice.h.toString()} />
          <Metric label="저가" value={"$" + stockDetailPrice.l.toString()} />
          <Metric label="시가" value={"$" + stockDetailPrice.o.toString()} />
          <Metric label="전일 종가" value={"$" + stockDetailPrice.pc.toString()} />
        </div>

        <div className="mt-4 flex items-center justify-center text-xs text-gray-400">
          Last updated: 2월 14일 오전 08:00
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <ActionPill
          icon={<Bell className="h-5 w-5" />}
          label="알림"
          symbol={id}
          currentPrice={stockDetailPrice.c}
        />

        {/* 아래에서는 symbol이랑 currentPrice필요없음 */}
        <ActionPill
          icon={<Share2 className="h-5 w-5" />}
          label="공유"
          symbol={id}
          currentPrice={stockDetailPrice.c}
        />
      </div>

      {/* News Card */}
      {/* <div className="mt-4 rounded-3xl bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-gray-900">관련 뉴스</h3>
          <ChevronRight className="h-5 w-5 text-[#4fd1c5]" />
        </div>

        <div className="mt-3 space-y-3">
          <NewsRow
            title="Meta releases new AI updates..."
            meta="2시간 전 · Reuters"
          />
          <div className="h-px bg-gray-100" />
          <NewsRow
            title="Analysts revise price targets..."
            meta="2시간 전 · Reuters"
          />
        </div>
      </div> */}
      <News symbol={id} />
    </div>
  );
}

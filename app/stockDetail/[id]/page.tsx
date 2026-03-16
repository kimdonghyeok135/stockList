import { Bell, Share2 } from "lucide-react";
import Image from "next/image";
import LikeButton from "./_components/LikeButton.client";
import ActionPill from "./_components/ActionPill.client";
import CandleStock from "./_components/CandleStock.client";
import News from "./_components/News.client";
import { getStockDetailInfo, getStockInfo } from "@/app/lib/api/finnhub";

export default async function StockDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [stockDetailPrice, stockDetailInfo] = await Promise.all([
    getStockInfo(id),
    getStockDetailInfo(id),
  ]);

  const isUp = stockDetailPrice.d > 0;
  return (
    <div className="min-h-screen bg-[#1a2b3c] text-white p-4 font-sans">
      {/* Symbol Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
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
              {isUp ? "▲" : "▼"} {stockDetailPrice.dp}%
            </p>
            <p className={`text-xs font-semibold ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
              ({stockDetailPrice.d})
            </p>
          </div>
        </div>

        <CandleStock symbol={id} />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-3">
            <p className="text-xs text-gray-500">고가</p>
            <p className="mt-1 text-base font-extrabold text-gray-900">{stockDetailPrice.h}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-3">
            <p className="text-xs text-gray-500">저가</p>
            <p className="mt-1 text-base font-extrabold text-gray-900">{stockDetailPrice.l}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-3">
            <p className="text-xs text-gray-500">시가</p>
            <p className="mt-1 text-base font-extrabold text-gray-900">{stockDetailPrice.o}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-3">
            <p className="text-xs text-gray-500">종가</p>
            <p className="mt-1 text-base font-extrabold text-gray-900">{stockDetailPrice.pc}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center text-xs text-gray-400">
          Last updated: {stockDetailPrice.t}
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
      <News symbol={id} />
    </div>
  );
}

import CandleStock from "./_components/CandleStock.client";
import News from "./_components/News.client";
import { getStockDetailInfo, getStockInfo } from "@/app/lib/api/finnhub";

import StockHeader from "./_components/StockHeader";
import StockPriceSummary from "./_components/StockPriceSummary";
import ShareActionButton from "./_components/ShareActionButton.client";
import AlertActionButton from "./_components/AlertActionButton.client";
import { StockProfile, StockQuote } from "@/types/stock";
import PriceSummaryCard from "./_components/PriceSummaryCard";

export default async function StockDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [stockDetailPrice, stockDetailInfo] = await Promise.all([
    getStockInfo<StockQuote>(id),
    getStockDetailInfo<StockProfile>(id),
  ]);
  console.log("stockDetailInfo", stockDetailInfo);
  return (
    <div className="min-h-screen bg-[#1a2b3c] text-white p-4 font-sans">
      <StockHeader stockDetailInfo={stockDetailInfo} id={id} />

      {/* Main Price Card */}
      <div className="rounded-3xl bg-white p-4 shadow-lg">
        {/* Price row */}
        <StockPriceSummary stockDetailPrice={stockDetailPrice} />
        <CandleStock symbol={id} />
        <PriceSummaryCard stockDetailPrice={stockDetailPrice} />
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <AlertActionButton symbol={id} currentPrice={stockDetailPrice.currentPrice} />
        <ShareActionButton symbol={id} currentPrice={stockDetailPrice.currentPrice} />
      </div>
      <News symbol={id} />
    </div>
  );
}

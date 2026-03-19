import { formatCurrency, formatTimestamp } from "@/lib/format";
import { StockQuote } from "@/types/stock";
export default function PriceSummaryCard({ stockDetailPrice }: { stockDetailPrice: StockQuote }) {
  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-3">
          <p className="text-xs text-gray-500">고가</p>
          <p className="mt-1 text-base font-extrabold text-gray-900">
            {formatCurrency(stockDetailPrice.highPrice, "USD")}
          </p>
        </div>
        <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-3">
          <p className="text-xs text-gray-500">저가</p>
          <p className="mt-1 text-base font-extrabold text-gray-900">
            {formatCurrency(stockDetailPrice.lowPrice, "USD")}
          </p>
        </div>
        <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-3">
          <p className="text-xs text-gray-500">시가</p>
          <p className="mt-1 text-base font-extrabold text-gray-900">
            {formatCurrency(stockDetailPrice.openPrice, "USD")}
          </p>
        </div>
        <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-3">
          <p className="text-xs text-gray-500">종가</p>
          <p className="mt-1 text-base font-extrabold text-gray-900">
            {formatCurrency(stockDetailPrice.previousClose, "USD")}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center text-xs text-gray-400">
        Last updated: {formatTimestamp(stockDetailPrice.timestamp)}
      </div>
    </>
  );
}

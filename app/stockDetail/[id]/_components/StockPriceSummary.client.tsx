import { StockQuote } from "@/types/stock";

export default function StockPriceSummary({ stockDetailPrice }: { stockDetailPrice: StockQuote }) {
  const isUp = stockDetailPrice.priceChange >= 0;
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4fd1c5]" />
          Current Price
        </p>
        <div className="mt-1 flex items-end gap-2">
          <p className="text-4xl font-extrabold tracking-tight text-gray-900">
            ${stockDetailPrice.currentPrice}
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
          {isUp ? "▲" : "▼"} {stockDetailPrice.percentChange.toFixed(2)}%
        </p>
        <p className={`text-xs font-semibold ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
          ({stockDetailPrice.priceChange.toFixed(2)})
        </p>
      </div>
    </div>
  );
}

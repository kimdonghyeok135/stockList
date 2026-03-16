import { toast } from "@/lib/toast";
import { StockItem } from "@/types/stock";
import { Heart } from "lucide-react";
import Link from "next/link";

type StockListItemProps = {
  stockItem: StockItem;
  searchText: string;
  has: (symbol: string) => boolean;
  toggle: (symbol: string) => void;
};

export const StockListItem = ({ stockItem, searchText, has, toggle }: StockListItemProps) => {
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
  return (
    <>
      <Link
        key={stockItem.id}
        href={`/stockDetail/${stockItem.symbol}`}
        className="block no-underline"
      >
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-lg transition-all duration-200 ease-out active:scale-95 hover:scale-[1.02] hover:shadow-xl">
          <div className="flex items-center gap-4 ">
            {has(stockItem.symbol) ? (
              <Heart
                className="text-red-500 fill-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggle(stockItem.symbol);
                }}
              />
            ) : (
              <Heart
                className="text-red-500 fill-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toast.success("관심목록에 등록");
                  toggle(stockItem.symbol);
                }}
              />
            )}
            <div>
              <h3 className="text-gray-900 font-bold text-lg">
                {highlightMatch(stockItem.symbol, searchText)}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-900 font-bold">${stockItem.data.currentPrice}</p>
            <div
              className={`flex items-center justify-end text-sm font-semibold ${stockItem.data.priceChange > 0 ? "text-green-500" : "text-red-500"}`}
            >
              <span>{stockItem.data.priceChange > 0 ? "+" : "-"}</span>
              <span className="ml-1">{Math.abs(stockItem.data.priceChange)} $</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

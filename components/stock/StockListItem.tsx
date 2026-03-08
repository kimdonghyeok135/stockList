import { toast } from "@/lib/toast";
import { StockItem } from "@/types/stock";
import { Heart } from "lucide-react";
import Link from "next/link";

type StockListItemProps = {
  stockItem: StockItem;
  searchText: string;
  has: (symbol: string) => boolean;
  toggle: (symbol: string) => void;
  highlightMatch: (text: string, query: string) => React.ReactNode;
};

export const StockListItem = ({
  stockItem,
  searchText,
  has,
  toggle,
  highlightMatch,
}: StockListItemProps) => {
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
            <p className="text-gray-900 font-bold">${stockItem.data.c}</p>
            <div
              className={`flex items-center justify-end text-sm font-semibold ${stockItem.data.d > 0 ? "text-green-500" : "text-red-500"}`}
            >
              <span>{stockItem.data.d > 0 ? "+" : "-"}</span>
              <span className="ml-1">{Math.abs(stockItem.data.d)} $</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

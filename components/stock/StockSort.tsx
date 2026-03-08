import { StockSortKey } from "@/types/stock";

type StockSortProps = {
  setSortState: React.Dispatch<React.SetStateAction<StockSortKey>>;
  setIsUp: React.Dispatch<React.SetStateAction<boolean>>;
  sortState: string;
  isUp: boolean;
};

export const StockSort = ({ setSortState, setIsUp, sortState, isUp }: StockSortProps) => {
  return (
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
  );
};

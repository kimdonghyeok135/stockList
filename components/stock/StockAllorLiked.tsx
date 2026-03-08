import { StockViewMode } from "@/types/stock";

type StockAllorLikedProps = {
  setViewMode: React.Dispatch<React.SetStateAction<StockViewMode>>;
  viewMode: string;
};

export const StockAllorLiked = ({ setViewMode, viewMode }: StockAllorLikedProps) => {
  return (
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
        All
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
        Liked
      </button>
    </div>
  );
};

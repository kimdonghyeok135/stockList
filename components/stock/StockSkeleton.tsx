export const StockSkeleton = () => {
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
};

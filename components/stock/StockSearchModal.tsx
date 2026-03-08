type StockSearchModalProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSearchOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StockSearchModal = ({
  searchText,
  setSearchText,
  setSearchOpenModal,
}: StockSearchModalProps) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-[#1e2e3e] p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Search</h2>
            <button
              type="button"
              className="text-xs uppercase tracking-widest border border-gray-600 px-3 py-1 rounded-full"
              onClick={() => setSearchOpenModal(false)}
            >
              Close
            </button>
          </div>
          <input
            autoFocus
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Type a symbol (e.g., AAPL)"
            className="w-full rounded-xl border border-gray-600 bg-[#162535] px-3 py-2 text-sm text-white placeholder-gray-400 outline-none focus:border-gray-400"
          />
        </div>
      </div>
    </>
  );
};

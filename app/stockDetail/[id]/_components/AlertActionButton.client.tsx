"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import AlertStockPriceBottomSheet from "./AlertStockPriceBottomSheet.client";

export default function AlertActionButton({
  symbol,
  currentPrice,
}: {
  symbol: string;
  currentPrice: number;
}) {
  const [bottomOpen, setBottomOpen] = useState<boolean>(false);
  return (
    <>
      <button
        type="button"
        className={`rounded-2xl py-3 ring-1 transition flex flex-col items-center justify-center  gap-1
            ${"bg-white text-gray-900 ring-gray-200 shadow-sm hover:shadow-md"}`}
        onClick={() => {
          setBottomOpen(true);
        }}
      >
        <span className={"text-[#4fd1c5]"}>
          <Bell className="h-5 w-5" />
        </span>
        <span className="text-xs font-extrabold">알람</span>
      </button>
      {bottomOpen ? (
        <AlertStockPriceBottomSheet
          open={bottomOpen}
          onClose={() => {
            setBottomOpen(false);
          }}
          symbol={symbol}
          currentPrice={currentPrice}
        />
      ) : null}
    </>
  );
}

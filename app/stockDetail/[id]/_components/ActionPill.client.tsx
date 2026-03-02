"use client";

import { useState } from "react";
import AlertStockPriceBottomSheet from "./AlertStockPriceBottomSheet.client";

type ActionPillParams = {
  icon: React.ReactNode;
  label: "알림" | "공유";
  active?: boolean;
  symbol?: string | undefined;
  currentPrice?: number | undefined;
};

export default function ActionPill({
  icon,
  label,
  active,
  symbol,
  currentPrice,
}: ActionPillParams) {
  const [bottomOpen, setBottomOpen] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className={`rounded-2xl py-3 ring-1 transition flex flex-col items-center justify-center  gap-1
            ${
              active
                ? "bg-[#4fd1c5] text-[#1a2b3c] ring-[#4fd1c5] shadow-md"
                : "bg-white text-gray-900 ring-gray-200 shadow-sm hover:shadow-md"
            }`}
        onClick={() => {
          if (label === "알림") {
            setBottomOpen(true);
          } else if (label === "공유") {
            if (navigator.share) {
              navigator.share({
                title: `${symbol} 현재가 ${currentPrice}`,
                text: `${symbol} 현재가 ${currentPrice}을 확인해보세요.`,
                url: window.location.href,
              });
            }
          }
        }}
      >
        <span className={active ? "text-[#1a2b3c]" : "text-[#4fd1c5]"}>{icon}</span>
        <span className="text-xs font-extrabold">{label}</span>
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

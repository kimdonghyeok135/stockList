"use client";
import { Share2 } from "lucide-react";

export default function ShareActionButton({
  symbol,
  currentPrice,
}: {
  symbol: string;
  currentPrice: number;
}) {
  return (
    <>
      <button
        type="button"
        className={`rounded-2xl py-3 ring-1 transition flex flex-col items-center justify-center  gap-1
            ${"bg-white text-gray-900 ring-gray-200 shadow-sm hover:shadow-md"}`}
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: `${symbol} 현재가 ${currentPrice}`,
              text: `${symbol} 현재가 ${currentPrice}을 확인해보세요.`,
              url: window.location.href,
            });
          }
        }}
      >
        <span className={"text-[#4fd1c5]"}>
          <Share2 className="h-5 w-5" />
        </span>
        <span className="text-xs font-extrabold">공유</span>
      </button>
    </>
  );
}

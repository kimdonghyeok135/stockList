"use client";

import { useState } from "react";

type AlertBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  symbol: string;
  currentPrice?: number;
};

export default function AlertStockPriceBottomSheet({
  open,
  onClose,
  symbol,
  currentPrice,
}: AlertBottomSheetProps) {
  const [UP, setUp] = useState<boolean>(true);
  const [repeat, setRepeat] = useState<boolean>(true);
  const [dollar, setDollar] = useState<string>(currentPrice ? String(currentPrice) : "");

  const handleDollarChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");

    if (parts.length > 2) {
      setDollar(`${parts[0]}.${parts.slice(1).join("")}`);
      return;
    }

    setDollar(cleaned);
  };

  const formattedDollar =
    dollar === "" || dollar === "."
      ? ""
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(dollar));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button aria-label="닫기" className="absolute inset-0 z-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto w-full max-w-md rounded-t-3xl bg-white shadow-2xl">
          <div className="flex justify-center pt-3">
            <div className="h-1.5 w-12 rounded-full bg-gray-300" />
          </div>

          <div className="px-5 pt-3 pb-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-gray-900">가격 알림</div>
                <div className="text-sm text-gray-500">
                  {symbol} 현재가 <span className="font-medium text-gray-700">${currentPrice}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 active:scale-95"
              >
                닫기
              </button>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                className={`flex-1 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-medium ${
                  UP ? "text-white ring-1 ring-gray-900" : "text-gray-400 ring-1 ring-gray-200"
                }`}
                onClick={() => setUp(true)}
              >
                이상
              </button>
              <button
                className={`flex-1 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-medium ${
                  !UP ? "text-white ring-1 ring-gray-900" : "text-gray-400 ring-1 ring-gray-200"
                }`}
                onClick={() => setUp(false)}
              >
                이하
              </button>
            </div>

            <div className="mt-3 rounded-2xl p-4 ring-1 ring-gray-200">
              <label className="block text-xs text-gray-500">목표 가격 (USD)</label>

              <div className="mt-2 flex items-center gap-2">
                <div className="text-gray-500">$</div>
                <input
                  inputMode="decimal"
                  placeholder="ex 450"
                  className="w-full rounded-xl bg-gray-50 px-3 py-3 text-base text-gray-900 outline-none ring-1 ring-gray-200 focus:ring-gray-400"
                  value={dollar}
                  onChange={(e) => handleDollarChange(e.target.value)}
                />
              </div>

              {formattedDollar && (
                <div className="mt-2 text-sm text-gray-500">{formattedDollar}</div>
              )}

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-700">알림 방식</div>
                <div className="flex gap-2">
                  <button
                    className={`rounded-xl px-3 py-2 text-sm ring-1 ${
                      !repeat
                        ? "bg-gray-900 text-white ring-gray-900"
                        : "bg-white text-gray-700 ring-gray-200"
                    }`}
                    onClick={() => setRepeat(false)}
                  >
                    1회
                  </button>
                  <button
                    className={`rounded-xl px-3 py-2 text-sm ring-1 ${
                      repeat
                        ? "bg-gray-900 text-white ring-gray-900"
                        : "bg-white text-gray-700 ring-gray-200"
                    }`}
                    onClick={() => setRepeat(true)}
                  >
                    반복
                  </button>
                </div>
              </div>

              <button className="mt-4 w-full rounded-2xl bg-emerald-500 py-3 text-sm font-semibold text-white transition active:scale-[0.99]">
                알림 저장
              </button>
            </div>

            <div className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

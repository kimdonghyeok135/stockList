"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  type CandlestickData,
  type IChartApi,
  type UTCTimestamp,
} from "lightweight-charts";

type Props = {
  symbol: string;
};

type Range = "1d" | "1w" | "1mo" | "1y";

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          open?: Array<number | null>;
          high?: Array<number | null>;
          low?: Array<number | null>;
          close?: Array<number | null>;
        }>;
      };
    }>;
  };
};

const INTERVAL_BY_RANGE: Record<Range, string> = {
  "1d": "15m",
  "1w": "1h",
  "1mo": "1d",
  "1y": "1wk",
};

export default function CandleStock({ symbol }: Props) {
  const [range, setRange] = useState<Range>("1d");
  const containerRef = useRef<HTMLDivElement>(null);

  const getCandleData = async (): Promise<YahooChartResponse> => {
    const interval = INTERVAL_BY_RANGE[range];
    const res = await fetch(
      `/api/stocks/${symbol}/candles?symbol=${symbol}&range=${range}&interval=${interval}`
    );

    if (!res.ok) {
      throw new Error(`Failed to load candle data (${res.status})`);
    }

    return res.json();
  };

  const {
    data: candleResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["candle", symbol, range],
    queryFn: getCandleData,
    refetchInterval: 300000,
  });

  const candles = useMemo<CandlestickData[]>(() => {
    const result = candleResponse?.chart?.result?.[0];
    const timestamps = result?.timestamp ?? [];
    const quote = result?.indicators?.quote?.[0];

    if (!quote) return [];

    const open = quote.open ?? [];
    const high = quote.high ?? [];
    const low = quote.low ?? [];
    const close = quote.close ?? [];

    const parsed: CandlestickData[] = [];

    for (let i = 0; i < timestamps.length; i += 1) {
      const ts = timestamps[i];
      const o = open[i];
      const h = high[i];
      const l = low[i];
      const c = close[i];

      if (ts == null || o == null || h == null || l == null || c == null) {
        continue;
      }

      parsed.push({
        time: ts as UTCTimestamp,
        open: o,
        high: h,
        low: l,
        close: c,
      });
    }

    return parsed;
  }, [candleResponse]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || candles.length === 0) return;

    const chart: IChartApi = createChart(container, {
      width: container.clientWidth,
      height: 360,
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#4b5563",
      },
      grid: {
        vertLines: { color: "#f3f4f6" },
        horzLines: { color: "#f3f4f6" },
      },
      rightPriceScale: {
        borderColor: "#e5e7eb",
      },
      timeScale: {
        borderColor: "#e5e7eb",
        timeVisible: range !== "1y",
        secondsVisible: false,
      },
      crosshair: {
        vertLine: { color: "#9ca3af", width: 1 },
        horzLine: { color: "#9ca3af", width: 1 },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderUpColor: "#16a34a",
      borderDownColor: "#dc2626",
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
      priceLineVisible: true,
    });

    candleSeries.setData(candles);
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      chart.applyOptions({ width: Math.floor(entry.contentRect.width) });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [candles, range]);

  return (
    <>
      <div
        ref={containerRef}
        className="mt-4 w-full rounded-2xl ring-1 ring-gray-200 overflow-hidden"
      >
        {isLoading ? (
          <div className="h-[360px] flex items-center justify-center text-sm text-gray-500">
            Loading chart...
          </div>
        ) : error ? (
          <div className="h-[360px] flex items-center justify-center text-sm text-rose-500">
            차트 데이터를 불러오지 못했습니다.
          </div>
        ) : candles.length === 0 ? (
          <div className="h-[360px] flex items-center justify-center text-sm text-gray-500">
            표시할 캔들 데이터가 없습니다.
          </div>
        ) : null}
      </div>

      {!isLoading ? (
        <div className="mt-4 flex items-center justify-center">
          <div className="flex w-full max-w-sm rounded-full bg-gray-100 p-1 ring-1 ring-gray-200">
            <button
              className={
                range === "1d"
                  ? "flex-1 py-2 rounded-full text-sm font-bold bg-[#4fd1c5] text-[#1a2b3c]"
                  : "flex-1 py-2 rounded-full text-sm font-bold text-gray-600"
              }
              onClick={() => {
                setRange("1d");
              }}
            >
              1D
            </button>
            <button
              className={
                range === "1w"
                  ? "flex-1 py-2 rounded-full text-sm font-bold bg-[#4fd1c5] text-[#1a2b3c]"
                  : "flex-1 py-2 rounded-full text-sm font-bold text-gray-600"
              }
              onClick={() => {
                setRange("1w");
              }}
            >
              1W
            </button>
            <button
              className={
                range === "1mo"
                  ? "flex-1 py-2 rounded-full text-sm font-bold bg-[#4fd1c5] text-[#1a2b3c]"
                  : "flex-1 py-2 rounded-full text-sm font-bold text-gray-600"
              }
              onClick={() => {
                setRange("1mo");
              }}
            >
              1M
            </button>
            <button
              className={
                range === "1y"
                  ? "flex-1 py-2 rounded-full text-sm font-bold bg-[#4fd1c5] text-[#1a2b3c]"
                  : "flex-1 py-2 rounded-full text-sm font-bold text-gray-600"
              }
              onClick={() => {
                setRange("1y");
              }}
            >
              1Y
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

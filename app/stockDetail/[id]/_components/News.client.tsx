"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronRight, CloudAlert } from "lucide-react";

export default function News({ symbol }: { symbol: string }) {
  const getNewsData = async () => {
    const res = await fetch(`/api/stocks/${symbol}/news?newsCnt=5`);
    if (!res.ok) {
      throw new Error(`Failed to load candle data (${res.status})`);
    }
    return await res.json();
  };

  const {
    data: newsQueryData,
    isLoading,
    error,
  } = useQuery<NewsTopProps>({
    queryKey: ["news", symbol],
    queryFn: getNewsData,
    refetchInterval: 1e6,
  });

  return (
    <div className="mt-4 rounded-3xl bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-gray-900">관련 뉴스</h3>
        <ChevronRight className="h-5 w-5 text-[#4fd1c5]" />
      </div>
      {isLoading ? (
        <>
          <div className="max-w-md p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </>
      ) : error ? (
        <div className="max-w-md p-6 bg-white rounded-2xl border border-red-50/50 shadow-sm flex flex-col items-center justify-center text-center">
          <CloudAlert className="h-10 w-10 text-[#ee1111]" />
          <h3 className="text-base font-bold text-gray-900 mb-1">뉴스를 불러올 수 없어요</h3>
          <p className="text-sm text-gray-500 mb-5">
            네트워크 연결이 불안정하거나
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
        </div>
      ) : (
        <>
          <div className={`mt-${newsQueryData?.count} space-y-${newsQueryData?.count}`}>
            {newsQueryData?.news.map((data) => {
              return (
                <div
                  key={data.uuid}
                  onClick={() => {
                    window.open(data.link, "_blank");
                  }}
                >
                  <div className={`flex items-start justify-between gap-${newsQueryData?.count}`}>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{data.title}</p>
                      <p className="mt-1 text-xs text-gray-400">{data.publisher}</p>
                    </div>
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#4fd1c5]" />
                  </div>
                  <div className="h-px bg-gray-100" />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type NewsTopProps = {
  count: [];
  news: NewsProps[];
};

type NewsProps = {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number; // Unix timestamp (seconds)
  type: "STORY" | string;
  thumbnail: Thumbnail;
  relatedTickers: string[];
};

type Thumbnail = {
  resolutions: Resolution[];
};

type Resolution = {
  url: string;
  width: number;
  height: number;
  tag: string;
};

export default function News({ symbol }: { symbol: string }) {
  const [newsCnt, setNewsCnt] = useState<number>(5);
  const [newsData, setNewsData] = useState<NewsTopProps>();
  const [visibleCnt, setVisibleCnt] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(true);
  const getNewsData = async () => {
    const res = await fetch(`/api/stocks/${symbol}/news?newsCnt=${newsCnt}`);
    if (!res.ok) {
      throw new Error(`Failed to load candle data (${res.status})`);
    }

    return await res.json();
  };
  useEffect(() => {
    getNewsData().then((data) => {
      console.log(data.news);
      setNewsData(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="mt-4 rounded-3xl bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-gray-900">관련 뉴스</h3>
        <ChevronRight className="h-5 w-5 text-[#4fd1c5]" />
      </div>
      {loading ? (
        <>
          <div className="mt-3 space-y-3">
            <div className="flex items-start justify-between gap-3 animate-pulse">
              <div>
                <p className="w-20 h-5 bg-gray-600 rounded ml-auto"></p>
                <p className="w-20 h-5 bg-gray-600 rounded ml-auto"></p>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="w-20 h-5 bg-gray-600 rounded ml-auto"></p>
                  <p className="w-20 h-5 bg-gray-600 rounded ml-auto"></p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`mt-${newsData?.count} space-y-${newsData?.count}`}>
            {newsData?.news.map((data) => {
              return (
                <div
                  key={data.uuid}
                  onClick={() => {
                    window.open(data.link, "_blank");
                  }}
                >
                  <div className={`flex items-start justify-between gap-${newsData?.count}`}>
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

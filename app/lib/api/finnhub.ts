import { StockOriginDataItem } from "@/types/stock";

const STOCK_API_KEY = process.env.FINNHUB_API_KEY;

export async function getStockInfo(symbol: string) {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${STOCK_API_KEY}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error("getStockInfo request failed", {
        symbol,
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });

      throw new Error(`getStockInfo Fail: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("getStockInfo Fail:")) {
      throw error;
    }
    console.error("getStockInfo unexpected error", {
      symbol,
      error,
    });
    throw error;
  }
}

export async function getStocksLists() {
  const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "AMD", "AVGO", "MU"];

  const callApi = symbols.map(async (symbol, index) => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${STOCK_API_KEY}`
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error("getStocksLists request failed", {
          symbol,
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        throw new Error(`getStocksLists Fail: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      return {
        id: index,
        symbol,
        data,
      };
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("getStocksLists Fail:")) {
        throw error;
      }

      console.error("getStocksLists unexpected error", {
        symbol,
        error,
      });

      throw error;
    }
  });

  // 트러블 슈팅
  // 모든 요청이 실패한 경우를 명확히 처리하기 위해 Promise.allSettled 사용 각 요청의 성공과 실패를 개별적으로 처리 > 실패한 요청이 전체 결과에 미치는 영향을 최소화
  //실패에 대한 경우 어떤 영향을 줄 수 있고 그 해결법에 대한 더 고민.
  const results = await Promise.allSettled(callApi);
  const successList = results
    .filter(
      (result): result is PromiseFulfilledResult<StockOriginDataItem> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value);

  const failedList = results.filter((result) => result.status === "rejected");
  console.log("successList", successList);
  console.log("failedList", failedList);
  if (failedList.length === symbols.length) {
    throw new Error("All stock requests failed");
  }
  return successList;
}

export async function getStockDetailInfo(symbol: string) {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${STOCK_API_KEY}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error("getStockDetailInfo request failed", {
        symbol,
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`getStockDetailInfo Fail: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    //에러 로그 중복을 막기 위함.
    if (error instanceof Error && error.message.startsWith("getStockDetailInfo Fail:")) {
      throw error;
    }

    console.error("getStockDetailInfo unexpected error", {
      symbol,
      error,
    });

    throw error;
  }
}

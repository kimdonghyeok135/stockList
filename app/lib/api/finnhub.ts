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

  return Promise.all(callApi);
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

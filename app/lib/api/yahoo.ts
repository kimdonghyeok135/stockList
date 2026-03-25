export async function getStockDataCandle(symbol: string, range: string, interval: string) {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${range}&interval=${interval}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error("getStockDataCandle request failed", {
        symbol,
        range,
        interval,
        errorText,
      });
      throw new Error(`getStockDataCandle Fail: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("getStockDataCandle Fail:")) {
      throw error;
    }
    console.error("getStockDataCandle unexpected error", {
      symbol,
      range,
      interval,
      error,
    });
    throw error;
  }
}

export async function getStockNews(symbol: string, newsCnt: number) {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${symbol}&newsCount=${newsCnt}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error("getStockNews request failed", {
        symbol,
        errorText,
      });
      throw new Error(`getStockNews Fail: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("getStockNews Fail:")) {
      throw error;
    }
    console.error("getStockNews unexpected error", {
      symbol,
      error,
    });
    throw error;
  }
}

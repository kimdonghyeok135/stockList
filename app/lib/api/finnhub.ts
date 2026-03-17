const STOCK_API_KEY = process.env.FINNHUB_API_KEY;

export async function getStockInfo(symbol: string) {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${STOCK_API_KEY}`
  );
  if (!response.ok) throw new Error("getStockInfo Fail");
  const data = await response.json();
  const refindData = {
    currentPrice: data.c,
    priceChange: data.d,
    percentChange: data.dp,
    highPrice: data.h,
    lowPrice: data.l,
    openPrice: data.o,
    previousClose: data.pc,
    timestamp: data.t,
  };

  return refindData;
}

export async function getStocksLists() {
  const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "AMD", "AVGO", "MU"];

  const callApi = symbols.map(async (symbol, index) => {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${STOCK_API_KEY}`
    );
    if (!response.ok) throw new Error("getStocksLists Fail");
    const data = await response.json();
    const refineData = {
      currentPrice: data.c,
      priceChange: data.d,
      percentChange: data.dp,
      highPrice: data.h,
      lowPrice: data.l,
      openPrice: data.o,
      previousClose: data.pc,
      timestamp: data.t,
    };
    return {
      id: index,
      symbol,
      data: refineData,
    };
  });
  await new Promise((res) => setTimeout(res, 3000));
  const apiListsDatas = await Promise.all(callApi);
  return apiListsDatas;
}

export async function getStockDetailInfo(symbol: string) {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${STOCK_API_KEY}`
  );
  const data = await response.json();
  return data;
}

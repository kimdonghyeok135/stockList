export async function getStockInfo(symbol: string) {
  const API_KEY = "d53561pr01qggm5vard0d53561pr01qggm5vardg";
  const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
  const data = await response.json();
  return data;
}

export async function getStocksLists() {
  const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "AMD", "AVGO", "MU"];
  const API_KEY = "d53561pr01qggm5vard0d53561pr01qggm5vardg";
  const callApi = symbols.map(async (symbol, index) => {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
    );
    const data = await response.json();
    return {
      id: index,
      symbol,
      data,
    };
  });
  await new Promise((res) => setTimeout(res, 3000));
  const apiListsDatas = await Promise.all(callApi);
  return apiListsDatas;
}

export async function getStockDetailInfo(symbol: string) {
  const API_KEY = "d53561pr01qggm5vard0d53561pr01qggm5vardg";
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`
  );
  const data = await response.json();
  return data;
}

export async function getStockDataCandle(symbol: string, range: string, interval: string) {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${range}&interval=${interval}`
  );
  const data = await response.json();
  return data;
}

export async function getStockNews(symbol: string, newsCnt: number) {
  console.log("symbol", symbol);
  console.log("newsCnt", newsCnt);
  const res = await fetch(
    `https://query1.finance.yahoo.com/v1/finance/search?q=${symbol}&newsCount=${newsCnt}`
  );
  const data = await res.json();
  return data;
}

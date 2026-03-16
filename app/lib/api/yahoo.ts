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

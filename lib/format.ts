export function formatCurrency(value: number, currency: string = "USD") {
  if (value == null) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

export function formatNumber(value: number) {
  if (value == null) return "-";
  return value.toFixed(2);
}

export function formatTimestamp(timestamp: number) {
  if (!timestamp) return "-";
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

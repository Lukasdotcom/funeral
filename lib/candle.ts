const candle_map: Record<string, string> = {
  gelb: "amber",
  blau: "blue",
  rot: "red",
  grün: "green",
  grau: "gray",
};

export const CandleColors = Object.keys(candle_map);

export function getCandleColor(color: string) {
  return candle_map[color] || "amber";
}

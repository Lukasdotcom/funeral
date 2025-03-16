const candle_map: Record<string, string> = {
  gelb: "text-amber-500 dark:text-amber-400",
  blau: "text-blue-500 dark:text-blue-400",
  rot: "text-red-500 dark:text-red-400",
  grün: "text-green-500 dark:text-green-400",
  grau: "text-gray-500 dark:text-gray-400",
};

export const CandleColors = Object.keys(candle_map);

export function getCandleColor(color: string) {
  return candle_map[color] || candle_map["gelb"];
}

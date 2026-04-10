import type { GolferPick } from "../types";

function formatScore(score: number | null): string {
  if (score === null) return "--";
  if (score === 0) return "E";
  if (score > 0) return `+${score}`;
  return `${score}`;
}

function scoreColor(score: number | null): string {
  if (score === null) return "text-gray-400";
  if (score < 0) return "text-score-birdie font-medium";
  if (score > 0) return "text-score-bogey font-medium";
  return "text-score-par";
}

function rowClassName(highlight?: "best" | "worst"): string {
  if (highlight === "best")
    return "bg-green-100/70 border-t border-green-200 border-l-2 border-l-score-birdie";
  if (highlight === "worst")
    return "bg-red-100/70 border-t border-red-200 border-l-2 border-l-score-bogey";
  return "bg-augusta-light/50 border-t border-augusta-light";
}

export function GolferScoreRow({ golfer, highlight }: { golfer: GolferPick; highlight?: "best" | "worst" }) {
  return (
    <tr className={rowClassName(highlight)}>
      <td></td>
      <td className="py-1.5 pl-8 text-sm text-gray-600">
        {golfer.name}
      </td>
      <td></td>
      <td className={`py-1.5 px-3 text-center text-sm tabular-nums ${scoreColor(golfer.thursday)}`}>
        {formatScore(golfer.thursday)}
      </td>
      <td className={`py-1.5 px-3 text-center text-sm tabular-nums ${scoreColor(golfer.friday)}`}>
        {formatScore(golfer.friday)}
      </td>
      <td className={`py-1.5 px-3 text-center text-sm tabular-nums ${scoreColor(golfer.saturday)}`}>
        {formatScore(golfer.saturday)}
      </td>
      <td className={`py-1.5 px-3 text-center text-sm tabular-nums ${scoreColor(golfer.sunday)}`}>
        {formatScore(golfer.sunday)}
      </td>
      <td className={`py-1.5 px-3 text-center text-sm tabular-nums font-semibold ${scoreColor(golfer.total)}`}>
        {formatScore(golfer.total)}
      </td>
    </tr>
  );
}

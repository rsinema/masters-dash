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

export function GolferScoreRow({ golfer }: { golfer: GolferPick }) {
  return (
    <tr className="bg-augusta-light/50 border-t border-augusta-light">
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

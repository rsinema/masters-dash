import { useMemo } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Participant } from "../types";
import { getGlobalBestWorst, type GlobalBestWorst } from "../lib/parseEntries";

function formatScore(score: number): string {
  if (score === 0) return "E";
  if (score > 0) return `+${score}`;
  return `${score}`;
}

function PickCard({
  kind,
  data,
}: {
  kind: "best" | "worst";
  data: GlobalBestWorst;
}) {
  const isBest = kind === "best";

  return (
    <div
      className={`flex-1 rounded-lg p-4 ${
        isBest ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {isBest ? (
          <TrendingDown className="w-5 h-5 text-score-birdie" />
        ) : (
          <TrendingUp className="w-5 h-5 text-score-bogey" />
        )}
        <span
          className={`text-xs font-semibold uppercase tracking-wide ${
            isBest ? "text-score-birdie" : "text-score-bogey"
          }`}
        >
          {isBest ? "Best Pick" : "Worst Pick"}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-display font-bold text-gray-900">
          {data.golferName}
        </span>
        <span
          className={`text-lg font-bold tabular-nums ${
            isBest ? "text-score-birdie" : "text-score-bogey"
          }`}
        >
          {formatScore(data.total)}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Picked by {data.pickedBy.join(", ")}
      </p>
    </div>
  );
}

export function BestWorstCard({
  participants,
}: {
  participants: Participant[];
}) {
  const { best, worst } = useMemo(
    () => getGlobalBestWorst(participants),
    [participants]
  );

  if (!best && !worst) return null;

  // If best and worst are the same golfer (only one scored golfer globally)
  const sameGolfer = best && worst && best.golferName === worst.golferName;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
      <h3 className="text-sm font-display font-semibold text-augusta-green mb-3">
        Best &amp; Worst Picks
      </h3>
      {sameGolfer ? (
        <div className="flex justify-center">
          <div className="rounded-lg bg-augusta-light/50 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">
              Only scored pick so far
            </p>
            <span className="font-display font-bold text-gray-900">
              {best.golferName}
            </span>
            <span className="ml-2 text-lg font-bold tabular-nums text-score-birdie">
              {formatScore(best.total)}
            </span>
            <p className="text-xs text-gray-500 mt-1">
              Picked by {best.pickedBy.join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          {best && <PickCard kind="best" data={best} />}
          {worst && <PickCard kind="worst" data={worst} />}
        </div>
      )}
    </div>
  );
}

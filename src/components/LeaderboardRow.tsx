import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, ChevronRight, Trophy } from "lucide-react";
import type { Participant } from "../types";
import { PaymentBadge } from "./PaymentBadge";
import { GolferScoreRow } from "./GolferScoreRow";

function formatScore(score: number | null): string {
  if (score === null) return "--";
  if (score === 0) return "E";
  if (score > 0) return `+${score}`;
  return `${score}`;
}

function scoreColor(score: number | null): string {
  if (score === null) return "text-gray-400";
  if (score < 0) return "text-score-birdie";
  if (score > 0) return "text-score-bogey";
  return "text-score-par";
}

function rankIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-augusta-gold" />;
  if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Trophy className="w-5 h-5 text-amber-700" />;
  return <span className="text-sm text-score-par tabular-nums">{rank}</span>;
}

function RankChangeIndicator({ change }: { change: number }) {
  if (change === 0) return null;

  if (change > 0) {
    return (
      <span className="text-xs font-semibold text-score-birdie ml-1">
        ▲{change}
      </span>
    );
  }

  return (
    <span className="text-xs font-semibold text-score-bogey ml-1">
      ▼{Math.abs(change)}
    </span>
  );
}

function computeRoundTotal(
  participant: Participant,
  round: "thursday" | "friday" | "saturday" | "sunday"
): number | null {
  const scores = participant.golfers
    .map((g) => g[round])
    .filter((s): s is number => s !== null);
  return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) : null;
}

function useScoreFlash(scores: Record<string, number | null>): Set<string> {
  const prevRef = useRef<Record<string, number | null>>(scores);
  const [flashing, setFlashing] = useState<Set<string>>(new Set());

  useEffect(() => {
    const changed = new Set<string>();
    for (const key of Object.keys(scores)) {
      if (prevRef.current[key] !== scores[key] && prevRef.current[key] !== undefined) {
        changed.add(key);
      }
    }
    prevRef.current = scores;

    if (changed.size > 0) {
      setFlashing(changed);
      const timer = setTimeout(() => setFlashing(new Set()), 1500);
      return () => clearTimeout(timer);
    }
  }, [scores]);

  return flashing;
}

export function LeaderboardRow({ participant, rankChange }: { participant: Participant; rankChange: number }) {
  const [expanded, setExpanded] = useState(false);

  const r1 = computeRoundTotal(participant, "thursday");
  const r2 = computeRoundTotal(participant, "friday");
  const r3 = computeRoundTotal(participant, "saturday");
  const r4 = computeRoundTotal(participant, "sunday");

  const scoreKey = `${r1},${r2},${r3},${r4},${participant.totalScore}`;
  const scores = useMemo(
    () => ({ r1, r2, r3, r4, total: participant.totalScore } as Record<string, number | null>),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scoreKey]
  );
  const flashing = useScoreFlash(scores);

  const flash = (key: string) => flashing.has(key) ? "score-flash" : "";

  return (
    <>
      <tr
        className="cursor-pointer hover:bg-augusta-light/70 transition-colors border-t border-gray-100"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="py-3 px-3 text-center w-16">
          <span className="inline-flex items-center justify-center gap-0.5">
            {rankIcon(participant.rank)}
            <RankChangeIndicator change={rankChange} />
          </span>
        </td>
        <td className="py-3 px-3">
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            )}
            <span className="font-medium text-gray-900">
              {participant.name}
            </span>
          </div>
        </td>
        <td className="py-3 px-3 text-center">
          <PaymentBadge paid={participant.paid} />
        </td>
        <td className={`py-3 px-3 text-center tabular-nums ${scoreColor(r1)} ${flash("r1")}`}>
          {formatScore(r1)}
        </td>
        <td className={`py-3 px-3 text-center tabular-nums ${scoreColor(r2)} ${flash("r2")}`}>
          {formatScore(r2)}
        </td>
        <td className={`py-3 px-3 text-center tabular-nums ${scoreColor(r3)} ${flash("r3")}`}>
          {formatScore(r3)}
        </td>
        <td className={`py-3 px-3 text-center tabular-nums ${scoreColor(r4)} ${flash("r4")}`}>
          {formatScore(r4)}
        </td>
        <td
          className={`py-3 px-3 text-center tabular-nums font-bold text-lg ${scoreColor(participant.totalScore || null)} ${flash("total")}`}
        >
          {formatScore(participant.totalScore)}
        </td>
      </tr>
      {expanded &&
        participant.golfers.map((golfer) => (
          <GolferScoreRow key={golfer.name} golfer={golfer} />
        ))}
    </>
  );
}

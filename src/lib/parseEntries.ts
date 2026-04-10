import type { GolferPick, Participant } from "../types";
import { PAR } from "../config/constants";

function parseScore(val: string | undefined): number | null {
  if (!val) return null;
  const trimmed = val.trim();
  if (trimmed === "" || trimmed === "--") return null;
  if (trimmed.toUpperCase() === "E") return 0;
  if (trimmed.toUpperCase() === "MC" || trimmed.toUpperCase() === "CUT") {
    return null;
  }
  const n = Number(trimmed);
  if (isNaN(n) || n === 0) return null;
  // Convert total strokes to score relative to par
  return n - PAR;
}

export function parseEntries(rows: string[][]): Participant[] {
  const participants: Participant[] = [];

  // Skip header row (row 0), process in 6-row blocks
  let i = 1;
  while (i + 5 <= rows.length) {
    const headerRow = rows[i];
    if (!headerRow) break;

    const participantName = (headerRow[2] ?? "").trim();

    // Stop if we hit empty blocks
    if (!participantName) {
      i += 6;
      continue;
    }

    const paid =
      (headerRow[1] ?? "").trim().toLowerCase() === "paid";

    const golfers: GolferPick[] = [];
    for (let g = 1; g <= 4; g++) {
      const row = rows[i + g];
      if (!row) break;

      const name = (row[3] ?? "").trim();
      if (!name) continue;

      const thursday = parseScore(row[4]);
      const friday = parseScore(row[5]);
      const saturday = parseScore(row[6]);
      const sunday = parseScore(row[7]);

      const rounds = [thursday, friday, saturday, sunday].filter(
        (s): s is number => s !== null
      );
      const total = rounds.length > 0 ? rounds.reduce((a, b) => a + b, 0) : null;

      golfers.push({ name, thursday, friday, saturday, sunday, total });
    }

    const totalScore = golfers.reduce(
      (sum, g) => sum + (g.total ?? 0),
      0
    );

    participants.push({
      name: participantName,
      paid,
      golfers,
      totalScore,
      rank: 0, // computed below
    });

    i += 6;
  }

  // Rank participants (lower score is better in golf)
  participants.sort((a, b) => a.totalScore - b.totalScore);

  let currentRank = 1;
  for (let j = 0; j < participants.length; j++) {
    if (j > 0 && participants[j]!.totalScore !== participants[j - 1]!.totalScore) {
      currentRank = j + 1;
    }
    participants[j]!.rank = currentRank;
  }

  return participants;
}

export function hasAnyScores(participants: Participant[]): boolean {
  return participants.some((p) =>
    p.golfers.some((g) => g.total !== null)
  );
}

export function getCurrentRound(participants: Participant[]): number {
  let maxRound = 0;
  for (const p of participants) {
    for (const g of p.golfers) {
      if (g.sunday !== null) return 4;
      if (g.saturday !== null) maxRound = Math.max(maxRound, 3);
      if (g.friday !== null) maxRound = Math.max(maxRound, 2);
      if (g.thursday !== null) maxRound = Math.max(maxRound, 1);
    }
  }
  return maxRound;
}

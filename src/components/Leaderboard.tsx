import type { Participant } from "../types";
import { LeaderboardRow } from "./LeaderboardRow";

interface Props {
  participants: Participant[];
}

export function Leaderboard({ participants }: Props) {
  if (participants.length === 0) {
    return (
      <div className="text-center py-12 text-score-par">
        No participants found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-augusta-green text-white text-sm">
            <th className="py-3 px-3 text-center font-semibold w-12">Rank</th>
            <th className="py-3 px-3 font-semibold">Participant</th>
            <th className="py-3 px-3 text-center font-semibold">Status</th>
            <th className="py-3 px-3 text-center font-semibold">R1</th>
            <th className="py-3 px-3 text-center font-semibold">R2</th>
            <th className="py-3 px-3 text-center font-semibold">R3</th>
            <th className="py-3 px-3 text-center font-semibold">R4</th>
            <th className="py-3 px-3 text-center font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <LeaderboardRow key={p.name} participant={p} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

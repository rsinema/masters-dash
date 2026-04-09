import { useMemo, useState } from "react";
import { useSheetData } from "./hooks/useSheetData";
import { hasAnyScores, getCurrentRound } from "./lib/parseEntries";
import { MastersBanner } from "./components/MastersBanner";
import { RefreshIndicator } from "./components/RefreshIndicator";
import { SearchFilter } from "./components/SearchFilter";
import { Leaderboard } from "./components/Leaderboard";
import { Loader2, ExternalLink } from "lucide-react";

const ROUND_LABELS = ["", "Round 1 (Thursday)", "Round 2 (Friday)", "Round 3 (Saturday)", "Round 4 (Sunday)"];

export default function App() {
  const { data: participants, dataUpdatedAt, isFetching, isLoading, isError } =
    useSheetData();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!participants) return [];
    if (!search.trim()) return participants;
    const q = search.toLowerCase();
    return participants.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.golfers.some((g) => g.name.toLowerCase().includes(q))
    );
  }, [participants, search]);

  const scoresExist = participants ? hasAnyScores(participants) : false;
  const currentRound = participants ? getCurrentRound(participants) : 0;

  return (
    <div className="min-h-screen bg-augusta-cream">
      <MastersBanner />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* Status bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            {scoresExist && currentRound > 0 && (
              <span className="text-sm font-medium text-augusta-green bg-augusta-light rounded-full px-3 py-1">
                {ROUND_LABELS[currentRound]}
              </span>
            )}
            {!scoresExist && participants && (
              <span className="text-sm text-score-par italic">
                Tournament starts Thursday, April 10 — scores will appear here once play begins
              </span>
            )}
          </div>
          <RefreshIndicator
            dataUpdatedAt={dataUpdatedAt}
            isFetching={isFetching}
          />
        </div>

        {/* Search */}
        <SearchFilter value={search} onChange={setSearch} />

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 gap-3 text-augusta-green">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading entries...</span>
          </div>
        )}

        {/* Error state */}
        {isError && !participants && (
          <div className="text-center py-12">
            <p className="text-score-bogey font-medium mb-2">
              Failed to load data from Google Sheets
            </p>
            <p className="text-sm text-score-par">
              Make sure the spreadsheet is publicly viewable and try refreshing.
            </p>
          </div>
        )}

        {/* Leaderboard */}
        {participants && <Leaderboard participants={filtered} />}

        {/* Footer */}
        <footer className="text-center py-4 text-xs text-score-par space-y-1">
          <p>
            {participants?.length ?? 0} participants &middot;{" "}
            {participants?.reduce((n, p) => n + (p.paid ? 1 : 0), 0) ?? 0} paid
          </p>
          <a
            href="https://docs.google.com/spreadsheets/d/1gI3EoWin1IDaT2ZRW43d6rZWYv-d6W8a47KXmYtNiA4/edit?gid=1263132281#gid=1263132281"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-augusta-green hover:underline"
          >
            View spreadsheet <ExternalLink className="w-3 h-3" />
          </a>
        </footer>
      </main>
    </div>
  );
}

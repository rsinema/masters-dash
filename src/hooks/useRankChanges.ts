import { useRef, useMemo } from "react";
import type { Participant } from "../types";

const STORAGE_KEY_RANKS = "masters-prev-ranks";
const STORAGE_KEY_CHANGES = "masters-rank-changes";

function loadMap(key: string): Map<string, number> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return new Map(JSON.parse(raw) as [string, number][]);
  } catch { /* ignore corrupt data */ }
  return new Map();
}

function saveMap(key: string, map: Map<string, number>) {
  try {
    localStorage.setItem(key, JSON.stringify([...map]));
  } catch { /* storage full or unavailable */ }
}

export function useRankChanges(
  participants: Participant[] | undefined,
  dataUpdatedAt: number
): Map<string, number> {
  const prevRanksRef = useRef<Map<string, number>>(loadMap(STORAGE_KEY_RANKS));
  const lastUpdatedAtRef = useRef(0);
  const rankChangesRef = useRef<Map<string, number>>(loadMap(STORAGE_KEY_CHANGES));

  return useMemo(() => {
    if (!participants || !dataUpdatedAt) return rankChangesRef.current;
    if (dataUpdatedAt === lastUpdatedAtRef.current) return rankChangesRef.current;

    const prevRanks = prevRanksRef.current;
    const newChanges = new Map<string, number>();

    // First load with no cached baseline — just snapshot, no arrows
    if (prevRanks.size === 0) {
      const snapshot = new Map<string, number>();
      for (const p of participants) {
        snapshot.set(p.name, p.rank);
      }
      prevRanksRef.current = snapshot;
      saveMap(STORAGE_KEY_RANKS, snapshot);
    } else {
      for (const p of participants) {
        const prev = prevRanks.get(p.name);
        if (prev !== undefined && prev !== p.rank) {
          newChanges.set(p.name, prev - p.rank);
        }
      }

      // Only update baseline and displayed arrows when ranks actually changed
      if (newChanges.size > 0) {
        const snapshot = new Map<string, number>();
        for (const p of participants) {
          snapshot.set(p.name, p.rank);
        }
        prevRanksRef.current = snapshot;
        rankChangesRef.current = newChanges;
        saveMap(STORAGE_KEY_RANKS, snapshot);
        saveMap(STORAGE_KEY_CHANGES, newChanges);
      }
    }

    lastUpdatedAtRef.current = dataUpdatedAt;
    return rankChangesRef.current;
  }, [participants, dataUpdatedAt]);
}

import { useQuery } from "@tanstack/react-query";
import { fetchSheetCSV } from "../lib/fetchSheet";
import { parseEntries } from "../lib/parseEntries";
import { getRefreshInterval } from "../config/constants";
import type { Participant } from "../types";

export function useSheetData() {
  return useQuery<Participant[]>({
    queryKey: ["masters-entries"],
    queryFn: async () => {
      const rows = await fetchSheetCSV();
      return parseEntries(rows);
    },
    refetchInterval: getRefreshInterval(),
    staleTime: 30_000,
    retry: 3,
  });
}

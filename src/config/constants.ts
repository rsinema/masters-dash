export const PAR = 72; // Augusta National par per round

export const SHEET_ID = "1gI3EoWin1IDaT2ZRW43d6rZWYv-d6W8a47KXmYtNiA4";
export const GID = "1263132281";

export const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;

export const REFRESH_INTERVAL_TOURNAMENT = 60_000; // 1 minute during tournament
export const REFRESH_INTERVAL_IDLE = 300_000; // 5 minutes off-hours

export function getRefreshInterval(): number {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 4=Thu, 5=Fri, 6=Sat
  const hour = now.getHours();

  const isTournamentDay = day >= 4 || day === 0; // Thu-Sun
  const isDuringPlay = hour >= 8 && hour <= 20;

  if (isTournamentDay && isDuringPlay) {
    return REFRESH_INTERVAL_TOURNAMENT;
  }
  return REFRESH_INTERVAL_IDLE;
}

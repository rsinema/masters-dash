export const PAR = 72; // Augusta National par per round

const isDev = import.meta.env.VITE_ENV === "dev";

const PROD_SHEET_ID = "1gI3EoWin1IDaT2ZRW43d6rZWYv-d6W8a47KXmYtNiA4";
const PROD_GID = "1263132281";

const DEV_SHEET_ID = "1bamlbCr5nrkprC3oXhmeCaNCXN_h1-ixnYcH1vYVVIo";
const DEV_GID = "1263132281";



export const SHEET_ID = isDev ? DEV_SHEET_ID : PROD_SHEET_ID;
export const GID = isDev ? DEV_GID : PROD_GID;

export const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;

export const REFRESH_INTERVAL_TOURNAMENT = isDev ? 15_000 : 60_000; // dev: 15s, prod: 1 min
export const REFRESH_INTERVAL_IDLE = isDev ? 30_000 : 300_000; // dev: 30s, prod: 5 min

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

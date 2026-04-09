import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  dataUpdatedAt: number;
  isFetching: boolean;
}

export function RefreshIndicator({ dataUpdatedAt, isFetching }: Props) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondsAgo = dataUpdatedAt
    ? Math.floor((now - dataUpdatedAt) / 1000)
    : null;

  const label =
    secondsAgo === null
      ? "Loading..."
      : secondsAgo < 5
        ? "Just updated"
        : `Updated ${secondsAgo}s ago`;

  return (
    <div className="flex items-center gap-2 text-sm text-augusta-green">
      <RefreshCw
        className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
      />
      <span>{label}</span>
      {isFetching && (
        <span className="text-xs text-score-par">(refreshing...)</span>
      )}
    </div>
  );
}

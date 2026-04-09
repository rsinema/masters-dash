import { Flag } from "lucide-react";

export function MastersBanner() {
  return (
    <header className="bg-augusta-dark text-white border-b-4 border-augusta-yellow">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-1">
          <Flag className="w-8 h-8 text-augusta-yellow" />
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight italic">
            The Masters
          </h1>
          <Flag className="w-8 h-8 text-augusta-yellow" />
        </div>
        <p className="font-display text-augusta-yellow text-lg italic">
          Fantasy Pick'em 2026
        </p>
      </div>
    </header>
  );
}

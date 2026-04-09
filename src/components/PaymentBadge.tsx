import { Check, X } from "lucide-react";

export function PaymentBadge({ paid }: { paid: boolean }) {
  if (paid) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-augusta-green bg-augusta-light rounded-full px-2 py-0.5">
        <Check className="w-3 h-3" />
        Paid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-score-bogey bg-red-50 rounded-full px-2 py-0.5">
      <X className="w-3 h-3" />
      Unpaid
    </span>
  );
}

"use client";

import { useLocale } from "./LocaleProvider";
import type { ComplaintStatus } from "@/lib/types";

const statusColors: Record<ComplaintStatus, string> = {
  pending: "bg-mustard/20 text-mustard-dark",
  approved: "bg-teal/20 text-teal-dark",
  rejected: "bg-red-100 text-red-700",
  resolved: "bg-green-100 text-green-700",
};

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  const { t } = useLocale();
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
    >
      {t(`status_${status}`)}
    </span>
  );
}

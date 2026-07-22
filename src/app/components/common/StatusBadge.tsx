const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  "Open":        { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400"   },
  "In Progress": { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400"    },
  "Completed":   { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Critical":    { bg: "bg-red-50",     text: "text-red-700",     dot: "bg-red-400"     },
};

type Props= {
  status: string;
}


export default function StatusBadge({ status }: Props) {
  const c = STATUS_STYLES[status] ?? { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}
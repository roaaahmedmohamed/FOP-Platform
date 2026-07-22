const PRIORITY_STYLES: Record<string, string> = {
  "Critical": "text-red-600    bg-red-50    border-red-200",
  "High":     "text-orange-600 bg-orange-50 border-orange-200",
  "Medium":   "text-amber-600  bg-amber-50  border-amber-200",
  "Low":      "text-slate-500  bg-slate-50  border-slate-200",
};

type Props ={
  priority: string;
}

export default function PriorityBadge({
  priority,
}: Props) {
  const c = PRIORITY_STYLES[priority] ?? "";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${c}`}>
      {priority}
    </span>
  );
}
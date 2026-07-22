import { TrendingUp } from "lucide-react";

type Props ={
  label: string;
  value: string;
  delta: string;
  icon: React.ElementType;
  iconClass: string;
}

export default function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  iconClass,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />{delta}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}
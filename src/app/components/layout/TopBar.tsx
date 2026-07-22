import { Bell } from "lucide-react";

type TopBarProps ={
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export default function TopBar({
    title,
    subtitle,
    children
}: TopBarProps) {
  return (
    <div className="h-16 border-b border-slate-100 flex items-center px-8 gap-4 bg-white shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-[15px] font-semibold text-slate-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 leading-tight">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2.5">
        {children}
        <button className="relative p-2 rounded-xl hover:bg-slate-50 transition">
          <Bell className="w-4 h-4 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#0F766E] rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#0F766E]/10 flex items-center justify-center">
          <span className="text-xs font-bold text-[#0F766E]">AJ</span>
        </div>
      </div>
    </div>
  );
}
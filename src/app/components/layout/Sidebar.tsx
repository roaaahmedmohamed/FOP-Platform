import { ClipboardList, LayoutDashboard, LogOut, Plus, Settings, Wrench } from "lucide-react";

type Screen = "login" | "dashboard" | "requests" | "create" | "detail";


type SidebarProps= {
  screen: Screen;
  onNav: (s: Screen) => void;
}


export default function Sidebar({
  screen,
  onNav,
}: SidebarProps) {
  const nav = [
    { id: "dashboard" as Screen, label: "Dashboard", icon: LayoutDashboard },
    { id: "requests"  as Screen, label: "Requests",  icon: ClipboardList   },
    { id: "create"    as Screen, label: "New Request",icon: Plus            },
  ];
  return (
    <aside className="w-60 bg-white border-r border-slate-100 flex flex-col h-full shrink-0">
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0F766E] flex items-center justify-center shadow shadow-emerald-200">
            <Wrench className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900 tracking-tight">FOP</p>
            <p className="text-[10px] text-slate-400">Facility Operations</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Main</p>
        {nav.map(({ id, label, icon: Icon }) => {
          const active = screen === id;
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                active ? "bg-[#0F766E]/10 text-[#0F766E]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {id === "requests" && (
                <span className="ml-auto text-[10px] bg-[#0F766E] text-white rounded-full px-1.5 py-0.5 font-bold">12</span>
              )}
            </button>
          );
        })}

        <div className="pt-5">
          <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Settings</p>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all">
            <Settings className="w-4 h-4" />Settings
          </button>
        </div>
      </nav>

      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0F766E]/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-[#0F766E]">AJ</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">Alex Johnson</p>
            <p className="text-[10px] text-slate-400 truncate">alex@acmecorp.com</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
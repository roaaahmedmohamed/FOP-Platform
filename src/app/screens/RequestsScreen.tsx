import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import PriorityBadge from "../components/common/PriorityBadge";
import StatusBadge from "../components/common/StatusBadge";




const requests = [
  { id: "REQ-001", title: "HVAC System Failure — Building A", category: "HVAC", priority: "High", status: "Open", department: "Engineering", location: "Floor 3", assignee: "Marcus Chen", date: "Jul 18, 2026" },
  { id: "REQ-002", title: "Broken Conference Room Projector", category: "Equipment", priority: "Medium", status: "In Progress", department: "IT", location: "Room 204", assignee: "Sarah Kim", date: "Jul 17, 2026" },
  { id: "REQ-003", title: "Water Leak in Server Room", category: "Plumbing", priority: "Critical", status: "In Progress", department: "Facilities", location: "Basement B1", assignee: "James Park", date: "Jul 17, 2026" },
  { id: "REQ-004", title: "Elevator Maintenance — East Wing", category: "Mechanical", priority: "Low", status: "Completed", department: "Operations", location: "East Wing", assignee: "Diana Ross", date: "Jul 15, 2026" },
  { id: "REQ-005", title: "Office Lighting Replacement", category: "Electrical", priority: "Medium", status: "Open", department: "Facilities", location: "Floor 5", assignee: "—", date: "Jul 14, 2026" },
  { id: "REQ-006", title: "Parking Lot Signage Update", category: "Infrastructure", priority: "Low", status: "Completed", department: "Admin", location: "Parking B", assignee: "Tom Walker", date: "Jul 12, 2026" },
  { id: "REQ-007", title: "Fire Suppression System Test", category: "Safety", priority: "High", status: "Open", department: "Safety", location: "All Floors", assignee: "Nina Patel", date: "Jul 11, 2026" },
  { id: "REQ-008", title: "Cafeteria Ventilation Issue", category: "HVAC", priority: "Medium", status: "In Progress", department: "Facilities", location: "Ground Floor", assignee: "Carlos Mendez", date: "Jul 10, 2026" },
];


type Screen = "login" | "dashboard" | "requests" | "create" | "detail";

export default function RequestsScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage]               = useState(1);

  const filtered = requests.filter(r => {
    const q = search.toLowerCase();
    return (
      (r.title.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)) &&
      (statusFilter === "All" || r.status === statusFilter)
    );
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/60">
      <TopBar title="Maintenance Requests" subtitle={`${requests.length} total requests`}>
        <button
          onClick={() => onNav("create")}
          className="flex items-center gap-2 bg-[#0F766E] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#0D6B64] transition shadow-sm"
        >
          <Plus className="w-4 h-4" />New Request
        </button>
      </TopBar>

      <div className="p-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-4 p-4 border-b border-slate-100">
            <div className="flex-1 relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by title or ID..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex gap-1">
                {["All", "Open", "In Progress", "Completed"].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      statusFilter === s ? "bg-[#0F766E] text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="px-5 py-3">
                    <input type="checkbox" className="rounded w-3.5 h-3.5 accent-[#0F766E]" />
                  </th>
                  {["ID", "Title", "Category", "Priority", "Status", "Assignee", "Location", "Date", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(req => (
                  <tr
                    key={req.id}
                    onClick={() => onNav("detail")}
                    className="hover:bg-slate-50/60 transition cursor-pointer group"
                  >
                    <td className="px-5 py-3.5">
                      <input type="checkbox" className="rounded w-3.5 h-3.5 accent-[#0F766E]" onClick={e => e.stopPropagation()} />
                    </td>
                    <td className="px-4 py-3.5 text-xs font-mono text-slate-400 whitespace-nowrap">{req.id}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-slate-800 max-w-60 truncate group-hover:text-[#0F766E] transition">{req.title}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{req.category}</td>
                    <td className="px-4 py-3.5"><PriorityBadge priority={req.priority} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={req.status} /></td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{req.assignee}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{req.location}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">{req.date}</td>
                    <td className="px-4 py-3.5">
                      <button
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 transition"
                        onClick={e => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">Showing <span className="font-medium text-slate-600">{filtered.length}</span> of <span className="font-medium text-slate-600">{requests.length}</span> results</p>
            <div className="flex items-center gap-1">
              {([1, 2, 3, "…", 8] as (number | string)[]).map((p, i) => (
                <button
                  key={i}
                  onClick={() => typeof p === "number" && setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
                    page === p ? "bg-[#0F766E] text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
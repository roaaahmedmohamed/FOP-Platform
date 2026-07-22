import { useState } from "react";
import {
  LayoutDashboard, ClipboardList, Plus, Settings, Bell, Search,
  ChevronDown, Filter, MoreHorizontal, Check, Clock, AlertCircle,
  Building2, User, LogOut, Send, X, ChevronRight, TrendingUp,
  Wrench, Package, CheckCircle2, Calendar, MapPin, Users, Upload,
  Phone, Home, List, RefreshCw, BarChart2,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import StatusBadge from "./components/common/StatusBadge";
import PriorityBadge from "./components/common/PriorityBadge";
import KpiCard from "./components/common/KpiCard";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";


// ─── Types ────────────────────────────────────────────────────────────────────


type Screen = "login" | "dashboard" | "requests" | "create" | "detail";

// ─── Data ─────────────────────────────────────────────────────────────────────

const chartData = [
  { week: "W1", open: 12, inProgress: 8, completed: 5 },
  { week: "W2", open: 18, inProgress: 11, completed: 9 },
  { week: "W3", open: 15, inProgress: 14, completed: 12 },
  { week: "W4", open: 22, inProgress: 9, completed: 18 },
  { week: "W5", open: 19, inProgress: 16, completed: 14 },
  { week: "W6", open: 25, inProgress: 18, completed: 20 },
  { week: "W7", open: 21, inProgress: 12, completed: 22 },
  { week: "W8", open: 28, inProgress: 20, completed: 17 },
];

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

// ─── Shared micro-components ──────────────────────────────────────────────────








// ─── Layout shells ────────────────────────────────────────────────────────────





// ─── KPI Card ─────────────────────────────────────────────────────────────────



// ─── Screen: Login ────────────────────────────────────────────────────────────



// ─── Screen: Dashboard ────────────────────────────────────────────────────────



// ─── Screen: Requests List ────────────────────────────────────────────────────

function RequestsScreen({ onNav }: { onNav: (s: Screen) => void }) {
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

// ─── Screen: Create Request ───────────────────────────────────────────────────

function CreateRequestScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [priority, setPriority]   = useState("Medium");
  const [category, setCategory]   = useState("HVAC");
  const [department, setDepartment] = useState("Facilities");
  const [dragging, setDragging]   = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/60">
      <TopBar title="New Maintenance Request" subtitle="Fill in the details below to submit a request">
        <button onClick={() => onNav("requests")} className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5 transition">
          <X className="w-4 h-4" />Cancel
        </button>
      </TopBar>

      <div className="p-8 max-w-3xl">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
          {/* Request Details */}
          <div className="p-6 space-y-5">
            <h3 className="text-sm font-semibold text-slate-700">Request Details</h3>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Request Title <span className="text-red-400">*</span>
              </label>
              <input
                defaultValue=""
                placeholder="e.g. HVAC Unit not cooling — Floor 3 East Wing"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                rows={4}
                placeholder="Provide a detailed description of the issue — when it started, what you've already tried, and any safety concerns..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition resize-none placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category <span className="text-red-400">*</span></label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition"
                  >
                    {["HVAC", "Electrical", "Plumbing", "Equipment", "Mechanical", "Safety", "Infrastructure", "Other"].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority <span className="text-red-400">*</span></label>
                <div className="flex gap-2">
                  {["Low", "Medium", "High", "Critical"].map(p => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                        priority === p
                          ? "bg-[#0F766E] border-[#0F766E] text-white shadow-sm"
                          : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition"
                  >
                    {["Facilities", "Engineering", "IT", "Operations", "Admin", "Safety"].map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Location <span className="text-red-400">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    placeholder="Building, Floor, Room..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload */}
          <div className="p-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Attachments</label>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={() => setDragging(false)}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                dragging ? "border-[#0F766E] bg-emerald-50" : "border-slate-200 hover:border-[#0F766E]/40 hover:bg-slate-50/60"
              }`}
            >
              <Upload className={`w-8 h-8 mx-auto mb-3 transition ${dragging ? "text-[#0F766E]" : "text-slate-300"}`} />
              <p className="text-sm font-medium text-slate-600">
                Drop files here or <span className="text-[#0F766E] cursor-pointer hover:underline">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF up to 10 MB each</p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between">
            <p className="text-xs text-slate-400"><span className="text-red-400">*</span> Required fields</p>
            <div className="flex gap-3">
              <button
                onClick={() => onNav("requests")}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
              >
                Save as Draft
              </button>
              <button
                onClick={() => onNav("detail")}
                className="px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#0D6B64] transition shadow-sm"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Request Detail ───────────────────────────────────────────────────

function RequestDetailScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [comment, setComment] = useState("");
  const req = requests[2];

  const timeline = [
    { time: "Jul 17, 2026 — 09:15 AM", event: "Request submitted",                user: "Sarah Kim",  type: "created" },
    { time: "Jul 17, 2026 — 10:02 AM", event: "Request assigned to James Park",   user: "System",     type: "assign"  },
    { time: "Jul 17, 2026 — 10:45 AM", event: "Status changed to In Progress",    user: "James Park", type: "status"  },
    { time: "Jul 17, 2026 — 02:30 PM", event: "Site inspection completed",        user: "James Park", type: "update"  },
    { time: "Jul 18, 2026 — 09:00 AM", event: "Parts ordered — ETA 2 days",       user: "James Park", type: "update"  },
  ];

  const comments = [
    { author: "James Park", av: "JP", time: "Jul 17 · 2:32 PM", body: "Completed initial site inspection. The leak is coming from a corroded pipe junction near the east wall of the server room. Temporary containment has been put in place to protect equipment." },
    { author: "Sarah Kim",  av: "SK", time: "Jul 17 · 3:15 PM", body: "Thanks for the quick response, James. IT has been notified and additional drainage has been placed. Please expedite the parts order given the proximity to critical infrastructure." },
    { author: "James Park", av: "JP", time: "Jul 18 · 9:05 AM", body: "Parts ordered from the approved vendor — order #ORD-7821. Expected delivery Jul 20. Full repair scheduled for Jul 21 morning." },
  ];

  const timelineIcon = (type: string) => {
    if (type === "created") return <Plus    className="w-3 h-3" />;
    if (type === "assign")  return <User    className="w-3 h-3" />;
    if (type === "status")  return <RefreshCw className="w-3 h-3" />;
    return <Check className="w-3 h-3" />;
  };
  const timelineIconClass = (type: string) => {
    if (type === "created") return "bg-[#0F766E] text-white";
    if (type === "assign")  return "bg-blue-100 text-blue-600";
    if (type === "status")  return "bg-amber-100 text-amber-600";
    return "bg-slate-100 text-slate-500";
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/60">
      <TopBar title="Request Details" subtitle={req.id}>
        <button
          onClick={() => onNav("requests")}
          className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5 transition"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />Back to list
        </button>
      </TopBar>

      <div className="p-8 grid grid-cols-3 gap-6">
        {/* Main */}
        <div className="col-span-2 space-y-5">
          {/* Header card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                  <span className="text-xs font-mono text-slate-400">{req.id}</span>
                  <StatusBadge status={req.status} />
                  <PriorityBadge priority={req.priority} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 leading-snug">{req.title}</h2>
                <p className="text-sm text-slate-400 mt-1">Submitted by Sarah Kim · {req.date}</p>
              </div>
              <button className="p-2 rounded-xl hover:bg-slate-50 transition text-slate-400">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
              Active water leak detected in the server room (Basement B1). Water is pooling near the east wall junction and poses a risk to active server racks 03 and 04. Immediate action required. The leak appears to stem from a corroded pipe junction above the ceiling tiles. IT department has been notified and equipment protection measures are underway.
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-5">Activity Timeline</h3>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${timelineIconClass(item.type)}`}>
                      {timelineIcon(item.type)}
                    </div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-slate-100 my-1" style={{ minHeight: 20 }} />}
                  </div>
                  <div className="pb-4 flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{item.event}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.user} · {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-5">
              Comments <span className="text-slate-400 font-normal ml-1">({comments.length})</span>
            </h3>
            <div className="space-y-5 mb-6">
              {comments.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F766E]/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#0F766E]">{c.av}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-800">{c.author}</span>
                      <span className="text-xs text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F766E]/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-[#0F766E]">AJ</span>
              </div>
              <div className="flex-1 relative">
                <textarea
                  rows={2}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition resize-none placeholder:text-slate-400"
                />
                <button className="absolute right-3 bottom-2.5 p-1.5 rounded-lg bg-[#0F766E] text-white hover:bg-[#0D6B64] transition">
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Meta */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Request Info</h3>
            <div className="space-y-3">
              {[
                { label: "Status",     value: <StatusBadge status={req.status} />                              },
                { label: "Priority",   value: <PriorityBadge priority={req.priority} />                        },
                { label: "Category",   value: <span className="text-sm text-slate-700">{req.category}</span>   },
                { label: "Department", value: <span className="text-sm text-slate-700">{req.department}</span> },
                { label: "Location",   value: (
                  <span className="text-sm text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />{req.location}
                  </span>
                )},
                { label: "Submitted",  value: <span className="text-sm text-slate-700 flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" />{req.date}</span> },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400 shrink-0">{label}</span>
                  {value}
                </div>
              ))}
            </div>
          </div>

          {/* Assignee */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Assigned Technician</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-blue-600">JP</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">James Park</p>
                <p className="text-xs text-slate-400">Senior Plumber · Facilities</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-50 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Active jobs</span>
                <span className="font-semibold text-slate-700">3</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Completion rate</span>
                <span className="font-semibold text-[#0F766E]">94%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Avg. resolution</span>
                <span className="font-semibold text-slate-700">1.8 days</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-2">
            <button className="w-full py-2.5 rounded-xl bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#0D6B64] transition shadow-sm">
              Mark as Completed
            </button>
            <button className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              Reassign Technician
            </button>
            <button className="w-full py-2.5 rounded-xl border border-red-100 text-sm font-medium text-red-500 hover:bg-red-50 transition">
              Close Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile screens ───────────────────────────────────────────────────────────

function MobileDashboard({ onGoList }: { onGoList: () => void }) {
  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Status bar */}
      <div className="h-8 bg-slate-800 shrink-0" />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white px-4 pt-4 pb-3 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0F766E] flex items-center justify-center">
                <Wrench className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-900">FOP</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative">
                <Bell className="w-5 h-5 text-slate-500" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#0F766E] rounded-full border border-white" />
              </button>
              <div className="w-7 h-7 rounded-full bg-[#0F766E]/10 flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#0F766E]">AJ</span>
              </div>
            </div>
          </div>
          <h2 className="text-base font-bold text-slate-900">Good morning, Alex 👋</h2>
          <p className="text-xs text-slate-400 mt-0.5">Monday, July 21, 2026</p>
        </div>

        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Open",        value: "28",  iconClass: "bg-amber-50  text-amber-500",   icon: AlertCircle  },
              { label: "In Progress", value: "14",  iconClass: "bg-blue-50   text-blue-500",    icon: Clock        },
              { label: "Completed",   value: "142", iconClass: "bg-emerald-50 text-[#0F766E]", icon: CheckCircle2 },
              { label: "Assets",      value: "386", iconClass: "bg-violet-50 text-violet-500",  icon: Package      },
            ].map(({ label, value, iconClass, icon: Icon }) => (
              <div key={label} className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${iconClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-800 mb-3">Weekly Overview</h3>
            <ResponsiveContainer width="100%" height={110}>
              <BarChart data={chartData.slice(-5)} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Bar dataKey="completed" fill="#0F766E" radius={[3, 3, 0, 0]} />
                <Bar dataKey="open" fill="#F59E0B" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
              <h3 className="text-xs font-semibold text-slate-800">Recent Requests</h3>
              <button onClick={onGoList} className="text-[11px] text-[#0F766E] font-medium">View all</button>
            </div>
            {requests.slice(0, 4).map(req => (
              <div key={req.id} className="px-4 py-3 border-b border-slate-50 last:border-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-800 truncate leading-tight">{req.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{req.id} · {req.location}</p>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bg-white border-t border-slate-100 flex justify-around py-2.5 px-4 shrink-0">
        {[
          { icon: Home,  label: "Home",     active: true,  action: () => {} },
          { icon: List,  label: "Requests", active: false, action: onGoList },
          { icon: Plus,  label: "New",      active: false, action: () => {} },
          { icon: User,  label: "Profile",  active: false, action: () => {} },
        ].map(({ icon: Icon, label, active, action }) => (
          <button key={label} onClick={action} className={`flex flex-col items-center gap-0.5 ${active ? "text-[#0F766E]" : "text-slate-400"}`}>
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileRequestsList({ onGoHome }: { onGoHome: () => void }) {
  const [search, setSearch]         = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = requests.filter(r => {
    const q = search.toLowerCase();
    return r.title.toLowerCase().includes(q) && (activeFilter === "All" || r.status === activeFilter);
  });

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="h-8 bg-slate-800 shrink-0" />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white px-4 pt-4 pb-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-3">Requests</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search requests..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none bg-white"
            />
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-0.5">
            {["All", "Open", "In Progress", "Completed"].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  activeFilter === f ? "bg-[#0F766E] text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-2">
          {filtered.map(req => (
            <div key={req.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-medium text-slate-800 leading-tight">{req.title}</p>
                <StatusBadge status={req.status} />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-slate-400">{req.id}</span>
                <span className="text-[10px] text-slate-300">·</span>
                <span className="text-[10px] text-slate-500">{req.category}</span>
                <span className="text-[10px] text-slate-300">·</span>
                <PriorityBadge priority={req.priority} />
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />{req.location}
                </span>
                <span className="text-[10px] text-slate-400">{req.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-slate-100 flex justify-around py-2.5 px-4 shrink-0">
        {[
          { icon: Home,  label: "Home",     active: false, action: onGoHome },
          { icon: List,  label: "Requests", active: true,  action: () => {} },
          { icon: Plus,  label: "New",      active: false, action: () => {} },
          { icon: User,  label: "Profile",  active: false, action: () => {} },
        ].map(({ icon: Icon, label, active, action }) => (
          <button key={label} onClick={action} className={`flex flex-col items-center gap-0.5 ${active ? "text-[#0F766E]" : "text-slate-400"}`}>
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen]         = useState<Screen>("login");
  const [showMobile, setShowMobile] = useState(false);
  const [mobileTab, setMobileTab]   = useState<"dashboard" | "requests">("dashboard");

  if (screen === "login") {
    return <LoginScreen onLogin={() => setScreen("dashboard")} />;
  }

  return (
    <div className="h-screen flex bg-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar screen={screen} onNav={(s) => { setScreen(s); setShowMobile(false); }} />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile toggle */}
        <div className="absolute top-[13px] right-[68px] z-30">
          <button
            onClick={() => setShowMobile(v => !v)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              showMobile
                ? "bg-[#0F766E] text-white border-[#0F766E] shadow-sm"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            {showMobile ? "Desktop" : "Mobile Preview"}
          </button>
        </div>

        {showMobile ? (
          /* ── Mobile preview ── */
          <div className="flex-1 flex items-center justify-center bg-slate-100 gap-10 p-10 overflow-auto">
            {/* Phone 1 */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Dashboard</p>
              <div
                className="relative rounded-[44px] border-[10px] border-slate-800 shadow-2xl overflow-hidden bg-white"
                style={{ width: 360, height: 780 }}
              >
                <MobileDashboard onGoList={() => setMobileTab("requests")} />
              </div>
            </div>
            {/* Phone 2 */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Requests</p>
              <div
                className="relative rounded-[44px] border-[10px] border-slate-800 shadow-2xl overflow-hidden bg-white"
                style={{ width: 360, height: 780 }}
              >
                <MobileRequestsList onGoHome={() => setMobileTab("dashboard")} />
              </div>
            </div>
          </div>
        ) : (
          /* ── Desktop screens ── */
          <>
            {screen === "dashboard" && <DashboardScreen onNav={setScreen} />}
            {screen === "requests"  && <RequestsScreen  onNav={setScreen} />}
            {screen === "create"    && <CreateRequestScreen onNav={setScreen} />}
            {screen === "detail"    && <RequestDetailScreen onNav={setScreen} />}
          </>
        )}
      </div>
    </div>
  );
}

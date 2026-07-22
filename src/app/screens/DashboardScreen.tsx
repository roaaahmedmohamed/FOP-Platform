import {
  AlertCircle,
  BarChart2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  Hand,
  Package,
  Plus,
  Users,
} from "lucide-react";
import TopBar from "../components/layout/TopBar";
import KpiCard from "../components/common/KpiCard";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PriorityBadge from "../components/common/PriorityBadge";
import StatusBadge from "../components/common/StatusBadge";

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
  {
    id: "REQ-001",
    title: "HVAC System Failure — Building A",
    category: "HVAC",
    priority: "High",
    status: "Open",
    department: "Engineering",
    location: "Floor 3",
    assignee: "Marcus Chen",
    date: "Jul 18, 2026",
  },
  {
    id: "REQ-002",
    title: "Broken Conference Room Projector",
    category: "Equipment",
    priority: "Medium",
    status: "In Progress",
    department: "IT",
    location: "Room 204",
    assignee: "Sarah Kim",
    date: "Jul 17, 2026",
  },
  {
    id: "REQ-003",
    title: "Water Leak in Server Room",
    category: "Plumbing",
    priority: "Critical",
    status: "In Progress",
    department: "Facilities",
    location: "Basement B1",
    assignee: "James Park",
    date: "Jul 17, 2026",
  },
  {
    id: "REQ-004",
    title: "Elevator Maintenance — East Wing",
    category: "Mechanical",
    priority: "Low",
    status: "Completed",
    department: "Operations",
    location: "East Wing",
    assignee: "Diana Ross",
    date: "Jul 15, 2026",
  },
  {
    id: "REQ-005",
    title: "Office Lighting Replacement",
    category: "Electrical",
    priority: "Medium",
    status: "Open",
    department: "Facilities",
    location: "Floor 5",
    assignee: "—",
    date: "Jul 14, 2026",
  },
  {
    id: "REQ-006",
    title: "Parking Lot Signage Update",
    category: "Infrastructure",
    priority: "Low",
    status: "Completed",
    department: "Admin",
    location: "Parking B",
    assignee: "Tom Walker",
    date: "Jul 12, 2026",
  },
  {
    id: "REQ-007",
    title: "Fire Suppression System Test",
    category: "Safety",
    priority: "High",
    status: "Open",
    department: "Safety",
    location: "All Floors",
    assignee: "Nina Patel",
    date: "Jul 11, 2026",
  },
  {
    id: "REQ-008",
    title: "Cafeteria Ventilation Issue",
    category: "HVAC",
    priority: "Medium",
    status: "In Progress",
    department: "Facilities",
    location: "Ground Floor",
    assignee: "Carlos Mendez",
    date: "Jul 10, 2026",
  },
];

type Screen = "login" | "dashboard" | "requests" | "create" | "detail";

export default function DashboardScreen({
  onNav,
}: {
  onNav: (s: Screen) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/60">
      <TopBar title="Dashboard" subtitle="Monday, July 21, 2026">
        <button
          onClick={() => onNav("create")}
          className="flex items-center justify-center gap-2 bg-[#0F766E] text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </TopBar>

      <div className="p-4 sm:p-6 xl:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Good morning, Alex
            </h2>
            <Hand className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Here's what's happening across your facilities today.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <KpiCard
            label="Open Requests"
            value="28"
            delta="+4 this week"
            icon={AlertCircle}
            iconClass="bg-amber-50  text-amber-500"
          />
          <KpiCard
            label="In Progress"
            value="14"
            delta="+2 today"
            icon={Clock}
            iconClass="bg-blue-50   text-blue-500"
          />
          <KpiCard
            label="Completed"
            value="142"
            delta="+12 this month"
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-[#0F766E]"
          />
          <KpiCard
            label="Total Assets"
            value="386"
            delta="+3 this quarter"
            icon={Package}
            iconClass="bg-violet-50 text-violet-500"
          />
        </div>

        {/* Chart + Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Requests Overview
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Last 8 weeks · all categories
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Open
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  In Progress
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
                  Completed
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={chartData}
                margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
              >
                <defs>
                  {[
                    { id: "colorOpen", color: "#F59E0B" },
                    { id: "colorProgress", color: "#3B82F6" },
                    { id: "colorCompleted", color: "#0F766E" },
                  ].map(({ id, color }) => (
                    <linearGradient
                      key={id}
                      id={id}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="open"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fill="url(#colorOpen)"
                />
                <Area
                  type="monotone"
                  dataKey="inProgress"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#colorProgress)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#0F766E"
                  strokeWidth={2}
                  fill="url(#colorCompleted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                {
                  label: "Submit New Request",
                  icon: Plus,
                  action: () => onNav("create"),
                  primary: true,
                },
                {
                  label: "View All Requests",
                  icon: ClipboardList,
                  action: () => onNav("requests"),
                  primary: false,
                },
                {
                  label: "Asset Registry",
                  icon: Package,
                  action: () => {},
                  primary: false,
                },
                {
                  label: "Team Schedule",
                  icon: Users,
                  action: () => {},
                  primary: false,
                },
                {
                  label: "Reports & Analytics",
                  icon: BarChart2,
                  action: () => {},
                  primary: false,
                },
              ].map(({ label, icon: Icon, action, primary }) => (
                <button
                  key={label}
                  onClick={action}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    primary
                      ? "bg-[#0F766E] text-white hover:bg-[#0D6B64] shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 border border-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Requests table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-50">
            <h3 className="text-sm font-semibold text-slate-900">
              Recent Requests
            </h3>
            <button
              onClick={() => onNav("requests")}
              className="text-xs text-[#0F766E] font-medium hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="min-w-[900px] w-full">
            <table className="min-w-[900px] w-full">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/60">
                  {[
                    "ID",
                    "Title",
                    "Category",
                    "Priority",
                    "Status",
                    "Assignee",
                    "Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 sm:px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {requests.slice(0, 5).map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-slate-50/60 transition cursor-pointer group"
                    onClick={() => onNav("detail")}
                  >
                    <td className="px-4 sm:px-6 py-3.5 text-xs font-mono text-slate-400 whitespace-nowrap">
                      {req.id}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-sm font-medium text-slate-800 max-w-56 truncate group-hover:text-[#0F766E] transition">
                      {req.title}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-xs text-slate-500">
                      {req.category}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5">
                      <PriorityBadge priority={req.priority} />
                    </td>
                    <td className="px-4 sm:px-6 py-3.5">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                      {req.assignee}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-xs text-slate-400 whitespace-nowrap">
                      {req.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

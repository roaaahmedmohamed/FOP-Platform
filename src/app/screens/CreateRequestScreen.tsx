import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import { ChevronDown, MapPin, Upload, X } from "lucide-react";



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

export default function CreateRequestScreen({ onNav }: { onNav: (s: Screen) => void }) {
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
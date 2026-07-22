import { Building2, Check, Wrench } from "lucide-react";
import { useState } from "react";


type Props ={
  onLogin: () => void;
}





export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState("alex@acmecorp.com");
  const [password, setPassword] = useState("••••••••");
  const [remember, setRemember] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex font-[Inter,sans-serif]">
      {/* Form panel */}
      <div className="w-full max-w-md mx-auto flex flex-col justify-center px-10 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[#0F766E] flex items-center justify-center shadow-lg shadow-emerald-200">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <span className="text-lg font-bold text-slate-900 tracking-tight">FOP</span>
            <p className="text-xs text-slate-400">Facility Operations Platform</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
        <p className="text-sm text-slate-500 mb-8">Sign in to your workspace to continue.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <button className="text-xs text-[#0F766E] hover:underline font-medium">Forgot password?</button>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setRemember(!remember)}
              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${
                remember ? "bg-[#0F766E] border-[#0F766E]" : "border-slate-300 bg-white"
              }`}
            >
              {remember && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </button>
            <span className="text-sm text-slate-600">Remember me for 30 days</span>
          </div>

          <button
            onClick={onLogin}
            className="w-full bg-[#0F766E] hover:bg-[#0D6B64] text-white font-semibold py-2.5 rounded-xl transition shadow-sm hover:shadow-md hover:shadow-emerald-100 text-sm"
          >
            Sign in to workspace
          </button>
        </div>

        <p className="text-xs text-center text-slate-400 mt-8">
          Need access?{" "}
          <button className="text-[#0F766E] font-medium hover:underline">Contact your administrator</button>
        </p>
      </div>

      {/* Illustration panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0F766E] to-[#064E4A] items-center justify-center p-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-sm text-center text-white">
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur mx-auto mb-8 flex items-center justify-center shadow-2xl ring-1 ring-white/20">
            <Building2 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Manage Your Facilities</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Streamline maintenance requests, track assets, and keep your facilities running at peak efficiency.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: "Open",        value: "28"  },
              { label: "In Progress", value: "14"  },
              { label: "Resolved",    value: "142" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 backdrop-blur rounded-2xl p-4 ring-1 ring-white/10">
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-[10px] text-white/60 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
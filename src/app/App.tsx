import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "./components/layout/Sidebar";

import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import RequestsScreen from "./screens/RequestsScreen";
import CreateRequestScreen from "./screens/CreateRequestScreen";
import RequestDetailScreen from "./screens/RequestDetailScreen";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "login" | "dashboard" | "requests" | "create" | "detail";

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (screen === "login") {
    return <LoginScreen onLogin={() => setScreen("dashboard")} />;
  }

  return (
    <div
      className="h-screen flex bg-white overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="hidden lg:block">
        <Sidebar
          screen={screen}
          onNav={(s) => {
            setScreen(s);
          }}
        />
      </div>

      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed left-0 top-0 h-full w-72 bg-white z-50 lg:hidden shadow-xl">
            <Sidebar
              screen={screen}
              onNav={(s) => {
                setScreen(s);
                setSidebarOpen(false);
              }}
            />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="lg:hidden p-4 border-b bg-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <>
          {screen === "dashboard" && <DashboardScreen onNav={setScreen} />}
          {screen === "requests" && <RequestsScreen onNav={setScreen} />}
          {screen === "create" && <CreateRequestScreen onNav={setScreen} />}
          {screen === "detail" && <RequestDetailScreen onNav={setScreen} />}
        </>
      </div>
    </div>
  );
}

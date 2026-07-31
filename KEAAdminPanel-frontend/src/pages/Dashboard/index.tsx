import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

/* ─── SVG ICONS ─────────────────────────────────────────────── */
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);
const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const LayersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 2,7 12,12 22,7"/>
    <polyline points="2,17 12,22 22,17"/>
    <polyline points="2,12 12,17 22,12"/>
  </svg>
);
const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const LogOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const TrendUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
    <polyline points="17,6 23,6 23,12"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);

/* ─── NAV ITEMS ──────────────────────────────────────────────── */
const navItems = [
  { icon: <HomeIcon />,   label: "Dashboard",   path: "/dashboard" },
  { icon: <BookIcon />,   label: "Classes",     path: "/classes"   },
  { icon: <LayersIcon />, label: "Subjects",    path: "/subjects"  },
  { icon: <FileIcon />,   label: "Documents",   path: "/documents" },
  { icon: <UsersIcon />,  label: "Users",       path: "/users"     },
  { icon: <SettingsIcon />, label: "Settings",  path: "/settings"  },
];

/* ─── STAT CARDS DATA ────────────────────────────────────────── */
const stats = [
  {
    label:  "Total Classes",
    value:  "24",
    change: "+3 this month",
    icon:   "📚",
    color:  "blue",
    bg:     "linear-gradient(135deg, rgba(30,64,175,0.3), rgba(59,130,246,0.15))",
    border: "rgba(59,130,246,0.25)",
  },
  {
    label:  "Total Subjects",
    value:  "148",
    change: "+12 this week",
    icon:   "📖",
    color:  "cyan",
    bg:     "linear-gradient(135deg, rgba(8,145,178,0.3), rgba(6,182,212,0.15))",
    border: "rgba(6,182,212,0.25)",
  },
  {
    label:  "Documents",
    value:  "1,284",
    change: "+89 today",
    icon:   "📄",
    color:  "green",
    bg:     "linear-gradient(135deg, rgba(5,150,105,0.3), rgba(16,185,129,0.15))",
    border: "rgba(16,185,129,0.25)",
  },
  {
    label:  "Active Users",
    value:  "56",
    change: "+8 this week",
    icon:   "👥",
    color:  "gold",
    bg:     "linear-gradient(135deg, rgba(217,119,6,0.3), rgba(245,158,11,0.15))",
    border: "rgba(245,158,11,0.25)",
  },
];

/* ─── RECENT ACTIVITY ────────────────────────────────────────── */
const recentActivity = [
  { action: "New class added",       detail: "Class 10 – Science Group",  time: "2 min ago",    icon: "📚", type: "success" },
  { action: "Document uploaded",     detail: "Physics Chapter 5 Notes",   time: "15 min ago",   icon: "📄", type: "info"    },
  { action: "Subject updated",       detail: "Mathematics – Class 9",     time: "1 hour ago",   icon: "✏️", type: "warning" },
  { action: "New user registered",   detail: "teacher@kea.edu.pk",        time: "3 hours ago",  icon: "👤", type: "info"    },
  { action: "Document deleted",      detail: "Old Syllabus 2022 PDF",     time: "5 hours ago",  icon: "🗑️", type: "danger"  },
  { action: "Class archived",        detail: "Class 8 – Arts Group",      time: "1 day ago",    icon: "📦", type: "warning" },
];

/* ─── QUICK ACTIONS ──────────────────────────────────────────── */
const quickActions = [
  { label: "Add Class",    icon: "➕", desc: "Nayi class create karein",    color: "#3b82f6" },
  { label: "Add Subject",  icon: "📝", desc: "Subject add karein",          color: "#06b6d4" },
  { label: "Upload Doc",   icon: "⬆️", desc: "Document upload karein",      color: "#10b981" },
  { label: "Add User",     icon: "👤", desc: "Naya user register karein",   color: "#f59e0b" },
];

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const handleLogout = () => {
    if (!logoutConfirm) { setLogoutConfirm(true); return; }
    logout();
    navigate("/login", { replace: true });
  };

  const currentPath = location.pathname;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a", fontFamily: "Inter, sans-serif" }}>

      {/* ── SIDEBAR ──────────────────────────────────────────── */}
      <aside
        style={{
          width: sidebarOpen ? 240 : 72,
          flexShrink: 0,
          background: "#0c1526",
          borderRight: "1px solid rgba(148,163,184,0.08)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          zIndex: 50,
        }}
      >
        {/* Logo Area */}
        <div
          style={{
            padding: sidebarOpen ? "24px 20px 20px" : "24px 14px 20px",
            borderBottom: "1px solid rgba(148,163,184,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            transition: "padding 0.3s",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: 11,
              background: "linear-gradient(135deg, #1e40af, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
            }}
          >
            <ShieldIcon />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", whiteSpace: "nowrap" }}>KEA Admin</div>
              <div style={{ fontSize: 10.5, color: "#64748b", whiteSpace: "nowrap" }}>Education Authority</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={!sidebarOpen ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: sidebarOpen ? 12 : 0,
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  padding: sidebarOpen ? "10px 12px" : "10px",
                  borderRadius: 10,
                  border: isActive ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(30,64,175,0.4), rgba(59,130,246,0.2))"
                    : "transparent",
                  color: isActive ? "#60a5fa" : "#94a3b8",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: "100%",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                    e.currentTarget.style.color = "#f1f5f9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#94a3b8";
                  }
                }}
              >
                <span style={{ flexShrink: 0, display: "flex" }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: "12px", borderTop: "1px solid rgba(148,163,184,0.08)" }}>
          {sidebarOpen && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                background: "rgba(30,41,59,0.6)",
                borderRadius: 10,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {user?.name?.charAt(0) || "A"}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user?.name || "Admin"}
                </div>
                <div style={{ fontSize: 11, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user?.role || "Administrator"}
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              gap: 10,
              width: "100%",
              padding: sidebarOpen ? "10px 12px" : "10px",
              borderRadius: 10,
              border: logoutConfirm ? "1px solid rgba(239,68,68,0.3)" : "1px solid transparent",
              background: logoutConfirm ? "rgba(239,68,68,0.1)" : "transparent",
              color: logoutConfirm ? "#f87171" : "#94a3b8",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => { if (!logoutConfirm) e.currentTarget.style.color = "#ef4444"; }}
            onMouseLeave={(e) => { if (!logoutConfirm) e.currentTarget.style.color = "#94a3b8"; }}
          >
            <LogOutIcon />
            {sidebarOpen && <span>{logoutConfirm ? "Confirm Logout?" : "Logout"}</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Top Navbar */}
        <header
          style={{
            height: 64,
            background: "rgba(12,21,38,0.9)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(148,163,184,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: "rgba(30,41,59,0.6)",
                border: "1px solid rgba(148,163,184,0.1)",
                borderRadius: 8,
                padding: 8,
                cursor: "pointer",
                color: "#94a3b8",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.color = "#60a5fa"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(30,41,59,0.6)"; e.currentTarget.style.color = "#94a3b8"; }}
              aria-label="Toggle sidebar"
            >
              <MenuIcon />
            </button>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", margin: 0, letterSpacing: "-0.3px" }}>
                Dashboard
              </h1>
              <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
                KEA Admin Panel – Overview
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Notifications */}
            <button
              style={{
                position: "relative",
                background: "rgba(30,41,59,0.6)",
                border: "1px solid rgba(148,163,184,0.1)",
                borderRadius: 8,
                padding: 8,
                cursor: "pointer",
                color: "#94a3b8",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s",
              }}
              aria-label="Notifications"
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.color = "#60a5fa"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(30,41,59,0.6)"; e.currentTarget.style.color = "#94a3b8"; }}
            >
              <BellIcon />
              <span
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  width: 8,
                  height: 8,
                  background: "#ef4444",
                  borderRadius: "50%",
                  border: "1.5px solid #0c1526",
                }}
              />
            </button>

            {/* Avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 0 0 2px rgba(59,130,246,0.3)",
              }}
            >
              {user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ flex: 1, padding: "28px 28px 40px", overflowY: "auto" }}>

          {/* Welcome Banner */}
          <div
            className="animate-fadeInUp"
            style={{
              background: "linear-gradient(135deg, rgba(30,64,175,0.3) 0%, rgba(8,145,178,0.2) 50%, rgba(124,58,237,0.15) 100%)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 16,
              padding: "24px 28px",
              marginBottom: 28,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -20,
                top: -20,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent)",
                pointerEvents: "none",
              }}
            />
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", margin: "0 0 6px", letterSpacing: "-0.3px" }}>
              👋 Assalam-o-Alaikum, {user?.name?.split(" ")[0] || "Admin"}!
            </h2>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>
              KEA Admin Panel mein khush amdeed. Aaj ka overview dekhein.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 14,
                padding: "5px 12px",
                background: "rgba(16,185,129,0.15)",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: 20,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 500 }}>
                {new Date().toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className="animate-fadeInUp delay-100"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
              marginBottom: 28,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={`stat-card ${s.color}`}
                style={{ background: s.bg, border: `1px solid ${s.border}` }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 12,
                      color: "#10b981",
                      background: "rgba(16,185,129,0.1)",
                      padding: "3px 8px",
                      borderRadius: 12,
                    }}
                  >
                    <TrendUpIcon />
                    <span>{s.change}</span>
                  </div>
                </div>
                <div style={{ fontSize: 34, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-1px", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="animate-fadeInUp delay-200" style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 14, letterSpacing: "-0.2px" }}>
              ⚡ Quick Actions
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              {quickActions.map((a, i) => (
                <button
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 18px",
                    background: "rgba(30,41,59,0.7)",
                    border: `1px solid rgba(148,163,184,0.1)`,
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    textAlign: "left",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = a.color + "50";
                    e.currentTarget.style.background = a.color + "15";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${a.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(148,163,184,0.1)";
                    e.currentTarget.style.background = "rgba(30,41,59,0.7)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: a.color + "20",
                      border: `1px solid ${a.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{a.label}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{a.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom: Recent Activity + System Info */}
          <div
            className="animate-fadeInUp delay-300"
            style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 18 }}
          >
            {/* Recent Activity */}
            <div
              style={{
                background: "rgba(30,41,59,0.6)",
                border: "1px solid rgba(148,163,184,0.1)",
                borderRadius: 16,
                padding: "20px 22px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
                  🕐 Recent Activity
                </h3>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: "none",
                    border: "none",
                    fontSize: 12,
                    color: "#60a5fa",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 500,
                    padding: 0,
                  }}
                >
                  Sab dekhen <ChevronRightIcon />
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {recentActivity.map((act, i) => {
                  const colors: Record<string, string> = {
                    success: "#10b981", info: "#3b82f6",
                    warning: "#f59e0b", danger: "#ef4444",
                  };
                  const col = colors[act.type] || "#94a3b8";
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "11px 12px",
                        borderRadius: 10,
                        transition: "background 0.2s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(148,163,184,0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: col + "15",
                          border: `1px solid ${col}25`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        {act.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>{act.action}</div>
                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {act.detail}
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: "#475569", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {act.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Info Panel */}
            <div
              style={{
                background: "rgba(30,41,59,0.6)",
                border: "1px solid rgba(148,163,184,0.1)",
                borderRadius: 16,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
                🖥️ System Status
              </h3>

              {[
                { label: "Server Health",  value: 98,  color: "#10b981", status: "Excellent" },
                { label: "Storage Used",   value: 64,  color: "#3b82f6", status: "64% of 10GB" },
                { label: "API Response",   value: 92,  color: "#06b6d4", status: "Fast (120ms)" },
                { label: "User Activity",  value: 75,  color: "#f59e0b", status: "Moderate" },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "#94a3b8" }}>{item.label}</span>
                    <span style={{ fontSize: 12, color: item.color, fontWeight: 600 }}>{item.status}</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(148,163,184,0.1)", borderRadius: 3, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${item.value}%`,
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                        borderRadius: 3,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: 8,
                  padding: "12px 14px",
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: 10,
                }}
              >
                <div style={{ fontSize: 12, color: "#10b981", fontWeight: 600, marginBottom: 4 }}>✅ All Systems Normal</div>
                <div style={{ fontSize: 11.5, color: "#64748b" }}>Last checked: Just now</div>
              </div>

              {/* Admin Info */}
              <div
                style={{
                  padding: "12px 14px",
                  background: "rgba(30,41,59,0.8)",
                  border: "1px solid rgba(148,163,184,0.08)",
                  borderRadius: 10,
                }}
              >
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>Logged in as:</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{user?.name}</div>
                <div style={{ fontSize: 12, color: "#60a5fa", marginTop: 2 }}>{user?.email}</div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 8,
                    padding: "3px 10px",
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: 20,
                    fontSize: 11,
                    color: "#93c5fd",
                    fontWeight: 600,
                  }}
                >
                  🔐 {user?.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

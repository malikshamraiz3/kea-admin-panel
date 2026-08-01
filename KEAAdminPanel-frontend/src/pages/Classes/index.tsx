import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getClasses, createClass, deleteClass } from "../../services/classService";
import type { Class } from "../../services/classService";

/* ─── ICONS ──────────────────────────────────────────────────── */
const PlusIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);
const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3,6 5,6 21,6" />
        <path d="M19,6l-1,14H6L5,6" />
        <path d="M10,11v6" /><path d="M14,11v6" />
        <path d="M9,6V4h6v2" />
    </svg>
);
const HomeIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
);
const BookIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);
const LayersIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12,2 2,7 12,12 22,7" />
        <polyline points="2,17 12,22 22,17" />
        <polyline points="2,12 12,17 22,12" />
    </svg>
);
const FileIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
    </svg>
);
const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const ChevronRightIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9,18 15,12 9,6" />
    </svg>
);
const AlertIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);
const LogOutIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);
const MenuIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);
const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);
const ShieldIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const GridIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
);
const ListIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

/* ─── SIDEBAR NAV ITEMS ──────────────────────────────────────── */
const navItems = [
    { icon: <HomeIcon />, label: "Dashboard", path: "/dashboard" },
    { icon: <BookIcon />, label: "Classes", path: "/classes" },
    { icon: <LayersIcon />, label: "Subjects", path: "/subjects" },
    { icon: <FileIcon />, label: "Documents", path: "/documents" },
    { icon: <FileIcon />, label: "News", path: "/news" },
];

/* ─── CONFIRM MODAL ──────────────────────────────────────────── */
interface ConfirmModalProps {
    className: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting: boolean;
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({ className, onConfirm, onCancel, isDeleting }) => (
    <div
        className="animate-fadeIn"
        style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
        }}
        onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
        <div
            className="animate-fadeInUp"
            style={{
                background: "#1e293b",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 18,
                padding: "32px 28px",
                maxWidth: 420,
                width: "100%",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                    color: "#ef4444",
                }}
            >
                <AlertIcon />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", margin: "0 0 10px" }}>
                Class Delete Karein?
            </h3>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 8px", lineHeight: 1.6 }}>
                Kya aap yaqeenan{" "}
                <strong style={{ color: "#fca5a5" }}>"{className}"</strong> ko delete karna chahte hain?
            </p>
            <p style={{ fontSize: 13, color: "#ef4444", margin: "0 0 28px" }}>
                ⚠️ Yeh action undo nahi ho sakta.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
                <button
                    onClick={onCancel}
                    disabled={isDeleting}
                    style={{
                        flex: 1, padding: "11px 0",
                        background: "rgba(148,163,184,0.08)",
                        border: "1px solid rgba(148,163,184,0.15)",
                        borderRadius: 10, color: "#94a3b8",
                        fontSize: 14, fontWeight: 600, cursor: "pointer",
                        fontFamily: "inherit", transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(148,163,184,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(148,163,184,0.08)"; }}
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    style={{
                        flex: 1, padding: "11px 0",
                        background: isDeleting ? "rgba(239,68,68,0.4)" : "linear-gradient(135deg,#dc2626,#ef4444)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        borderRadius: 10, color: "#fff",
                        fontSize: 14, fontWeight: 600,
                        cursor: isDeleting ? "not-allowed" : "pointer",
                        fontFamily: "inherit",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        transition: "all 0.2s",
                    }}
                >
                    {isDeleting ? (
                        <>
                            <div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                            Deleting...
                        </>
                    ) : "🗑️ Delete"}
                </button>
            </div>
        </div>
    </div>
);

/* ─── TOAST ──────────────────────────────────────────────────── */
interface ToastProps { message: string; type: "success" | "error"; }
const Toast: React.FC<ToastProps> = ({ message, type }) => (
    <div
        className="animate-fadeInUp"
        style={{
            position: "fixed", bottom: 28, right: 28, zIndex: 300,
            padding: "14px 20px",
            background: type === "success"
                ? "linear-gradient(135deg,rgba(5,150,105,0.95),rgba(16,185,129,0.95))"
                : "linear-gradient(135deg,rgba(185,28,28,0.95),rgba(239,68,68,0.95))",
            border: `1px solid ${type === "success" ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
            borderRadius: 12,
            color: "#fff",
            fontSize: 14, fontWeight: 600,
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", gap: 10,
            maxWidth: 320,
        }}
    >
        <span style={{ fontSize: 18 }}>{type === "success" ? "✅" : "❌"}</span>
        {message}
    </div>
);

/* ─── SKELETON LOADER ─────────────────────────────────────────── */
const SkeletonCard = () => (
    <div
        style={{
            background: "rgba(30,41,59,0.5)",
            border: "1px solid rgba(148,163,184,0.08)",
            borderRadius: 14,
            padding: "22px 20px",
            animation: "pulse 1.5s ease-in-out infinite",
        }}
    >
        <div style={{ width: "60%", height: 16, background: "rgba(148,163,184,0.12)", borderRadius: 6, marginBottom: 12 }} />
        <div style={{ width: "40%", height: 12, background: "rgba(148,163,184,0.08)", borderRadius: 6, marginBottom: 18 }} />
        <div style={{ width: "30%", height: 10, background: "rgba(148,163,184,0.06)", borderRadius: 6 }} />
    </div>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
const ClassesPage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // State
    const [classes, setClasses] = useState<Class[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newClassName, setNewClassName] = useState("");
    const [addError, setAddError] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Class | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [toast, setToast] = useState<ToastProps | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [logoutConfirm, setLogoutConfirm] = useState(false);

    // Toast helper
    const showToast = useCallback((message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    }, []);

    useEffect(() => {
        let isActive = true;

        const loadClasses = async () => {
            setIsLoading(true);
            try {
                const data = await getClasses();
                if (isActive) {
                    setClasses(data ?? []);
                }
            } catch {
                if (isActive) {
                    showToast("Classes load nahi hui. Backend check karein.", "error");
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        void loadClasses();

        return () => {
            isActive = false;
        };
    }, [showToast]);

    // Add class
    const handleAddClass = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newClassName.trim();
        if (!trimmed) { setAddError("Class ka naam likhna zaroori hai."); return; }
        if (trimmed.length < 2) { setAddError("Naam kum az kum 2 characters ka hona chahiye."); return; }
        if (classes.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
            setAddError("Yeh class pehle se exist karti hai."); return;
        }
        setIsAdding(true);
        setAddError("");
        try {
            const created = await createClass(trimmed);
            setClasses((prev) => [created, ...prev]);
            setNewClassName("");
            setShowAddForm(false);
            showToast(`"${created.name}" successfully add ho gayi! 🎉`, "success");
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
            showToast(msg || "Class add nahi ho saki. Dobara try karein.", "error");
        } finally {
            setIsAdding(false);
        }
    };

    // Delete class
    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        try {
            await deleteClass(deleteTarget._id);
            setClasses((prev) => prev.filter((c) => c._id !== deleteTarget._id));
            showToast(`"${deleteTarget.name}" delete ho gayi.`, "success");
            setDeleteTarget(null);
        } catch {
            showToast("Delete nahi ho saki. Dobara try karein.", "error");
        } finally {
            setIsDeleting(false);
        }
    };

    // Logout
    const handleLogout = () => {
        if (!logoutConfirm) { setLogoutConfirm(true); return; }
        logout();
        navigate("/login", { replace: true });
    };

    // Filtered classes
    const filtered = classes.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Format date
    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("en-PK", {
            day: "2-digit", month: "short", year: "numeric",
        });

    /* ── RENDER ─────────────────────────────────────────────── */
    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a", fontFamily: "Inter, system-ui, sans-serif" }}>

            {/* ── SIDEBAR ──────────────────────────────────────── */}
            <aside
                style={{
                    width: sidebarOpen ? 240 : 72,
                    flexShrink: 0,
                    background: "#0c1526",
                    borderRight: "1px solid rgba(148,163,184,0.08)",
                    display: "flex", flexDirection: "column",
                    transition: "width 0.3s ease",
                    position: "sticky", top: 0, height: "100vh",
                    overflow: "hidden", zIndex: 50,
                }}
            >
                {/* Logo */}
                <div style={{ padding: sidebarOpen ? "24px 20px 20px" : "24px 14px 20px", borderBottom: "1px solid rgba(148,163,184,0.08)", display: "flex", alignItems: "center", gap: 12, transition: "padding 0.3s" }}>
                    <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 11, background: "linear-gradient(135deg,#1e40af,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(59,130,246,0.35)" }}>
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
                <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                title={!sidebarOpen ? item.label : undefined}
                                style={{
                                    display: "flex", alignItems: "center",
                                    gap: sidebarOpen ? 12 : 0,
                                    justifyContent: sidebarOpen ? "flex-start" : "center",
                                    padding: sidebarOpen ? "10px 12px" : "10px",
                                    borderRadius: 10,
                                    border: isActive ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
                                    background: isActive ? "linear-gradient(135deg,rgba(30,64,175,0.4),rgba(59,130,246,0.2))" : "transparent",
                                    color: isActive ? "#60a5fa" : "#94a3b8",
                                    fontSize: 14, fontWeight: 500, cursor: "pointer",
                                    transition: "all 0.2s ease", width: "100%", textAlign: "left",
                                    whiteSpace: "nowrap", overflow: "hidden", fontFamily: "inherit",
                                }}
                                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; e.currentTarget.style.color = "#f1f5f9"; } }}
                                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; } }}
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
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(30,41,59,0.6)", borderRadius: 10, marginBottom: 8 }}>
                            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#1e40af,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                                {user?.name?.charAt(0) || "A"}
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name || "Admin"}</div>
                                <div style={{ fontSize: 11, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.role || "Administrator"}</div>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{
                            display: "flex", alignItems: "center",
                            justifyContent: sidebarOpen ? "flex-start" : "center",
                            gap: 10, width: "100%",
                            padding: sidebarOpen ? "10px 12px" : "10px",
                            borderRadius: 10,
                            border: logoutConfirm ? "1px solid rgba(239,68,68,0.3)" : "1px solid transparent",
                            background: logoutConfirm ? "rgba(239,68,68,0.1)" : "transparent",
                            color: logoutConfirm ? "#f87171" : "#94a3b8",
                            fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
                        }}
                        onMouseEnter={(e) => { if (!logoutConfirm) e.currentTarget.style.color = "#ef4444"; }}
                        onMouseLeave={(e) => { if (!logoutConfirm) e.currentTarget.style.color = "#94a3b8"; }}
                    >
                        <LogOutIcon />
                        {sidebarOpen && <span>{logoutConfirm ? "Confirm?" : "Logout"}</span>}
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT ─────────────────────────────────── */}
            <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

                {/* Top Navbar */}
                <header style={{ height: 64, background: "rgba(12,21,38,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(148,163,184,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 40 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)", borderRadius: 8, padding: 8, cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.color = "#60a5fa"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(30,41,59,0.6)"; e.currentTarget.style.color = "#94a3b8"; }}
                        >
                            <MenuIcon />
                        </button>
                        {/* Breadcrumb */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748b" }}>
                            <button onClick={() => navigate("/dashboard")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13, padding: 0, fontFamily: "inherit", transition: "color 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}>
                                Dashboard
                            </button>
                            <ChevronRightIcon />
                            <span style={{ color: "#60a5fa", fontWeight: 600 }}>Classes</span>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button style={{ position: "relative", background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)", borderRadius: 8, padding: 8, cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.color = "#60a5fa"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(30,41,59,0.6)"; e.currentTarget.style.color = "#94a3b8"; }}>
                            <BellIcon />
                            <span style={{ position: "absolute", top: 5, right: 5, width: 8, height: 8, background: "#ef4444", borderRadius: "50%", border: "1.5px solid #0c1526" }} />
                        </button>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1e40af,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", boxShadow: "0 0 0 2px rgba(59,130,246,0.3)" }}>
                            {user?.name?.charAt(0) || "A"}
                        </div>
                    </div>
                </header>

                {/* Page Body */}
                <div style={{ flex: 1, padding: "28px", overflowY: "auto" }}>

                    {/* Page Header */}
                    <div className="animate-fadeInUp" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
                        <div>
                            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
                                📚 Classes Management
                            </h1>
                            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>
                                Classes add, dekhen aur delete karein
                            </p>
                        </div>
                        <button
                            id="add-class-btn"
                            onClick={() => { setShowAddForm(true); setAddError(""); setNewClassName(""); }}
                            style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "11px 20px",
                                background: "linear-gradient(135deg,#1e40af,#3b82f6)",
                                border: "none", borderRadius: 11,
                                color: "#fff", fontSize: 14, fontWeight: 600,
                                cursor: "pointer", fontFamily: "inherit",
                                boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
                                transition: "all 0.25s ease",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.45)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,130,246,0.35)"; }}
                        >
                            <PlusIcon />
                            New Class Add Karein
                        </button>
                    </div>

                    {/* Stats Bar */}
                    <div className="animate-fadeInUp delay-100" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
                        {[
                            { label: "Total Classes", value: classes.length, icon: "📚", color: "#3b82f6" },
                            { label: "Search Results", value: filtered.length, icon: "🔍", color: "#06b6d4" },
                            { label: "Latest Added", value: classes[0]?.name || "—", icon: "🆕", color: "#10b981", isText: true },
                        ].map((s, i) => (
                            <div key={i} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(148,163,184,0.1)", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + "18", border: `1px solid ${s.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                                    {s.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: (s as { isText?: boolean }).isText ? 13 : 22, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 100 }}>
                                        {s.value}
                                    </div>
                                    <div style={{ fontSize: 11.5, color: "#64748b" }}>{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Toolbar: Search + View Toggle */}
                    <div className="animate-fadeInUp delay-200" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                        {/* Search */}
                        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
                            <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#64748b", display: "flex" }}>
                                <SearchIcon />
                            </div>
                            <input
                                id="search-classes"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Class dhundein..."
                                style={{
                                    width: "100%", padding: "10px 14px 10px 40px",
                                    background: "rgba(15,23,42,0.8)",
                                    border: "1.5px solid rgba(148,163,184,0.12)",
                                    borderRadius: 10, color: "#f1f5f9", fontSize: 14,
                                    fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                                    transition: "border-color 0.2s, box-shadow 0.2s",
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)"; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(148,163,184,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", padding: 0 }}
                                >
                                    <XIcon />
                                </button>
                            )}
                        </div>
                        {/* View Toggle */}
                        <div style={{ display: "flex", background: "rgba(30,41,59,0.7)", border: "1px solid rgba(148,163,184,0.1)", borderRadius: 10, padding: 4, gap: 2 }}>
                            {(["grid", "list"] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    title={mode === "grid" ? "Grid View" : "List View"}
                                    style={{
                                        padding: "7px 10px", borderRadius: 7, border: "none", cursor: "pointer",
                                        background: viewMode === mode ? "rgba(59,130,246,0.2)" : "transparent",
                                        color: viewMode === mode ? "#60a5fa" : "#64748b",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {mode === "grid" ? <GridIcon /> : <ListIcon />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── ADD CLASS FORM ──────────────────────────────── */}
                    {showAddForm && (
                        <div
                            className="animate-fadeInUp"
                            style={{
                                background: "rgba(30,41,59,0.85)",
                                border: "1px solid rgba(59,130,246,0.25)",
                                borderRadius: 16,
                                padding: "24px",
                                marginBottom: 24,
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
                                    ➕ Nayi Class Add Karein
                                </h3>
                                <button
                                    onClick={() => { setShowAddForm(false); setAddError(""); setNewClassName(""); }}
                                    style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex", padding: 4, borderRadius: 6, transition: "color 0.2s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                                >
                                    <XIcon />
                                </button>
                            </div>
                            <form onSubmit={handleAddClass} style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <input
                                        id="class-name-input"
                                        type="text"
                                        value={newClassName}
                                        onChange={(e) => { setNewClassName(e.target.value); setAddError(""); }}
                                        placeholder="Maslan: Class 9, Class 10, FA Part 1..."
                                        autoFocus
                                        style={{
                                            width: "100%", padding: "12px 16px",
                                            background: "rgba(15,23,42,0.8)",
                                            border: `1.5px solid ${addError ? "rgba(239,68,68,0.5)" : "rgba(148,163,184,0.15)"}`,
                                            borderRadius: 10, color: "#f1f5f9", fontSize: 14,
                                            fontFamily: "inherit", outline: "none",
                                            boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s",
                                        }}
                                        onFocus={(e) => { if (!addError) { e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)"; } }}
                                        onBlur={(e) => { if (!addError) { e.currentTarget.style.borderColor = "rgba(148,163,184,0.15)"; e.currentTarget.style.boxShadow = "none"; } }}
                                    />
                                    {addError && (
                                        <p style={{ fontSize: 12.5, color: "#fca5a5", margin: "6px 0 0", display: "flex", alignItems: "center", gap: 5 }}>
                                            ⚠️ {addError}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    id="submit-class-btn"
                                    disabled={isAdding}
                                    style={{
                                        padding: "12px 22px",
                                        background: isAdding ? "rgba(59,130,246,0.5)" : "linear-gradient(135deg,#1e40af,#3b82f6)",
                                        border: "none", borderRadius: 10,
                                        color: "#fff", fontSize: 14, fontWeight: 600,
                                        cursor: isAdding ? "not-allowed" : "pointer",
                                        fontFamily: "inherit",
                                        display: "flex", alignItems: "center", gap: 8,
                                        transition: "all 0.2s", whiteSpace: "nowrap",
                                        boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
                                    }}
                                    onMouseEnter={(e) => { if (!isAdding) e.currentTarget.style.transform = "translateY(-1px)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                                >
                                    {isAdding ? (
                                        <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Adding...</>
                                    ) : (
                                        <><PlusIcon /> Add Class</>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ── CLASSES GRID / LIST ─────────────────────────── */}
                    {isLoading ? (
                        <div style={{ display: "grid", gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill,minmax(240px,1fr))" : "1fr", gap: 14 }}>
                            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="animate-fadeIn" style={{ textAlign: "center", padding: "60px 20px" }}>
                            <div style={{ fontSize: 56, marginBottom: 16 }}>{searchQuery ? "🔍" : "📭"}</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", margin: "0 0 8px" }}>
                                {searchQuery ? `"${searchQuery}" nahi mili` : "Koi class nahi hai"}
                            </h3>
                            <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 24px" }}>
                                {searchQuery ? "Search query badlen ya nayi class add karein." : "Upar wala button click karke pehli class add karein."}
                            </p>
                            {!searchQuery && (
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    style={{ padding: "10px 22px", background: "linear-gradient(135deg,#1e40af,#3b82f6)", border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                                >
                                    ➕ Pehli Class Add Karein
                                </button>
                            )}
                        </div>
                    ) : (
                        <div
                            className="animate-fadeIn"
                            style={{
                                display: "grid",
                                gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill,minmax(260px,1fr))" : "1fr",
                                gap: viewMode === "grid" ? 16 : 10,
                            }}
                        >
                            {filtered.map((cls, idx) => (
                                <div
                                    key={cls._id}
                                    className="animate-fadeInUp"
                                    style={{
                                        animationDelay: `${idx * 0.05}s`,
                                        background: "rgba(30,41,59,0.7)",
                                        border: "1px solid rgba(148,163,184,0.1)",
                                        borderRadius: viewMode === "grid" ? 16 : 12,
                                        padding: viewMode === "grid" ? "22px 20px" : "14px 20px",
                                        cursor: "pointer",
                                        transition: "all 0.25s ease",
                                        position: "relative",
                                        overflow: "hidden",
                                        display: viewMode === "list" ? "flex" : "block",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.25)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(148,163,184,0.1)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                                >
                                    {/* Top accent line */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#1e40af,#3b82f6,#06b6d4)" }} />

                                    <div style={{ display: "flex", alignItems: viewMode === "grid" ? "flex-start" : "center", gap: 14, flex: 1 }}>
                                        {/* Icon */}
                                        <div style={{
                                            width: viewMode === "grid" ? 48 : 42,
                                            height: viewMode === "grid" ? 48 : 42,
                                            flexShrink: 0,
                                            borderRadius: 12,
                                            background: "linear-gradient(135deg,rgba(30,64,175,0.3),rgba(59,130,246,0.2))",
                                            border: "1px solid rgba(59,130,246,0.2)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: viewMode === "grid" ? 22 : 18,
                                            marginBottom: viewMode === "grid" ? 14 : 0,
                                        }}>
                                            📚
                                        </div>

                                        {viewMode === "grid" ? (
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", margin: "0 0 5px", textTransform: "capitalize", letterSpacing: "-0.2px" }}>
                                                    {cls.name}
                                                </h3>
                                                <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px" }}>
                                                    Added: {formatDate(cls.createdAt)}
                                                </p>
                                                <div style={{ display: "flex", gap: 8 }}>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); navigate(`/subjects?classId=${cls._id}&className=${encodeURIComponent(cls.name)}`); }}
                                                        style={{ flex: 1, padding: "8px 0", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, color: "#60a5fa", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.2)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; }}
                                                    >
                                                        📖 Subjects
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setDeleteTarget(cls); }}
                                                        style={{ padding: "8px 12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 8, color: "#f87171", fontSize: 12, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5, fontWeight: 600, transition: "all 0.2s" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                                                    >
                                                        <TrashIcon /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 20 }}>
                                                <div>
                                                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", margin: 0, textTransform: "capitalize" }}>{cls.name}</h3>
                                                    <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0 0" }}>Added: {formatDate(cls.createdAt)}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* List mode actions */}
                                    {viewMode === "list" && (
                                        <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 16 }}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate(`/subjects?classId=${cls._id}&className=${encodeURIComponent(cls.name)}`); }}
                                                style={{ padding: "7px 14px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, color: "#60a5fa", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 5 }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.2)"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; }}
                                            >
                                                📖 Subjects
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setDeleteTarget(cls); }}
                                                style={{ padding: "7px 12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 8, color: "#f87171", fontSize: 12.5, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5, fontWeight: 600, transition: "all 0.2s" }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                                            >
                                                <TrashIcon /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* ── DELETE CONFIRM MODAL ──────────────────────────── */}
            {deleteTarget && (
                <ConfirmModal
                    className={deleteTarget.name}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                    isDeleting={isDeleting}
                />
            )}

            {/* ── TOAST ────────────────────────────────────────── */}
            {toast && <Toast message={toast.message} type={toast.type} />}

            {/* Spinner & Pulse keyframes */}
            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
      `}</style>
        </div>
    );
};

export default ClassesPage;

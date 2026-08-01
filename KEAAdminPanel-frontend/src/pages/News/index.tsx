import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { createNews, deleteNews, getAllNews, updateNews } from "../../services/newsService";
import type { News } from "../../services/newsService";

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19,6l-1,14H6L5,6" />
    <path d="M10,11v6" />
    <path d="M14,11v6" />
    <path d="M9,6V4h6v2" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AlertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LogOutIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const navItems = [
  { icon: <HomeIcon />, label: "Dashboard", path: "/dashboard" },
  { icon: <BookIcon />, label: "Classes", path: "/classes" },
  { icon: <LayersIcon />, label: "Subjects", path: "/subjects" },
  { icon: <FileIcon />, label: "Documents", path: "/documents" },
  { icon: <FileIcon />, label: "News", path: "/news" },
];

interface ConfirmModalProps {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ itemName, onConfirm, onCancel, isDeleting }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "rgba(0,0,0,0.65)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}
    onClick={(e) => e.target === e.currentTarget && onCancel()}
  >
    <div
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
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "rgba(239,68,68,0.12)",
          border: "1px solid rgba(239,68,68,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          color: "#ef4444",
        }}
      >
        <AlertIcon />
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", margin: "0 0 10px" }}>News Delete Karein?</h3>
      <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 8px", lineHeight: 1.6 }}>
        Kya aap yaqeenan <strong style={{ color: "#fca5a5" }}>&quot;{itemName}&quot;</strong> ko delete karna chahte hain?
      </p>
      <p style={{ fontSize: 13, color: "#ef4444", margin: "0 0 28px" }}>⚠️ Yeh action undo nahi ho sakta.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={onCancel}
          disabled={isDeleting}
          style={{
            flex: 1,
            padding: "11px 0",
            background: "rgba(148,163,184,0.08)",
            border: "1px solid rgba(148,163,184,0.15)",
            borderRadius: 10,
            color: "#94a3b8",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          style={{
            flex: 1,
            padding: "11px 0",
            background: isDeleting ? "rgba(239,68,68,0.4)" : "linear-gradient(135deg,#dc2626,#ef4444)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10,
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: isDeleting ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {isDeleting ? "Deleting..." : "🗑️ Delete"}
        </button>
      </div>
    </div>
  </div>
);

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => (
  <div
    style={{
      position: "fixed",
      bottom: 28,
      right: 28,
      zIndex: 300,
      padding: "14px 20px",
      background: type === "success" ? "linear-gradient(135deg,rgba(5,150,105,0.95),rgba(16,185,129,0.95))" : "linear-gradient(135deg,rgba(185,28,28,0.95),rgba(239,68,68,0.95))",
      border: `1px solid ${type === "success" ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
      borderRadius: 12,
      color: "#fff",
      fontSize: 14,
      fontWeight: 600,
      boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      backdropFilter: "blur(12px)",
      display: "flex",
      alignItems: "center",
      gap: 10,
      maxWidth: 320,
    }}
  >
    <span style={{ fontSize: 18 }}>{type === "success" ? "✅" : "❌"}</span>
    {message}
  </div>
);

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
  </div>
);

const NewsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<News | null>(null);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ newsTitle: "", newsDetail: "", newsType: "General" });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const data = await getAllNews();
      setNewsList(data ?? []);
    } catch {
      showToast("News load nahi hui. Backend check karein.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadNews();
  }, []);

  const filteredNews = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return newsList.filter((item) =>
      item.newsTitle.toLowerCase().includes(query) ||
      item.newsDetail.toLowerCase().includes(query) ||
      item.newsType.toLowerCase().includes(query)
    );
  }, [newsList, searchQuery]);

  const resetForm = () => {
    setForm({ newsTitle: "", newsDetail: "", newsType: "General" });
    setEditId(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.newsTitle.trim() || !form.newsDetail.trim()) {
      showToast("Title aur detail dono fill karna zaroori hai.", "error");
      return;
    }

    setIsSaving(true);
    try {
      if (editId) {
        await updateNews(editId, {
          newsTitle: form.newsTitle.trim(),
          newsDetail: form.newsDetail.trim(),
          newsType: form.newsType,
        });
        showToast("News update ho gayi.", "success");
      } else {
        await createNews({
          newsTitle: form.newsTitle.trim(),
          newsDetail: form.newsDetail.trim(),
          newsType: form.newsType,
        });
        showToast("News add ho gayi.", "success");
      }
      await loadNews();
      resetForm();
    } catch {
      showToast("Action fail ho gayi. Check backend.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteNews(deleteTarget._id);
      setDeleteTarget(null);
      showToast("News delete ho gayi.", "success");
      await loadNews();
    } catch {
      showToast("Delete fail ho gayi.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (item: News) => {
    setEditId(item._id);
    setForm({
      newsTitle: item.newsTitle,
      newsDetail: item.newsDetail,
      newsType: item.newsType,
    });
    setShowAddForm(true);
  };

  const handleLogout = () => {
    if (!logoutConfirm) {
      setLogoutConfirm(true);
      return;
    }
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a", fontFamily: "Inter, sans-serif" }}>
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

        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
          {navItems.map((item) => {
            const isActive = window.location.pathname === item.path;
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
                  background: isActive ? "linear-gradient(135deg, rgba(30,64,175,0.4), rgba(59,130,246,0.2))" : "transparent",
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
              >
                <span style={{ flexShrink: 0, display: "flex" }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "12px", borderTop: "1px solid rgba(148,163,184,0.08)" }}>
          {sidebarOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(30,41,59,0.6)", borderRadius: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff" }}>{user?.name?.charAt(0) || "A"}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name || "Admin"}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{user?.email || "admin@example.com"}</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            style={{ marginTop: 10, width: "100%", padding: "10px 12px", borderRadius: 10, background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.15)", color: "#94a3b8", cursor: "pointer" }}
          >
            {sidebarOpen ? "Collapse" : "Expand"}
          </button>
          <button
            onClick={handleLogout}
            style={{ marginTop: 8, width: "100%", padding: "10px 12px", borderRadius: 10, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", cursor: "pointer" }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><LogOutIcon /> {sidebarOpen ? "Logout" : ""}</span>
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.3em", color: "#64748b" }}>Admin Panel</p>
            <h1 style={{ margin: "4px 0 0", fontSize: 28, fontWeight: 800, color: "#f8fafc" }}>News Management</h1>
          </div>
          <button
            onClick={() => {
              setEditId(null);
              setForm({ newsTitle: "", newsDetail: "", newsType: "General" });
              setShowAddForm((prev) => !prev);
            }}
            style={{ padding: "12px 16px", borderRadius: 12, background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontWeight: 700 }}
          >
            <PlusIcon /> {showAddForm ? "Close" : "Add News"}
          </button>
        </div>

        {showAddForm && (
          <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 18, padding: 20, marginBottom: 20 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 18, color: "#f8fafc" }}>{editId ? "Update News" : "Add New News"}</h2>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
              <input
                value={form.newsTitle}
                onChange={(e) => setForm({ ...form, newsTitle: e.target.value })}
                placeholder="News Title"
                style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(148,163,184,0.2)", background: "#0f172a", color: "#fff" }}
              />
              <textarea
                value={form.newsDetail}
                onChange={(e) => setForm({ ...form, newsDetail: e.target.value })}
                placeholder="News Detail"
                rows={5}
                style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(148,163,184,0.2)", background: "#0f172a", color: "#fff", resize: "vertical" }}
              />
              <select
                value={form.newsType}
                onChange={(e) => setForm({ ...form, newsType: e.target.value })}
                style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(148,163,184,0.2)", background: "#0f172a", color: "#fff" }}
              >
                <option value="General">General</option>
                <option value="Academic">Academic</option>
                <option value="Event">Event</option>
                <option value="Important">Important</option>
              </select>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" disabled={isSaving} style={{ padding: "12px 16px", borderRadius: 10, background: "linear-gradient(135deg,#16a34a,#22c55e)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700 }}>
                  {isSaving ? "Saving..." : editId ? "Update News" : "Save News"}
                </button>
                <button type="button" onClick={resetForm} style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(148,163,184,0.12)", color: "#cbd5e1", border: "1px solid rgba(148,163,184,0.2)", cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
            <SearchIcon />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news"
              style={{ marginLeft: 8, width: "calc(100% - 24px)", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.7)", color: "#fff" }}
            />
          </div>
          <div style={{ color: "#94a3b8", fontSize: 13 }}>{filteredNews.length} news</div>
        </div>

        {isLoading ? (
          <div style={{ display: "grid", gap: 12 }}>
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredNews.length === 0 ? (
          <div style={{ padding: 24, borderRadius: 16, background: "rgba(15,23,42,0.8)", border: "1px solid rgba(148,163,184,0.16)", color: "#cbd5e1" }}>No news found.</div>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {filteredNews.map((item) => (
              <div key={item._id} style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 16, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <h3 style={{ margin: 0, fontSize: 18, color: "#f8fafc" }}>{item.newsTitle}</h3>
                      <span style={{ padding: "4px 8px", borderRadius: 999, background: "rgba(59,130,246,0.16)", color: "#93c5fd", fontSize: 12 }}>{item.newsType}</span>
                    </div>
                    <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.7 }}>{item.newsDetail}</p>
                    <p style={{ margin: "10px 0 0", color: "#64748b", fontSize: 12 }}>
                      Created: {new Date(item.createdAt).toLocaleDateString("en-PK")}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => handleEdit(item)} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.12)", color: "#93c5fd", cursor: "pointer" }}><EditIcon /></button>
                    <button onClick={() => setDeleteTarget(item)} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.12)", color: "#fca5a5", cursor: "pointer" }}><TrashIcon /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {deleteTarget && (
        <ConfirmModal itemName={deleteTarget.newsTitle} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} isDeleting={isDeleting} />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
      {logoutConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#111827", padding: 24, borderRadius: 16, minWidth: 260 }}>
            <h3 style={{ color: "#f8fafc", marginTop: 0 }}>Logout?</h3>
            <p style={{ color: "#cbd5e1" }}>Kya aap sign out karna chahte hain?</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setLogoutConfirm(false)} style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(148,163,184,0.14)", color: "#fff", border: "1px solid rgba(148,163,184,0.2)", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleLogout} style={{ padding: "10px 12px", borderRadius: 10, background: "#dc2626", color: "#fff", border: "none", cursor: "pointer" }}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;

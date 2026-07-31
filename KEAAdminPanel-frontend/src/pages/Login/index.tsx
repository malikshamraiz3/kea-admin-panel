import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/* ─── SVG ICONS ─────────────────────────────────────────────── */
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

/* ─── FLOATING ORB ───────────────────────────────────────────── */
const FloatingOrb: React.FC<{
  size: number; x: number; y: number; color: string; delay?: number;
}> = ({ size, x, y, color, delay = 0 }) => (
  <div
    className="animate-float"
    style={{
      position: "absolute",
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      borderRadius: "50%",
      background: color,
      filter: "blur(60px)",
      opacity: 0.3,
      animationDelay: `${delay}s`,
      pointerEvents: "none",
    }}
  />
);

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email aur password dono required hain.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#0f172a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Orbs */}
      <FloatingOrb size={500} x={-10} y={-10} color="radial-gradient(circle, #1e40af, transparent)" delay={0} />
      <FloatingOrb size={400} x={70} y={60} color="radial-gradient(circle, #0891b2, transparent)" delay={1.5} />
      <FloatingOrb size={300} x={50} y={-20} color="radial-gradient(circle, #7c3aed, transparent)" delay={3} />
      <FloatingOrb size={350} x={80} y={-5} color="radial-gradient(circle, #1e40af, transparent)" delay={2} />

      {/* Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* ── LEFT PANEL ─────────────────────────────────────────── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "50%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 64px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div
          className={`animate-fadeInUp ${mounted ? "" : "opacity-0"}`}
          style={{ marginBottom: 48 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(59,130,246,0.35)",
              }}
            >
              <ShieldIcon />
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
                KEA Admin
              </div>
              <div style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.5px" }}>
                Knowledge Education Authority
              </div>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div
          className={`animate-fadeInUp delay-100 ${mounted ? "" : "opacity-0"}`}
          style={{ marginBottom: 24 }}
        >
          <h1
            style={{
              fontSize: 48,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#f1f5f9",
              marginBottom: 16,
            }}
          >
            Manage Your <br />
            <span className="gradient-text">Education Portal</span>
          </h1>
          <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.7, maxWidth: 420 }}>
            Pakistan ka leading educational management system. Classes, subjects, aur documents
            — sab kuch ek jagah, secure aur fast.
          </p>
        </div>

        {/* Feature Pills */}
        <div
          className={`animate-fadeInUp delay-200 ${mounted ? "" : "opacity-0"}`}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          {[
            { icon: "🎓", label: "Classes & Subjects Management" },
            { icon: "📄", label: "Document Upload & Organization" },
            { icon: "🔐", label: "Secure Role-Based Access" },
            { icon: "📊", label: "Real-Time Dashboard Analytics" },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                background: "rgba(30,41,59,0.6)",
                border: "1px solid rgba(148,163,184,0.1)",
                borderRadius: 10,
                backdropFilter: "blur(12px)",
                width: "fit-content",
              }}
            >
              <span style={{ fontSize: 18 }}>{f.icon}</span>
              <span style={{ fontSize: 14, color: "#cbd5e1", fontWeight: 500 }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom Badge */}
        <div
          className={`animate-fadeInUp delay-300 ${mounted ? "" : "opacity-0"}`}
          style={{ marginTop: 48 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: 20,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span style={{ fontSize: 13, color: "#10b981", fontWeight: 500 }}>System Online — All Services Running</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (LOGIN FORM) ────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className={`glass-card animate-fadeInUp ${mounted ? "" : "opacity-0"}`}
          style={{
            width: "100%",
            maxWidth: 440,
            padding: "40px 36px",
          }}
        >
          {/* Mobile Logo */}
          <div
            className="flex lg:hidden"
            style={{ alignItems: "center", gap: 12, marginBottom: 28 }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 11,
                background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShieldIcon />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9" }}>KEA Admin</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Knowledge Education Authority</div>
            </div>
          </div>

          {/* Form Header */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px", marginBottom: 6 }}>
              Admin Login
            </h2>
            <p style={{ fontSize: 14, color: "#94a3b8" }}>
              Apna account access karein
            </p>
          </div>

          {/* Backend Connected Info */}
          <div
            style={{
              padding: "12px 14px",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: 10,
              marginBottom: 24,
            }}
          >
            <p style={{ fontSize: 12.5, color: "#6ee7b7", lineHeight: 1.6 }}>
              <strong>🔗 Backend Connected:</strong> MongoDB database se jura hua hai. Apna registered email aur password use karein.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="animate-fadeIn"
              style={{
                padding: "12px 14px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 10,
                marginBottom: 20,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>⚠️</span>
              <p style={{ fontSize: 13.5, color: "#fca5a5", lineHeight: 1.5 }}>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label
                htmlFor="email"
                style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8 }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MailIcon />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kea.edu.pk"
                  className="kea-input"
                  style={{ paddingLeft: 44 }}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="password"
                style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8 }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LockIcon />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="kea-input"
                  style={{ paddingLeft: 44, paddingRight: 44 }}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 28,
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontSize: 13.5,
                  color: "#94a3b8",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  id="remember"
                  style={{
                    width: 16,
                    height: 16,
                    accentColor: "#3b82f6",
                    cursor: "pointer",
                  }}
                />
                Mujhe yaad rakho
              </label>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 13.5,
                  color: "#60a5fa",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "color 0.2s",
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#93c5fd")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#60a5fa")}
              >
                Password bhool gaye?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="login-submit-btn"
              className="btn-primary"
              disabled={isLoading}
              style={{ width: "100%", height: 48, fontSize: 15 }}
            >
              {isLoading ? (
                <>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid #fff",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span style={{ position: "relative", zIndex: 1 }}>Login ho raha hai...</span>
                </>
              ) : (
                <span style={{ position: "relative", zIndex: 1 }}>🔐 &nbsp;Login Karen</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "24px 0",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "rgba(148,163,184,0.1)" }} />
            <span style={{ fontSize: 12, color: "#64748b" }}>SECURED BY KEA</span>
            <div style={{ flex: 1, height: 1, background: "rgba(148,163,184,0.1)" }} />
          </div>

          {/* Security Badges */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {["🔒 SSL Encrypted", "🛡️ Secure Portal", "🔑 2FA Ready"].map((b) => (
              <div
                key={b}
                style={{
                  padding: "5px 10px",
                  background: "rgba(148,163,184,0.05)",
                  border: "1px solid rgba(148,163,184,0.1)",
                  borderRadius: 20,
                  fontSize: 11,
                  color: "#64748b",
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LoginPage;

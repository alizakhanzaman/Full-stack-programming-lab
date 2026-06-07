"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";
import API from "@/utils/api";
import toast from "react-hot-toast";
import Link from "next/link";

// ── Icons ─────────────────────────────────────────────────────────

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const XCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const MailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// ── Helpers ───────────────────────────────────────────────────────

const getInitials = (name) =>
  (name || "?").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

const AVATAR_PALETTE = [
  { bg: "rgba(245,158,11,0.18)",  border: "rgba(245,158,11,0.5)",   text: "#F59E0B" },
  { bg: "rgba(34,197,94,0.14)",   border: "rgba(34,197,94,0.4)",    text: "#22C55E" },
  { bg: "rgba(96,165,250,0.14)",  border: "rgba(96,165,250,0.38)",  text: "#60A5FA" },
  { bg: "rgba(239,68,68,0.13)",   border: "rgba(239,68,68,0.38)",   text: "#EF4444" },
  { bg: "rgba(251,146,60,0.15)",  border: "rgba(251,146,60,0.4)",   text: "#FB923C" },
  { bg: "rgba(167,139,250,0.13)", border: "rgba(167,139,250,0.38)", text: "#A78BFA" },
];

const getAvatarColor = (name) =>
  AVATAR_PALETTE[(name || "").charCodeAt(0) % AVATAR_PALETTE.length];

const STATUS_CONFIG = {
  Active:   { dot: "#22C55E", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.25)",  color: "#22C55E" },
  Lead:     { dot: "#60A5FA", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.22)", color: "#60A5FA" },
  Inactive: { dot: "#EF4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.22)",  color: "#EF4444" },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || { dot: "#6B7199", bg: "rgba(107,113,153,0.1)", border: "rgba(107,113,153,0.22)", color: "#6B7199" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 10px", borderRadius: 999,
      background: cfg.bg, border: `1px solid ${cfg.border}`,
      fontSize: 11, fontWeight: 700, color: cfg.color,
      letterSpacing: "0.01em",
      fontFamily: "var(--font-body)",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
      {status}
    </span>
  );
};

// ── Date & Location pills ──────────────────────────────────────────

function DatePill() {
  const now = new Date();
  const formatted = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 16px", borderRadius: 999,
      background: "rgba(245,158,11,0.08)",
border: "1px solid rgba(245,158,11,0.2)",
      fontSize: 12.5, fontWeight: 600, color: "var(--clr-text-sub)",
      fontFamily: "var(--font-body)",
    }}>
      <span style={{ color: "#F59E0B" }}><CalendarIcon /></span>
      {formatted}
    </div>
  );
}

function LocationPill() {
  const [loc, setLoc] = useState("Locating…");

  useEffect(() => {
    if (!navigator.geolocation) { setLoc("Location unavailable"); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
          const d = await r.json();
          const city = d.address?.city || d.address?.town || d.address?.village || d.address?.county || "Unknown";
          const country = d.address?.country_code?.toUpperCase() || "";
          setLoc(`${city}${country ? ", " + country : ""}`);
        } catch { setLoc("Location unavailable"); }
      },
      () => setLoc("Islamabad, PK")
    );
  }, []);

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 16px", borderRadius: 999,
      background: "rgba(251,146,60,0.07)",
border: "1px solid rgba(251,146,60,0.18)",
      fontSize: 12.5, fontWeight: 600, color: "var(--clr-text-sub)",
      fontFamily: "var(--font-body)",
    }}>
      <span style={{ color: "#FB923C" }}><MapPinIcon /></span>
      {loc}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  const fetchCustomers = useCallback(async () => {
    try {
      const { data } = await API.get("/customers");
      setCustomers(data);
    } catch {
      toast.error("Failed to load customers");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchCustomers();
  }, [user, fetchCustomers]);

  const stats = [
  { label: "Total Customers", value: customers.length,                                        color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  icon: <UsersIcon />,   cls: "stat-card-blue"  },
  { label: "Active",          value: customers.filter(c => c.status === "Active").length,   color: "#22C55E", bg: "rgba(34,197,94,0.1)",  icon: <CheckIcon />,   cls: "stat-card-green" },
  { label: "Leads",           value: customers.filter(c => c.status === "Lead").length,     color: "#F59E0B", bg: "rgba(245,158,11,0.1)", icon: <StarIcon />,    cls: "stat-card-cyan"  },
  { label: "Inactive",        value: customers.filter(c => c.status === "Inactive").length, color: "#EF4444", bg: "rgba(239,68,68,0.1)",  icon: <XCircleIcon />, cls: "stat-card-red"   },
];

  const recentCustomers = [...customers].slice(0, 6);

  if (loading || !user) return null;

  return (
    <>
      {/* rc-table styles scoped here — no duplicate @import */}
      <style>{`
        .rc-table-wrap { overflow-x: auto; }
        .rc-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800; flex-shrink: 0;
          font-family: var(--font-display);
          border-width: 1.5px; border-style: solid;
        }
        .rc-skeleton-pulse {
  background: linear-gradient(90deg, rgba(245,158,11,0.05) 25%, rgba(245,158,11,0.1) 50%, rgba(245,158,11,0.05) 75%);
  background-size: 200% 100%;
  animation: rcPulse 1.4s ease infinite;
  border-radius: 6px; height: 14px;
}
        @keyframes rcPulse {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />

        <main style={{
          flex: 1,
          padding: "32px 32px 32px 36px",
          overflowY: "auto",
          background: "var(--clr-bg-main)",
          minWidth: 0,
          fontFamily: "var(--font-body)",
        }}>

          {/* ── Page Header ─────────────────────────────── */}
<div
  style={{
    marginBottom: 32,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  }}
>
  {/* Left Side */}
  <div>
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontSize: 28,
        fontWeight: 800,
        color: "var(--clr-text)",
        letterSpacing: "-0.03em",
        lineHeight: 1.15,
        marginBottom: 6,
      }}
    >
      Welcome back, {user?.name?.split(" ")[0]} !
    </h1>

    <p
      style={{
        fontSize: 13.5,
        color: "var(--clr-text-muted)",
        fontWeight: 500,
        fontFamily: "var(--font-body)",
      }}
    >
      Here&apos;s an overview of your customer base
    </p>
  </div>

  {/* Right Side */}
  <div
    style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      justifyContent: "flex-end",
    }}
  >
    <DatePill />
    <LocationPill />
  </div>
</div>

          {/* ── Stat Cards ──────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            {stats.map((s) => (
              <div key={s.label} className={`glass-card ${s.cls}`} style={{ padding: "22px 22px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    {/* Stat number uses display font for bold visual impact */}
                    <div style={{
                      fontSize: 50, fontWeight: 800, color: s.color,
                      letterSpacing: "-0.04em", lineHeight: 1,
                      fontFamily: "var(--font-display)",
                    }}>
                      {fetching ? "—" : s.value}
                    </div>
                    <div style={{
                      fontSize: 11.5, color: "var(--clr-text-muted)",
                      marginTop: 25, fontWeight: 600, letterSpacing: "0.01em",
                      fontFamily: "var(--font-body)",
                    }}>
                      {s.label}
                    </div>
                  </div>
                  <div style={{
                    width: 42, height: 42, borderRadius: 11,
                    background: s.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.color, flexShrink: 0,
                  }}>
                    {s.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Recent Customers Card ────────────────────── */}
          <div className="glass-card" style={{ padding: "28px 28px" }}>

            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28, fontWeight: 800,
                  color: "var(--clr-text)", letterSpacing: "-0.03em",
                }}>
                  Recent Customers
                </h2>
                <p style={{
                  fontSize: 12, color: "var(--clr-text-muted)",
                  marginTop: 3, fontWeight: 500,
                  fontFamily: "var(--font-body)",
                }}>
                  Latest additions to your customer base
                </p>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Link href="/dashboard/add-customer">
                  <button className="btn-primary" style={{ gap: 7, fontSize: 13, padding: "9px 18px" }}>
                    <PlusIcon />
                    Add Customer
                  </button>
                </Link>
                <Link href="/dashboard/customers">
                  <button className="btn-primary" style={{ gap: 7, fontSize: 13, padding: "9px 18px" }}>
                    <UsersIcon />
                    View All
                    <ArrowRightIcon />
                  </button>
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--clr-border)", margin: "16px 0 4px" }} />

            {/* Table */}
            <div className="rc-table-wrap">
              <table className="rc-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {fetching ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(108,99,255,0.1)", flexShrink: 0 }} />
                            <div className="rc-skeleton-pulse" style={{ width: 110 }} />
                          </div>
                        </td>
                        <td><div className="rc-skeleton-pulse" style={{ width: 90 }} /></td>
                        <td><div className="rc-skeleton-pulse" style={{ width: 60 }} /></td>
                        <td><div className="rc-skeleton-pulse" style={{ width: 150 }} /></td>
                      </tr>
                    ))
                  ) : recentCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={4}>
                        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--clr-text-muted)", fontFamily: "var(--font-body)" }}>
                          <div style={{ fontSize: 34, marginBottom: 10, opacity: 0.45 }}>👥</div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>No customers yet — add your first one!</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    recentCustomers.map((c) => {
                      const av = getAvatarColor(c.name);
                      return (
                        <tr key={c._id}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                              <div className="rc-avatar" style={{ background: av.bg, borderColor: av.border, color: av.text }}>
                                {getInitials(c.name)}
                              </div>
                              <span style={{
                                fontSize: 13.5, fontWeight: 700, color: "var(--clr-text)",
                                whiteSpace: "nowrap", overflow: "hidden",
                                textOverflow: "ellipsis", maxWidth: 160,
                                fontFamily: "var(--font-body)",
                              }}>
                                {c.name}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div style={{
                              display: "flex", alignItems: "center", gap: 6,
                              color: "var(--clr-text-sub)", fontSize: 12.5,
                              fontWeight: 500, fontFamily: "var(--font-body)",
                            }}>
                              <BuildingIcon />
                              {c.company || <span style={{ opacity: 0.4, fontStyle: "italic" }}>—</span>}
                            </div>
                          </td>
                          <td><StatusBadge status={c.status} /></td>
                          <td>
                            <div style={{
                              display: "flex", alignItems: "center", gap: 6,
                              color: "var(--clr-text-muted)", fontSize: 12,
                              fontWeight: 500, fontFamily: "var(--font-body)",
                            }}>
                              <MailIcon />
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
                                {c.email || <span style={{ opacity: 0.4, fontStyle: "italic" }}>—</span>}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      <Chatbot customers={customers} />
    </>
  );
}
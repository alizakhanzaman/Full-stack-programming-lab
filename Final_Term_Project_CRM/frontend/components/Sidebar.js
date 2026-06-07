"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// ── Icon Components ─────────────────────────────────────────────────

const DashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
);

const CustomersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const InvoicesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const OrbitLogo = ({ size = 58 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    style={{
      flexShrink: 0,
      filter: "drop-shadow(0 6px 20px rgba(245,158,11,0.45))",
    }}
  >
    <defs>
      <linearGradient
        id="gLogoLogin"
        x1="0"
        y1="0"
        x2="48"
        y2="48"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#FCD34D" />
      </linearGradient>
    </defs>

    <ellipse
      cx="24"
      cy="24"
      rx="19"
      ry="10"
      stroke="url(#gLogoLogin)"
      strokeWidth="2.5"
      fill="none"
      transform="rotate(-35 24 24)"
    />

    <ellipse
      cx="24"
      cy="24"
      rx="13"
      ry="6"
      stroke="rgba(245,158,11,0.35)"
      strokeWidth="1.5"
      fill="none"
      transform="rotate(55 24 24)"
    />

    <circle
      cx="24"
      cy="24"
      r="5"
      fill="url(#gLogoLogin)"
    />

    <circle
      cx="39"
      cy="17"
      r="3.5"
      fill="#FB923C"
    />
  </svg>
);

const navItems = [
  { href: "/dashboard",           label: "Dashboard", icon: <DashIcon /> },
  { href: "/dashboard/customers", label: "Customers", icon: <CustomersIcon /> },
  { href: "/dashboard/invoices",  label: "Invoices",  icon: <InvoicesIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  return (
    <div style={{
      width: 256,
      minHeight: "100vh",
      background: "var(--clr-sidebar)",
      borderRight: "1px solid var(--clr-border)",
      display: "flex",
      flexDirection: "column",
      padding: "20px 14px",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      height: "100vh",
      fontFamily: "var(--font-body)",
    }}>

      {/* ── Logo ─────────────────────────────────────── */}
      <div style={{ padding: "10px 8px 30px" }}>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
          <OrbitLogo />
          <div>
  <div style={{ fontSize: 15.5, fontWeight: 800, color: "var(--clr-text)", letterSpacing: "-0.02em", lineHeight: 1, fontFamily: "'Fraunces', Georgia, serif" }}>
    Orbit-CRM
  </div>
  <div style={{ fontSize: 9.5, color: "var(--clr-text-muted)", letterSpacing: "0.04em", marginTop: 3.5, lineHeight: 1, fontWeight: 500 }}>
    Manage Better. Connect Stronger.
  </div>
</div>
        </Link>
      </div>

      {/* ── Navigation ───────────────────────────────── */}
      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: "rgba(245,158,11,0.45)", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 8, paddingLeft: 13, textTransform: "uppercase" }}>
  Navigation
</div>

        {navItems.map((item) => {
          const isActive = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
              style={{ marginBottom: 3 }}
            >
              <span style={{ opacity: isActive ? 1 : 0.6, display: "flex", flexShrink: 0, transition: "opacity 0.18s" }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ── User profile & logout ─────────────────────── */}
      <div style={{ borderTop: "1px solid var(--clr-border)", paddingTop: 14 }}>

        {/* User info row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", marginBottom: 8 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "linear-gradient(135deg, #92400E, #F59E0B)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, color: "white",
            fontFamily: "var(--font-display)",
            flexShrink: 0,
            border: "2px solid rgba(245,158,11,0.3)",
          }}>
            {initials}
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: "var(--clr-text-sub)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              fontFamily: "var(--font-body)",
            }}>
              {user?.name}
            </div>
            <div style={{
              fontSize: 11, color: "var(--clr-text-muted)",
              whiteSpace: "nowrap", overflow: "hidden",
              textOverflow: "ellipsis", marginTop: 1,
              fontFamily: "var(--font-body)",
            }}>
              {user?.email}
            </div>
          </div>
        </div>

        {/* Logout button — uses CSS var font family */}
        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            width: "100%",
            padding: "9px 13px",
            borderRadius: "var(--radius-md)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#F05555",
            fontSize: 13.5,
            fontWeight: 700,
            fontFamily: "var(--font-body)",
            transition: "background 0.18s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(240,85,85,0.08)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <LogoutIcon />
          Sign Out
        </button>
      </div>
    </div>
  );
}
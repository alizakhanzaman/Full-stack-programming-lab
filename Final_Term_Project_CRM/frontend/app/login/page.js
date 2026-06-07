"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";

const OrbitLogo = ({ size = 72 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    style={{ flexShrink: 0, filter: "drop-shadow(0 8px 24px rgba(245,158,11,0.5))" }}
  >
    <defs>
      <linearGradient id="gLogoLogin" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#FCD34D" />
      </linearGradient>
    </defs>
    <ellipse cx="24" cy="24" rx="19" ry="10" stroke="url(#gLogoLogin)" strokeWidth="2.5" fill="none" transform="rotate(-35 24 24)" />
    <ellipse cx="24" cy="24" rx="13" ry="6" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5" fill="none" transform="rotate(55 24 24)" />
    <circle cx="24" cy="24" r="5" fill="url(#gLogoLogin)" />
    <circle cx="39" cy="17" r="3.5" fill="#FB923C" />
  </svg>
);

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Login Successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">

      {/* ── Left decorative panel ───────────────────── */}
      <div className="login-left">
        <div className="login-left-brand">
          <OrbitLogo size={40} />
          <div style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--clr-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            Orbit-CRM
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em", fontFamily: "var(--font-body)" }}>
            Manage Better. Connect Stronger.
          </div>
        </div>

        <div className="login-left-quote">
          <blockquote>
            &ldquo;The best CRM is the one your team actually uses.&rdquo;
          </blockquote>
          <cite>— Built for people, not spreadsheets</cite>
        </div>

        <div className="login-left-footer">
          © {new Date().getFullYear()} Orbit-CRM. All rights reserved.
        </div>
      </div>

      {/* ── Right form panel ────────────────────────── */}
      <div className="login-right">
        <div className="login-form-wrap">

          {/* Heading */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: 28, fontWeight: 800,
              color: "var(--clr-text)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: "0 0 8px",
            }}>
              Sign in to your workspace
            </h1>
            <p style={{ fontSize: 13.5, color: "var(--clr-text-muted)", fontWeight: 500, fontFamily: "var(--font-body)", margin: 0 }}>
              Enter your credentials to continue
            </p>
          </div>

          {/* Card */}
          <div className="glass-card" style={{ padding: "32px 36px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--clr-primary-light)", marginBottom: 8, letterSpacing: "0.07em", fontFamily: "var(--font-body)" }}>
                  EMAIL ADDRESS
                </label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--clr-primary-light)", marginBottom: 8, letterSpacing: "0.07em", fontFamily: "var(--font-body)" }}>
                  PASSWORD
                </label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button
                className="btn-primary"
                type="submit"
                disabled={loading}
                style={{ marginTop: 4, padding: "14px", fontSize: 15, fontWeight: 800 }}
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </form>

            <div style={{ height: 1, background: "rgba(245,158,11,0.1)", margin: "24px 0" }} />

            <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--clr-text-muted)", fontWeight: 500, fontFamily: "var(--font-body)", margin: 0 }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" style={{ color: "var(--clr-primary)", fontWeight: 700, textDecoration: "none" }}>
                Create one
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
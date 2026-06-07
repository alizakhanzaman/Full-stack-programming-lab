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
      <linearGradient id="gLogoReg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#FCD34D" />
      </linearGradient>
    </defs>
    <ellipse cx="24" cy="24" rx="19" ry="10" stroke="url(#gLogoReg)" strokeWidth="2.5" fill="none" transform="rotate(-35 24 24)" />
    <ellipse cx="24" cy="24" rx="13" ry="6" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5" fill="none" transform="rotate(55 24 24)" />
    <circle cx="24" cy="24" r="5" fill="url(#gLogoReg)" />
    <circle cx="39" cy="17" r="3.5" fill="#FB923C" />
  </svg>
);

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .reg-root {
          min-height: 100vh;
          display: flex;
          background: #080808;
          font-family: var(--font-body);
        }

        /* ── Right decorative panel (mirrored from login) ── */
        .reg-right-panel {
          width: 420px;
          flex-shrink: 0;
          order: 2;
          background: #0C0C0C;
          border-left: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 44px;
          position: relative;
          overflow: hidden;
        }

        .reg-right-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* accent line on the RIGHT edge (mirror of login's left edge) */
        .reg-right-panel::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(245,158,11,0.6) 30%,
            rgba(245,158,11,0.6) 70%,
            transparent 100%
          );
        }

        .reg-panel-brand { position: relative; z-index: 1; }
        .reg-panel-quote { position: relative; z-index: 1; }

        .reg-panel-quote blockquote {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          line-height: 1.45;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .reg-panel-quote cite {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          font-style: normal;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: var(--font-body);
        }

        .reg-panel-footer {
          position: relative;
          z-index: 1;
          font-size: 11px;
          color: rgba(255,255,255,0.18);
          font-family: var(--font-body);
          letter-spacing: 0.04em;
        }

        /* ── Left form panel ── */
        .reg-form-side {
          flex: 1;
          order: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          background: #080808;
        }

        .reg-form-wrap { width: 100%; max-width: 400px; }

        @media (max-width: 720px) {
          .reg-right-panel { display: none; }
          .reg-form-side { padding: 32px 20px; }
        }
      `}</style>

      <div className="reg-root">

        {/* ── Left: form panel ────────────────────────── */}
        <div className="reg-form-side">
          <div className="reg-form-wrap">

            <div style={{ marginBottom: 36 }}>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: 28, fontWeight: 800,
                color: "var(--clr-text)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                margin: "0 0 8px",
              }}>
                Create your account
              </h1>
              <p style={{ fontSize: 13.5, color: "var(--clr-text-muted)", fontWeight: 500, fontFamily: "var(--font-body)", margin: 0 }}>
                Join Orbit-CRM and start managing your customers
              </p>
            </div>

            <div className="glass-card" style={{ padding: "32px 36px" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--clr-primary-light)", marginBottom: 8, letterSpacing: "0.07em", fontFamily: "var(--font-body)" }}>
                    FULL NAME
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

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
                    placeholder="Min. 6 characters"
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
                  {loading ? "Creating account..." : "Create Account →"}
                </button>
              </form>

              <div style={{ height: 1, background: "rgba(245,158,11,0.1)", margin: "24px 0" }} />

              <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--clr-text-muted)", fontWeight: 500, fontFamily: "var(--font-body)", margin: 0 }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "var(--clr-primary)", fontWeight: 700, textDecoration: "none" }}>
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </div>

        {/* ── Right: decorative panel ──────────────────── */}
        <div className="reg-right-panel">
          <div className="reg-panel-brand">
            <OrbitLogo size={40} />
            <div style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--clr-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              Orbit-CRM
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em", fontFamily: "var(--font-body)" }}>
              Manage Better. Connect Stronger.
            </div>
          </div>

          <div className="reg-panel-quote">
            <blockquote>
              "Your customers are your business. Keep them close."
            </blockquote>
            <cite>— Built for teams that move fast</cite>
          </div>

          <div className="reg-panel-footer">
            © {new Date().getFullYear()} Orbit-CRM. All rights reserved.
          </div>
        </div>

      </div>
    </>
  );
}
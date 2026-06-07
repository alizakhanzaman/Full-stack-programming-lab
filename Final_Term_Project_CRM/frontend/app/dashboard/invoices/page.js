"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import API from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// ── Icon components ───────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const GenerateIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

// ── Generate Invoice Modal ────────────────────────────────────────
// Opens when "Generate Invoice" button is clicked OR when chatbot
// navigates to /dashboard/invoices?generate=true.
// Lets user select a customer by typing/selecting from dropdown,
// then navigates to the invoice preview page for that customer.
function GenerateInvoiceModal({ customers, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");                         // text typed in the combobox
  const [selectedCustomer, setSelectedCustomer] = useState(null); // chosen customer object
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  // Filter customers whose name matches the typed query (case-insensitive)
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  // When user picks a customer from the dropdown
  const handleSelect = (customer) => {
    setSelectedCustomer(customer);
    setQuery(customer.name); // show name in input
    setShowDropdown(false);
  };

  // Navigate to existing invoice page for the selected customer
  const handleGenerate = () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer first");
      return;
    }
    router.push(`/dashboard/invoice/${selectedCustomer._id}`);
    onClose();
  };

  // Handle typing in search box
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedCustomer(null); // clear selection if user types again
    setShowDropdown(true);
  };

  // Close dropdown when clicking outside the combobox container
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Status dot colours matching the project theme
  const statusColors = {
    Active:   "#10D998",
    Lead:     "#22D3EE",
    Inactive: "#F05555",
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box" style={{ fontFamily: "var(--font-body)" }}>

        {/* ── Modal header ──────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            {/* h2 picks up font-family from .modal-box h2 rule in globals.css */}
            <h2>Generate Invoice</h2>
            <p style={{
              fontSize: 13, color: "var(--clr-text-muted)",
              marginTop: 3, fontWeight: 500,
              fontFamily: "var(--font-body)",
            }}>
              Select a customer to generate their invoice
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--clr-border)",
              borderRadius: 8, padding: 6,
              cursor: "pointer", color: "var(--clr-text-muted)",
              display: "flex", alignItems: "center",
              justifyContent: "center", transition: "all 0.15s",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "var(--clr-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "var(--clr-text-muted)"; }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--clr-border)", marginBottom: 22 }} />

        {/* Customer selector label */}
        <label style={{
          display: "block", fontSize: 11, fontWeight: 700,
          color: "var(--clr-text-muted)", marginBottom: 8,
          letterSpacing: "0.08em", textTransform: "uppercase",
          fontFamily: "var(--font-body)",
        }}>
          Customer
        </label>

        {/* ── Combobox: type to search or pick from dropdown ── */}
        <div ref={inputRef} style={{ position: "relative", marginBottom: 20 }}>

          {/* Search icon inside input */}
          <span style={{
            position: "absolute", left: 13, top: "50%",
            transform: "translateY(-50%)",
            color: "var(--clr-text-muted)",
            display: "flex", pointerEvents: "none", zIndex: 1,
          }}>
            <SearchIcon />
          </span>

          <input
            className="input-field"
            type="text"
            placeholder="Search by name..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            style={{
              paddingLeft: 38,
              // Highlight border amber when a customer is selected
              borderColor: selectedCustomer ? "var(--clr-primary)" : undefined,
              boxShadow: selectedCustomer ? "0 0 0 3px rgba(245,158,11,0.12)" : undefined,
              fontFamily: "var(--font-body)",
            }}
          />

          {/* Dropdown list */}
          {showDropdown && filteredCustomers.length > 0 && (
            <div style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
              background: "var(--clr-bg-main)",
              border: "1px solid var(--clr-border)",
              borderRadius: 12, overflow: "hidden", zIndex: 100,
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              maxHeight: 220, overflowY: "auto",
              fontFamily: "var(--font-body)",
            }}>
              {filteredCustomers.map((c, i) => (
                <div
                  key={c._id}
                  onClick={() => handleSelect(c)}
                  style={{
                    padding: "10px 14px", cursor: "pointer",
                    borderBottom: i < filteredCustomers.length - 1
                      ? "1px solid var(--clr-border)" : "none",
                    transition: "background 0.12s",
                    display: "flex", alignItems: "center", gap: 11,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {/* Avatar initials */}
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--clr-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700,
                    color: "var(--clr-text-muted)",
                    fontFamily: "var(--font-body)", flexShrink: 0,
                  }}>
                    {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>

                  {/* Name + status/company */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13.5, fontWeight: 600,
                      color: "var(--clr-text)", fontFamily: "var(--font-body)",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {c.name}
                    </div>
                    <div style={{
                      fontSize: 11.5, fontWeight: 500, marginTop: 2,
                      color: "var(--clr-text-muted)", fontFamily: "var(--font-body)",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: statusColors[c.status] || "var(--clr-text-muted)",
                        display: "inline-block", flexShrink: 0,
                      }} />
                      <span style={{ color: statusColors[c.status] || "var(--clr-text-muted)" }}>
                        {c.status}
                      </span>
                      {c.company && (
                        <>
                          <span style={{ opacity: 0.3 }}>·</span>
                          <span style={{
                            color: "var(--clr-text-muted)",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}>
                            {c.company}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No results message */}
          {showDropdown && query && filteredCustomers.length === 0 && (
            <div style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
              background: "var(--clr-bg-main)",
              border: "1px solid var(--clr-border)",
              borderRadius: 12, padding: "20px 16px", zIndex: 100,
              textAlign: "center", color: "var(--clr-text-muted)",
              fontSize: 13, fontFamily: "var(--font-body)",
            }}>
              No customers found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* ── Selected customer preview card ─────────────────── */}
        {selectedCustomer && (
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--clr-border)",
            borderRadius: 10, padding: "12px 14px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
            fontFamily: "var(--font-body)",
          }}>
            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--clr-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
              color: "var(--clr-text-muted)", flexShrink: 0,
            }}>
              {selectedCustomer.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 13.5, fontWeight: 700,
                color: "var(--clr-text)", fontFamily: "var(--font-body)",
              }}>
                {selectedCustomer.name}
              </div>
              <div style={{
                fontSize: 12, color: "var(--clr-text-muted)",
                marginTop: 2, fontWeight: 500, fontFamily: "var(--font-body)",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: statusColors[selectedCustomer.status] || "var(--clr-text-muted)",
                  display: "inline-block", flexShrink: 0,
                }} />
                <span style={{ color: statusColors[selectedCustomer.status] }}>
                  {selectedCustomer.status}
                </span>
                {selectedCustomer.email && (
                  <>
                    <span style={{ opacity: 0.3 }}>·</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {selectedCustomer.email}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Checkmark — confirms a customer is selected */}
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: "rgba(16,217,152,0.12)",
              border: "1px solid rgba(16,217,152,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10D998" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>
        )}

        {/* ── Modal action buttons ───────────────────────────── */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn-primary"
            onClick={handleGenerate}
            style={{ flex: 1, justifyContent: "center", padding: "13px", fontSize: 15, fontWeight: 800 }}
          >
            Generate Invoice →
          </button>
          <button className="btn-secondary" onClick={onClose} style={{ padding: "13px 20px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Invoices Page ─────────────────────────────────────────────────
export default function InvoicesPage() {
  const { user, loading } = useAuth();
  const [invoices, setInvoices]   = useState([]);
  const [customers, setCustomers] = useState([]);
  const [fetching, setFetching]   = useState(true);
  const [showModal, setShowModal] = useState(false); // controls Generate Invoice modal

  const searchParams = useSearchParams();

  // Auto-open the Generate Invoice modal when the chatbot navigates here
  // with ?generate=true. We wait for `user` to be ready so that the
  // customers list has already been fetched before the modal opens.
  useEffect(() => {
    if (user && searchParams.get("generate") === "true") {
      setShowModal(true);
    }
  }, [searchParams, user]); // re-runs if either searchParams or user changes

  // Load invoices and customers once the user is authenticated
  useEffect(() => {
    if (user) {
      // Fetch saved invoices from backend — GET /api/invoices/saved
      API.get("/invoices/saved")
        .then(({ data }) => setInvoices(data))
        .catch(() => toast.error("Could not load invoices"))
        .finally(() => setFetching(false));

      // Fetch customers for the Generate Invoice modal dropdown
      // Fail silently — customers are only needed for the modal
      API.get("/customers")
        .then(({ data }) => setCustomers(data))
        .catch(() => {});
    }
  }, [user]);

  if (loading || !user) return null;

  // Status badge style map — matches the project's colour palette
  const statusStyle = {
    Active:   { background: "rgba(16,217,152,0.12)",  color: "#10D998", border: "1px solid rgba(16,217,152,0.26)" },
    Lead:     { background: "rgba(34,211,238,0.1)",   color: "#22D3EE", border: "1px solid rgba(34,211,238,0.22)" },
    Inactive: { background: "rgba(240,85,85,0.1)",    color: "#F05555", border: "1px solid rgba(240,85,85,0.22)" },
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "28px 32px", background: "var(--clr-bg-main)", minWidth: 0 }}>

        {/* ── Page header ──────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 28, gap: 16, flexWrap: "wrap",
        }}>
          <div>
            {/* page-title class uses var(--font-display) from globals.css */}
            <h1 className="page-title" style={{ fontSize: 35, fontWeight: 800, color: "var(--clr-text)", letterSpacing: "-0.03em" }}>
              Invoices
            </h1>
            <p className="page-subtitle" style={{ fontSize: 15 }}>
              All saved invoices stored in the database
            </p>
          </div>

          {/* Generate Invoice button — opens the modal */}
          <button
            className="btn-primary"
            onClick={() => setShowModal(true)}
            style={{ gap: 8 }}
          >
            <GenerateIcon />
            Generate Invoice
          </button>
        </div>

        {/* ── Invoices table card ───────────────────────────── */}
        <div className="glass-card" style={{ overflow: "hidden" }}>
          {fetching ? (
            // Loading spinner while API call is in-flight
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 20px" }}>
              <div className="spinner" />
            </div>
          ) : invoices.length === 0 ? (
            // Empty state — no invoices saved yet
            <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "var(--font-body)" }}>
              <div style={{ fontSize: 40, marginBottom: 14, opacity: 0.45 }}>📄</div>
              <div style={{
                fontSize: 16, color: "var(--clr-text-sub)",
                fontWeight: 700, marginBottom: 6,
                letterSpacing: "-0.02em", fontFamily: "var(--font-display)",
              }}>
                No invoices yet
              </div>
              <div style={{
                fontSize: 13, color: "var(--clr-text-muted)",
                marginBottom: 22, fontWeight: 500, fontFamily: "var(--font-body)",
              }}>
                Generate an invoice from a customer record and click &quot;Save to Database&quot;.
              </div>
              <button className="btn-primary" onClick={() => setShowModal(true)} style={{ gap: 8 }}>
                <GenerateIcon />
                Generate Your First Invoice
              </button>
            </div>
          ) : (
            // Invoices table
            <table className="crm-table">
              <thead>
                <tr>
                  {["Invoice No", "Customer", "Services", "Amount", "Status", "Date"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv._id}>
                    {/* Invoice number in accent colour */}
                    <td>
                      <span style={{
                        fontSize: 13, color: "var(--clr-primary-light)",
                        fontWeight: 800, fontFamily: "monospace", letterSpacing: "0.02em",
                      }}>
                        {inv.invoiceNumber}
                      </span>
                    </td>
                    {/* Customer name */}
                    <td style={{ fontSize: 14, fontWeight: 700, color: "var(--clr-text)", fontFamily: "var(--font-body)" }}>
                      {inv.customerName}
                    </td>
                    {/* Services */}
                    <td style={{ fontSize: 13, color: "var(--clr-text-sub)", fontWeight: 500, fontFamily: "var(--font-body)" }}>
                      {inv.services}
                    </td>
                    {/* Amount in green */}
                    <td>
                      <span style={{ fontSize: 13, color: "#10D998", fontWeight: 800, fontFamily: "var(--font-body)" }}>
                        PKR {Number(inv.totalAmount).toLocaleString()}
                      </span>
                    </td>
                    {/* Status badge */}
                    <td>
                      <span style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "3px 12px", borderRadius: 999,
                        fontSize: 11.5, fontWeight: 700, fontFamily: "var(--font-body)",
                        ...(statusStyle[inv.status] || statusStyle.Inactive),
                      }}>
                        {inv.status}
                      </span>
                    </td>
                    {/* Date */}
                    <td style={{ fontSize: 13, color: "var(--clr-text-muted)", fontWeight: 500, fontFamily: "var(--font-body)" }}>
                      {inv.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Row count footer */}
        {invoices.length > 0 && (
          <div style={{
            marginTop: 12, fontSize: 12, color: "var(--clr-text-muted)",
            textAlign: "right", fontWeight: 500, fontFamily: "var(--font-body)",
          }}>
            {invoices.length} invoice{invoices.length !== 1 ? "s" : ""} total
          </div>
        )}
      </main>

      {/* ── Generate Invoice Modal ────────────────────────────
          Rendered here so it sits above the full page layout.
          Opened by the button above OR by ?generate=true from the chatbot. */}
      {showModal && (
        <GenerateInvoiceModal
          customers={customers}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
"use client";
import Link from "next/link";

// ── Reusable CustomerTable component ─────────────────────────────
// Props:
//   customers    = array of customer objects to display
//   onDelete     = function called with customer._id when Delete is clicked
//   search       = current search text (for contextual empty state message)
//   statusFilter = current filter value (for contextual empty state message)

export default function CustomerTable({ customers, onDelete, search, statusFilter }) {

  // Map status string to CSS class for the badge
  const statusBadge = {
    Lead:     "status-lead",
    Active:   "status-active",
    Inactive: "status-inactive",
  };

  // ── Empty state — shown when no customers match current search/filter ──
  if (customers.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "var(--font-body)" }}>
        <div style={{ fontSize: 42, marginBottom: 14, opacity: 0.45 }}>👥</div>
        <div style={{ fontSize: 16, color: "var(--clr-text-sub)", fontWeight: 700, marginBottom: 6, letterSpacing: "-0.02em", fontFamily: "var(--font-display)" }}>
          {search || statusFilter !== "All" ? "No results found" : "No customers yet"}
        </div>
        <div style={{ fontSize: 13, color: "var(--clr-text-muted)", marginBottom: 22, fontWeight: 500, fontFamily: "var(--font-body)" }}>
          {search || statusFilter !== "All"
            ? "Try adjusting your search or filter."
            : "Start building your customer base."}
        </div>
        {/* Show Add Customer button only when there's no active search/filter */}
        {!search && statusFilter === "All" && (
          <Link href="/dashboard/add-customer">
            <button className="btn-primary">+ Add Your First Customer</button>
          </Link>
        )}
      </div>
    );
  }

  // ── Main table — rendered when customers exist ──────────────────
  return (
    <table className="crm-table">
      <thead>
        <tr>
          {["Name", "Email", "Phone", "Company", "Status", "Actions"].map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Each row shows customer data with Edit, Invoice, and Delete actions */}
        {customers.map((c) => (
          <tr key={c._id}>
            {/* Customer name — prominent */}
            <td style={{ fontSize: 14, fontWeight: 700, color: "var(--clr-text)", fontFamily: "var(--font-body)" }}>{c.name}</td>
            {/* Contact details */}
            <td style={{ fontSize: 13, color: "var(--clr-text-sub)", fontWeight: 500, fontFamily: "var(--font-body)" }}>{c.email}</td>
            <td style={{ fontSize: 13, color: "var(--clr-text-sub)", fontWeight: 500, fontFamily: "var(--font-body)" }}>{c.phone}</td>
            <td style={{ fontSize: 13, color: "var(--clr-text-sub)", fontWeight: 500, fontFamily: "var(--font-body)" }}>{c.company || "—"}</td>
            {/* Status badge */}
            <td>
              <span className={`badge ${statusBadge[c.status]}`}>{c.status}</span>
            </td>
            {/* Action buttons */}
            <td>
              <div style={{ display: "flex", gap: 7 }}>
                {/* Edit — navigates to edit form pre-filled with customer data */}
                <Link href={`/dashboard/edit-customer/${c._id}`}>
                  <button style={{
                    background: "rgba(108,99,255,0.1)", color: "var(--clr-primary-light)",
                    border: "1px solid rgba(108,99,255,0.25)", padding: "5px 13px",
                    borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700,
                    transition: "all 0.15s", fontFamily: "var(--font-body)",
                  }}>Edit</button>
                </Link>
                {/* Invoice — navigates to invoice preview for this customer */}
                <Link href={`/dashboard/invoice/${c._id}`}>
                  <button style={{
                    background: "rgba(16,217,152,0.08)", color: "#10D998",
                    border: "1px solid rgba(16,217,152,0.22)", padding: "5px 13px",
                    borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700,
                    transition: "all 0.15s", fontFamily: "var(--font-body)",
                  }}>Invoice</button>
                </Link>
                {/* Delete — calls onDelete prop which sends DELETE request to backend */}
                <button
                  className="btn-danger"
                  style={{ padding: "5px 13px", fontSize: 12 }}
                  onClick={() => onDelete(c._id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
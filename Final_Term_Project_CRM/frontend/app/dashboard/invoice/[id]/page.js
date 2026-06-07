"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import API from "@/utils/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function InvoicePage() {
  const { user, loading } = useAuth();
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load invoice data when page opens (fetches customer + generated invoice details)
  useEffect(() => {
    if (user && id) {
      API.get(`/invoices/${id}`) // Get invoice details from backend using customer ID from URL
        .then(({ data }) => setInvoice(data))
        .catch(() => toast.error("Could not load invoice"))
        .finally(() => setFetching(false));
    }
  }, [user, id]);

  // Save invoice to database when "Save to Database" button is clicked
  const saveToDatabase = async () => {
    if (!invoice) return;
    setSaving(true);
    try {
      await API.post("/invoices/save", {
        invoiceNumber:   invoice.invoiceNumber,
        customerId:      id,
        customerName:    invoice.customer.name,
        customerEmail:   invoice.customer.email,
        customerPhone:   invoice.customer.phone,
        customerCompany: invoice.customer.company,
        customerAddress: invoice.customer.address,
        services:        invoice.services,
        totalAmount:     invoice.totalAmount,
        status:          invoice.status,
        date:            invoice.date,
      });
      toast.success("Invoice saved to database!");
      setSaved(true); // Disable button and show saved state
    } catch (err) {
      toast.error(err.response?.data?.message || "Already saved or failed");
    } finally {
      setSaving(false);
    }
  };

  // PDF DOWNLOAD using jsPDF — generates a styled PDF document
  const downloadPDF = () => {
    if (typeof window === "undefined") return;
    import("jspdf").then(({ default: jsPDF }) => {
      const doc = new jsPDF(); // create blank PDF document
      const pageW = doc.internal.pageSize.getWidth();

      // Dark background
      doc.setFillColor(8, 9, 26);
      doc.rect(0, 0, pageW, 297, "F");

      // Header bar with brand color
      doc.setFillColor(108, 99, 255);
      doc.rect(0, 0, pageW, 45, "F");
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("Orbit-CRM", 20, 22);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(200, 196, 255);
      doc.text("Customer Invoice", 20, 34);
      // Invoice number and date on the right side of header
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(invoice.invoiceNumber, pageW - 20, 22, { align: "right" });
      doc.setTextColor(200, 196, 255);
      doc.text(`Date: ${invoice.date}`, pageW - 20, 32, { align: "right" });

      // Bill To section
      doc.setTextColor(107, 113, 153);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("BILL TO", 20, 62);
      doc.setTextColor(238, 240, 255);
      doc.setFontSize(13);
      doc.text(invoice.customer.name, 20, 72);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(157, 165, 214);
      doc.text(invoice.customer.email, 20, 80);
      doc.text(invoice.customer.phone, 20, 88);
      if (invoice.customer.company) doc.text(invoice.customer.company, 20, 96);
      if (invoice.customer.address) doc.text(invoice.customer.address, 20, 104);

      // Services section card
      doc.setFillColor(18, 20, 52);
      doc.roundedRect(15, 118, pageW - 30, 40, 3, 3, "F");
      doc.setFontSize(9);
      doc.setTextColor(107, 113, 153);
      doc.setFont("helvetica", "bold");
      doc.text("SERVICES", 25, 131);
      doc.text("STATUS", pageW / 2, 131);
      doc.text("AMOUNT", pageW - 30, 131, { align: "right" });
      doc.setTextColor(238, 240, 255);
      doc.setFontSize(11);
      doc.text(invoice.services || "General Services", 25, 145);
      doc.text(invoice.status, pageW / 2, 145);
      doc.setFont("helvetica", "bold");
      doc.text(`PKR ${Number(invoice.totalAmount).toLocaleString()}`, pageW - 30, 145, { align: "right" });

      // Total amount bar
      doc.setFillColor(108, 99, 255);
      doc.roundedRect(15, 175, pageW - 30, 28, 3, 3, "F");
      doc.setFontSize(10);
      doc.setTextColor(200, 196, 255);
      doc.setFont("helvetica", "normal");
      doc.text("TOTAL AMOUNT DUE", 25, 189);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(`PKR ${Number(invoice.totalAmount).toLocaleString()}`, pageW - 30, 189, { align: "right" });

      // Footer
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(107, 113, 153);
      doc.text("Generated by Orbit-CRM  •  Manage Better, Connect Stronger.", pageW / 2, 272, { align: "center" });

      // Save the PDF with invoice number in filename
      doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
      toast.success("PDF downloaded!");
    });
  };

  if (loading || !user) return null;

  // Status badge styles
  const statusBadgeStyle = {
    Active:   { background: "rgba(16,217,152,0.12)",  color: "#10D998", border: "1px solid rgba(16,217,152,0.26)" },
    Lead:     { background: "rgba(34,211,238,0.1)",   color: "#22D3EE", border: "1px solid rgba(34,211,238,0.22)" },
    Inactive: { background: "rgba(240,85,85,0.1)",    color: "#F05555", border: "1px solid rgba(240,85,85,0.22)" },
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "28px 32px", background: "var(--clr-bg-main)", minWidth: 0 }}>

        {/* ── Page Header ──────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link href="/dashboard/customers" className="back-link">← Back</Link>
            <div style={{ width: 1, height: 20, background: "var(--clr-border)" }} />
            <div>
              <h1 className="page-title" style={{
                fontSize: 30,
                fontWeight: 800,
                color: "var(--clr-text)",
                letterSpacing: "-0.03em"
              }}>Invoice</h1>
              <p className="page-subtitle" style={{ fontSize: 14 }}>
                Preview and export customer invoice
              </p>
            </div>
          </div>

          {/* Action buttons — shown only when invoice data is loaded */}
          {invoice && (
            <div style={{ display: "flex", gap: 10 }}>
              {/* Save to Database button */}
              <button
                onClick={saveToDatabase}
                disabled={saving || saved}
                style={{
                  background: saved ? "rgba(16,217,152,0.12)" : "rgba(16,217,152,0.08)",
                  color: "#10D998",
                  border: "1px solid rgba(16,217,152,0.25)",
                  padding: "10px 20px",
                  borderRadius: 12,
                  cursor: saved ? "default" : "pointer",
                  fontWeight: 700,
                  fontSize: 13,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  opacity: saved ? 0.8 : 1,
                }}
              >
                {saved ? "✓ Saved to Database" : saving ? "Saving..." : "Save to Database"}
              </button>
              {/* Download PDF button */}
              <button className="btn-primary" onClick={downloadPDF} style={{ gap: 7 }}>
                ↓ Download PDF
              </button>
            </div>
          )}
        </div>

        {/* ── Invoice content ───────────────────────────── */}
        {fetching ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "80px 20px" }}>
            <div className="spinner" />
          </div>
        ) : invoice ? (
          <div className="glass-card" style={{ padding: "36px 48px" }}>

            {/* Invoice header band with brand gradient */}
            <div style={{
              background: "linear-gradient(135deg, var(--clr-primary-dark), var(--clr-primary), var(--clr-primary-light))",
              borderRadius: 14,
              padding: "24px 28px",
              marginBottom: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  {/* Logo in invoice header */}
                  <svg width="30" height="30" viewBox="0 0 48 48" fill="none" style={{ filter: "drop-shadow(0 2px 8px rgba(255,255,255,0.2))" }}>
                    <defs>
                      <linearGradient id="gInvHdr" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
                        <stop offset="100%" stopColor="rgba(200,196,255,0.85)"/>
                      </linearGradient>
                    </defs>
                    <ellipse cx="24" cy="24" rx="19" ry="10" stroke="url(#gInvHdr)" strokeWidth="2.5" fill="none" transform="rotate(-35 24 24)"/>
                    <circle cx="24" cy="24" r="5" fill="url(#gInvHdr)"/>
                    <circle cx="39" cy="17" r="3.5" fill="rgba(200,240,255,0.9)"/>
                  </svg>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                    Orbit-CRM
                  </div>
                </div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2, fontWeight: 500 }}>
                  Customer Invoice
                </div>
              </div>
              {/* Invoice number and date */}
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "black", fontWeight: 800, fontSize: 13, letterSpacing: "0.01em" }}>
                  {invoice.invoiceNumber}
                </div>
                <div style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: 12, marginTop: 4, fontWeight: 800 }}>
                  {invoice.date}
                </div>
              </div>
            </div>

            {/* Bill To section */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 10, color: "var(--clr-text-muted)", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 12, textTransform: "uppercase" }}>
                Bill To
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "var(--clr-text)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                {invoice.customer.name}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 13, color: "var(--clr-text-sub)", fontWeight: 500 }}>{invoice.customer.email}</div>
                <div style={{ fontSize: 13, color: "var(--clr-text-sub)", fontWeight: 500 }}>{invoice.customer.phone}</div>
                {invoice.customer.company && <div style={{ fontSize: 13, color: "var(--clr-text-sub)", fontWeight: 500 }}>{invoice.customer.company}</div>}
                {invoice.customer.address && <div style={{ fontSize: 13, color: "var(--clr-text-sub)", fontWeight: 500 }}>{invoice.customer.address}</div>}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--clr-border)", marginBottom: 24 }} />

            {/* ── Services table — updated to match theme ── */}
            <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 20, border: "1px solid var(--clr-border)" }}>

              {/* Table header row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 160px",
                padding: "12px 20px",
                borderBottom: "1px solid var(--clr-border)",
                background: "rgba(255,255,255,0.02)",
              }}>
                {["Services", "Status", "Amount"].map((h, i) => (
                  <div key={h} style={{
                    fontSize: 10,
                    color: "var(--clr-text-muted)",
                    fontWeight: 700,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    textAlign: i === 1 ? "center" : i === 2 ? "right" : "left",
                  }}>
                    {h}
                  </div>
                ))}
              </div>

              {/* Table data row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 160px",
                padding: "18px 20px",
                alignItems: "center",
                background: "rgba(255,255,255,0.01)",
              }}>
                {/* Service name */}
                <div style={{ fontSize: 14, color: "var(--clr-text)", fontWeight: 600 }}>
                  {invoice.services || "General Services"}
                </div>

                {/* Status badge — centered */}
                <div style={{ textAlign: "center" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11.5,
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                    ...(statusBadgeStyle[invoice.status] || statusBadgeStyle.Inactive),
                  }}>
                    {/* Dot indicator */}
                    <span style={{
                      width: 5, height: 5,
                      borderRadius: "50%",
                      background: "currentColor",
                      display: "inline-block",
                    }} />
                    {invoice.status}
                  </span>
                </div>

                {/* Amount — right aligned */}
                <div style={{
                  fontSize: 15,
                  color: "var(--clr-text)",
                  fontWeight: 800,
                  textAlign: "right",
                  letterSpacing: "-0.02em",
                }}>
                  PKR {Number(invoice.totalAmount).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Total amount bar */}
            <div style={{
              background: "linear-gradient(135deg, var(--clr-primary-dark), var(--clr-primary))",
              borderRadius: 12,
              padding: "18px 22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div style={{ color: "rgba(255,255,255,0.75)", fontWeight: 700, fontSize: 13 }}>Total Amount Due</div>
              <div style={{ color: "white", fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em" }}>
                PKR {Number(invoice.totalAmount).toLocaleString()}
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", marginTop: 22, fontSize: 11, color: "var(--clr-text-muted)", fontWeight: 500 }}>
              Generated by Orbit-CRM · Manage Better. Connect Stronger.
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--clr-text-muted)" }}>
            Invoice not found.
          </div>
        )}
      </main>
    </div>
  );
}
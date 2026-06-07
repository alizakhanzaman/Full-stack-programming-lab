"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/utils/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function EditCustomerPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    address: "", status: "Lead", services: "", totalAmount: ""
  });
  const [saving, setSaving] = useState(false);

  // Load existing customer data when page opens (pre-fills the form)
  useEffect(() => {
    if (user && id) {
      API.get(`/customers/${id}`)
        .then(({ data }) => {
          setForm({
            name:        data.name,
            email:       data.email,
            phone:       data.phone,
            company:     data.company     || "",
            address:     data.address     || "",
            status:      data.status,
            services:    data.services    || "",
            totalAmount: data.totalAmount || "",
          });
        })
        .catch(() => toast.error("Could not load customer"));
    }
  }, [user, id]);

  // Save updated customer data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // PUT request: UPDATE customer in database
      await API.put(`/customers/${id}`, { ...form, totalAmount: Number(form.totalAmount) || 0 });
      toast.success("Customer updated!");
      router.push("/dashboard/customers");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // Form field configuration
  const fields = [
    { key: "name",        label: "Full Name",          required: true,  type: "text",   placeholder: "John Doe",              span: 1 },
    { key: "email",       label: "Email Address",      required: true,  type: "email",  placeholder: "john@company.com",      span: 1 },
    { key: "phone",       label: "Phone Number",       required: true,  type: "text",   placeholder: "+92 300 0000000",       span: 1 },
    { key: "company",     label: "Company",            required: false, type: "text",   placeholder: "Acme Corp",             span: 1 },
    { key: "address",     label: "Address",            required: false, type: "text",   placeholder: "123 Street, City",      span: 2 },
    { key: "services",    label: "Services",           required: false, type: "text",   placeholder: "Web Development, SEO",  span: 2 },
    { key: "totalAmount", label: "Total Amount (PKR)", required: false, type: "number", placeholder: "50000",                 span: 1 },
  ];

  return (
    <ProtectedRoute>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "28px 32px", background: "var(--clr-bg-main)", minWidth: 0 }}>

          {/* ── Header ─────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <Link href="/dashboard/customers" className="back-link">
              ← Back
            </Link>
            <div style={{ width: 1, height: 20, background: "var(--clr-border)" }} />
            <div>
              <h1 className="page-title" style={{
              fontSize: 24,
              fontWeight: 800,
              color: "var(--clr-text)",
              letterSpacing: "-0.03em"
            }}>Edit Customer</h1>
              <p className="page-subtitle" style={{ fontSize: 14 }}>
                Update the customer&apos;s details
              </p>
            </div>
          </div>

          {/* ── Form card ──────────────────────────────── */}
          <div className="glass-card" style={{ padding: "32px 36px" }}>
            <div style={{ fontSize: 11, color: "var(--clr-text-muted)", fontWeight: 700, letterSpacing: "0.09em", marginBottom: 22, paddingBottom: 14, borderBottom: "1px solid var(--clr-border)", textTransform: "uppercase" }}>
              Customer Information
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {fields.map(({ key, label, required, type, placeholder, span }) => (
                <div key={key} style={{ gridColumn: span === 2 ? "span 2" : "span 1" }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--clr-primary-light)", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {label}{required && <span style={{ color: "var(--clr-accent-red)", marginLeft: 3 }}>*</span>}
                  </label>
                  <input
                    className="input-field"
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required={required}
                  />
                </div>
              ))}

              {/* Status dropdown */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--clr-primary-light)", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Status
                </label>
                <select
                  className="input-field"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Form actions */}
              <div style={{ gridColumn: "span 2", marginTop: 8, display: "flex", gap: 12 }}>
                <button className="btn-primary" type="submit" disabled={saving} style={{ padding: "12px 32px", fontSize: 15, fontWeight: 800 }}>
                  {saving ? "Updating..." : "Update Customer"}
                </button>
                <Link href="/dashboard/customers">
                  <button type="button" className="btn-secondary" style={{ padding: "12px 24px" }}>
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

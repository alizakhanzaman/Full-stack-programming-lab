"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";
import CustomerTable from "@/components/CustomerTable";
import API from "@/utils/api";
import toast from "react-hot-toast";
import Link from "next/link";

// ── Icon components ───────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const AddIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

// Filter options for the pill buttons
const FILTER_OPTIONS = ["All", "Lead", "Active", "Inactive"];

export default function CustomersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");        // tracks search text
  const [statusFilter, setStatusFilter] = useState("All"); // tracks active filter pill
  const [fetching, setFetching] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  // READ — fetch all customers with optional search/filter query params
  const fetchCustomers = useCallback(async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter !== "All") params.status = statusFilter;

      // Sends: GET /api/customers?search=ali&status=Active
      const { data } = await API.get("/customers", { params });
      setCustomers(data); // React re-renders the table automatically
    } catch {
      toast.error("Failed to load customers");
    } finally {
      setFetching(false);
    }
  }, [search, statusFilter]);

  // Re-fetch whenever search text or status filter changes (real-time results)
  useEffect(() => {
    if (user) fetchCustomers();
  }, [user, fetchCustomers]);

  // DELETE — remove a customer by ID
  const deleteCustomer = async (id) => {
    if (!confirm("Delete this customer?")) return;
    try {
      await API.delete(`/customers/${id}`);
      toast.success("Customer deleted");
      fetchCustomers(); // Refresh the table after deletion
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading || !user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto", background: "var(--clr-bg-main)", minWidth: 0 }}>

        {/* ── Page Header ──────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 className="page-title" style={{
              fontSize: 35,
              fontWeight: 800,
              color: "var(--clr-text)",
              letterSpacing: "-0.03em"
            }}>
              Customers
            </h1>
            <p className="page-subtitle" style={{ fontSize: 15 }}>
              Manage and track your entire customer base
            </p>
          </div>
          {/* Add Customer button */}
          <Link href="/dashboard/add-customer">
            <button className="btn-primary" style={{ gap: 8 }}>
              <AddIcon />
              Add Customer
            </button>
          </Link>
        </div>

        {/* ── Search + Filter toolbar ──────────────────── */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>

          {/* Search input with icon */}
          <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
            <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--clr-text-muted)", pointerEvents: "none", display: "flex" }}>
              <SearchIcon />
            </span>
            {/* Search input — every keystroke triggers fetchCustomers() via useEffect */}
            <input
              className="input-field"
              style={{ paddingLeft: 40 }}
              placeholder="Search customers by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Rounded pill filter buttons: All / Lead / Active / Inactive */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                className={`btn-filter ${statusFilter === option ? "active" : ""}`}
                onClick={() => setStatusFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* ── Customer Table ───────────────────────────── */}
        <div className="glass-card" style={{ overflow: "hidden" }}>
          {fetching ? (
            // Loading spinner
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 20px" }}>
              <div className="spinner" />
            </div>
          ) : (
            // CustomerTable is a reusable component:
            // customers = list to display
            // onDelete = delete handler from this page
            // search / statusFilter = passed for contextual empty state messages
            <CustomerTable
              customers={customers}
              onDelete={deleteCustomer}
              search={search}
              statusFilter={statusFilter}
            />
          )}
        </div>

        {/* ── Table footer: row count ──────────────────── */}
        {customers.length > 0 && (
          <div style={{ marginTop: 12, fontSize: 12, color: "var(--clr-text-muted)", textAlign: "right", fontWeight: 500 }}>
            Showing {customers.length} customer{customers.length !== 1 ? "s" : ""}
          </div>
        )}
      </main>

      {/* AI Chatbot */}
      <Chatbot customers={customers} />
    </div>
  );
}

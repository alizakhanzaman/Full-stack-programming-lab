"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Reusable component — wraps any page that requires login
// If user is NOT logged in → redirects to /login automatically
// If user IS logged in → shows the page content (children)
// Used in: dashboard, add-customer, edit-customer, invoice, saved-invoices

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Watch user and loading state
  // If done loading and no user found → redirect to login
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  // Show nothing while checking login status
  if (loading || !user) return null;

  // User is logged in → render the actual page content
  return children;
}
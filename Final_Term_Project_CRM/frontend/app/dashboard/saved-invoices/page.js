"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirects old /saved-invoices path to the new /invoices path
export default function SavedInvoicesRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/invoices");
  }, []);
  return null;
}

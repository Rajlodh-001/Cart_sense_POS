"use client";

import React, { useEffect } from "react";
import { ErrorDisplay } from "@/components/shared/ErrorDisplay";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Dashboard Error:", error);
  }, [error]);

  const getPageContext = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (path.includes('/admin/users')) return { title: "Staff Directory Failure", desc: "The identity matrix for your staff records encountered an anomaly." };
    if (path.includes('/admin/inventory')) return { title: "Inventory Matrix Interrupted", desc: "The catalog system failed to synchronize your product data." };
    if (path.includes('/admin/tables')) return { title: "Seating Infrastructure Error", desc: "The physical layout engine could not render the floor plan." };
    if (path.includes('/admin/settings')) return { title: "Configuration Engine Failure", desc: "The global system preferences encountered a state error." };
    return { title: "System Interruption", desc: "The administrative matrix encountered an unexpected state." };
  };

  const context = getPageContext();

  return (
    <ErrorDisplay
      title={context.title}
      description={context.desc}
      error={error}
      reset={reset}
      homeLink="/admin"
      homeLabel="Go Back to Admin Dashboard"
    />
  );
}

"use client";

import React, { useEffect } from "react";
import { ErrorDisplay } from "@/components/shared/ErrorDisplay";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard/POS Error:", error);
  }, [error]);

  const getPageContext = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (path.includes('/pos')) return { title: "POS Terminal Interrupted", desc: "We've encountered a temporary synchronization issue with the sales terminal." };
    if (path.includes('/activity')) return { title: "Activity Feed Suspended", desc: "The real-time transaction stream encountered a buffer overflow." };
    if (path.includes('/form')) return { title: "Data Entry Failure", desc: "The submission gateway is temporarily unresponsive." };
    return { title: "Dashboard Sync Failure", desc: "We've encountered a temporary synchronization issue. Your data is safe." };
  };

  const context = getPageContext();

  return (
    <ErrorDisplay
      title={context.title}
      description={context.desc}
      error={error}
      reset={reset}
      homeLink="/pos"
      homeLabel="Return to POS Home"
    />
  );
}

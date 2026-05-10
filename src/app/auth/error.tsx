"use client";
import React, { useEffect } from "react";
import { ErrorDisplay } from "@/components/shared/ErrorDisplay";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Authentication Layer Error:", error);
  }, [error]);

  return (
    <ErrorDisplay
      title="Authentication Failure"
      description="The secure access gateway encountered an anomaly during verification."
      error={error}
      reset={reset}
      homeLink="/auth/login"
      homeLabel="Return to Login"
    />
  );
}

"use client";

import React from "react";

interface AdminPageLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
  spacing?: "normal" | "large";
}

export default function AdminPageLayout({
  children,
  sidebar,
  className = "",
  spacing = "normal",
}: AdminPageLayoutProps) {
  const spacingClass = spacing === "large" ? "space-y-12" : "space-y-8";
  
  // Base classes for the scrollable content container
  const contentClasses = `flex-1 overflow-auto p-6 md:p-10 custom-scrollbar ${spacingClass} animate-in fade-in slide-in-from-bottom-4 duration-700 ${className}`;

  if (sidebar) {
    return (
      <div className="flex h-full w-full overflow-hidden">
        {sidebar}
        <div className={contentClasses}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full overflow-auto p-6 md:p-10 custom-scrollbar ${spacingClass} animate-in fade-in slide-in-from-bottom-4 duration-700 ${className}`}>
      {children}
    </div>
  );
}

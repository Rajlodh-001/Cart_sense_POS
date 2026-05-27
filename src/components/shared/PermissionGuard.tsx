"use client";

import React from "react";
import { usePermissions } from "@/hooks/usePermissions";

interface PermissionGuardProps {
  resource: string;
  action: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  mode?: "hide" | "disable";
}

/**
 * A declarative wrapper component to guard UI elements.
 * 
 * Usage:
 * <PermissionGuard resource="products" action="write" fallback={<p>No Access</p>}>
 *   <button>Add Product</button>
 * </PermissionGuard>
 * 
 * Or disable instead of hiding:
 * <PermissionGuard resource="orders" action="delete" mode="disable">
 *   <button className="btn">Delete Order</button>
 * </PermissionGuard>
 */
export function PermissionGuard({
  resource,
  action,
  children,
  fallback = null,
  mode = "hide",
}: PermissionGuardProps) {
  const { hasPermission } = usePermissions();
  const allowed = hasPermission(resource, action);

  if (allowed) {
    return <>{children}</>;
  }

  if (mode === "disable") {
    // Clone children to inject `disabled` and styling attributes
    if (React.isValidElement(children)) {
      const element = children as React.ReactElement<{ style?: React.CSSProperties; disabled?: boolean }>;
      return React.cloneElement(element, {
        disabled: true,
        style: {
          ...(element.props.style || {}),
          opacity: 0.5,
          cursor: "not-allowed",
          pointerEvents: "none",
        },
      });
    }
  }

  // Default mode: "hide" (renders the fallback element)
  return <>{fallback}</>;
}

export default PermissionGuard;

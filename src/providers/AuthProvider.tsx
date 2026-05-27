"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@/hooks/useAuth";
import { setUser, clearUser } from "@/store/userSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isSuccess, isError } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && user) {
      console.log("[AuthProvider] Syncing user to Redux:", user.name, "(ID:", user.id, ")");
      
      // Temporary: Auto-fetch first device for location to bind to session
      import("@/lib/axios").then((module) => {
        module.default.get("/devices").then((res) => {
          const deviceId = res.data[0]?.id || null;
          dispatch(
            setUser({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role as unknown as Record<string, unknown>,
              permissions: user.role?.permissions?.map(p => `${p.resource}:${p.action}`) || [],
              avatar: (user as any).image || (user as any).avatar || null,
              deviceId: deviceId,
              tenantDetail: user.tenantDetail || null,
            }),
          );
        }).catch(err => {
          console.error("Failed to fetch devices for session bind", err);
        });
      });
    } else if (isError) {
      console.warn("[AuthProvider] Session fetch failed or unauthorized.");
      dispatch(clearUser());
    }
  }, [user, isSuccess, isError, dispatch]);

  return <>{children}</>;
}

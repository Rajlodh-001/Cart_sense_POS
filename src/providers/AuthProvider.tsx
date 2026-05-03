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
      dispatch(
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: (user as any).image || (user as any).avatar || null,
        }),
      );
    } else if (isError) {
      console.warn("[AuthProvider] Session fetch failed or unauthorized.");
      dispatch(clearUser());
    }
  }, [user, isSuccess, isError, dispatch]);

  return <>{children}</>;
}

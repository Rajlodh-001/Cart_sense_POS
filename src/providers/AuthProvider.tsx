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
      dispatch(
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: null, // the backend doesn't seem to return an avatar currently, but we have the slot for it
        }),
      );
    } else if (isError) {
      dispatch(clearUser());
    }
  }, [user, isSuccess, isError, dispatch]);

  return <>{children}</>;
}

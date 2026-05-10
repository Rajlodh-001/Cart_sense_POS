import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

// --- Types ---
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
  locationId?: string;
  organizationId?: string;
}

interface MeResponse {
  user: User;
}

interface SessionStatus {
  isActivated: boolean;
  locationId: string | null;
  locationName: string | null;
  organizationId: string | null;
  isLoggedIn: boolean;
  user: User | null;
}

// --- Hooks ---

/**
 * Checks the current session/terminal status (Tier 1 & Tier 2)
 */
export function useSessionStatus() {
  return useQuery({
    queryKey: ["sessionStatus"],
    queryFn: async () => {
      // If no token exists, we don't even try to fetch status
      if (typeof window !== "undefined" && !localStorage.getItem("pos_token")) {
        return {
          isActivated: false,
          locationId: null,
          locationName: null,
          organizationId: null,
          isLoggedIn: false,
          user: null,
        } as SessionStatus;
      }
      const response = await axiosInstance.get<SessionStatus>("/auth/status");
      return response.data;
    },
    retry: false,
    staleTime: 1000 * 60, // 1 min cache
  });
}

/**
 * Fetches the currently authenticated user session.
 */
export function useUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get<MeResponse>("/auth/me");
      return response.data.user;
    },
    retry: false,
    enabled: typeof window !== "undefined" && !!localStorage.getItem("pos_token"),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Tier 1: Store Activation mutation
 */
export function useActivateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      organization: string;
      locationId: string;
      password?: string;
    }) => {
      const response = await axiosInstance.post<AuthResponse>("/auth/activate-store", params);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem("pos_token", data.accessToken);
      }
      // Refresh status to transition the UI to User Login
      queryClient.invalidateQueries({ queryKey: ["sessionStatus"] });
    },
  });
}

/**
 * Login mutation handling
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const nextPath = searchParams?.get('next') || "/pos";

  return useMutation({
    mutationFn: async (credentials: { 
      locationId: string;
      email?: string; 
      password?: string;
      pin?: string;
    }) => {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        credentials,
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem("pos_token", data.accessToken);
      }
      queryClient.setQueryData(["authUser"], data.user);
      queryClient.invalidateQueries({ queryKey: ["sessionStatus"] });
      router.push(nextPath);
    },
  });
}

/**
 * Logout mutation handling
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      // For JWT, we might not even need a backend logout if we just clear the token,
      // but keeping it for server-side logging/invalidation if implemented.
      await axiosInstance.post("/auth/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("pos_token");
      queryClient.clear();
      router.push("/auth/login");
    },
    onError: () => {
      localStorage.removeItem("pos_token");
      queryClient.clear();
      router.push("/auth/login");
    },
  });
}

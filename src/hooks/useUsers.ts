import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export type Role = "CASHIER" | "MANAGER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string;
  pin: string;
  role?: Role;
  locationId: string; // The backend DTO currently requires this
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user");
      return response.data as User[];
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserPayload) => {
      const response = await axiosInstance.post("/user", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

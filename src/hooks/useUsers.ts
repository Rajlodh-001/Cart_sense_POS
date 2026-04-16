import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'CASHIER' | 'KITCHEN';
  isActive: boolean;
  image?: string;
  lastLogin?: string;
}

interface UsersResponse {
  data: User[];
  meta: {
    total: number;
    filteredTotal: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const useUsers = (params?: { search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const res = await axiosInstance.get<UsersResponse>("/user", { params });
      return res.data;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<User> & { password?: string }) => {
      const res = await axiosInstance.post("/user/create-data", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<User> & { password?: string } }) => {
      const res = await axiosInstance.patch(`/user/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/user/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'MANAGE';
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  roleId?: string;
  roleData?: {
    id: string;
    name: string;
  };
  isActive: boolean;
  image?: string;
  lastLogin?: string;
  phone?: string;
  address?: string;
  pin?: string;
  preferences?: any;
  accessibleLocationIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleData {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  permissions?: Permission[];
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

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await axiosInstance.get<RoleData[]>("/roles");
      return res.data;
    },
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<RoleData> & { permissionIds?: string[] }) => {
      const res = await axiosInstance.post("/roles", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<RoleData> & { permissionIds?: string[] } }) => {
      const res = await axiosInstance.patch(`/roles/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/roles/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const usePermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const res = await axiosInstance.get<Permission[]>("/roles/permissions");
      return res.data;
    },
  });
};

export const useAllLocations = () => {
  return useQuery({
    queryKey: ["all-locations"],
    queryFn: async () => {
      const res = await axiosInstance.get<any[]>("/location/list");
      return res.data;
    },
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  category: string;
  description?: string;
  primaryColor?: string;
  secondaryColor?: string;
  iconName?: string;
  imageUrl?: string;
  groupBy?: string;
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
    primaryColor?: string;
    secondaryColor?: string;
    iconName?: string;
    groupBy?: string;
  };
  isActive: boolean;
  image?: string;
  lastLogin?: string;
  phone?: string;
  address?: string;
  pin?: string;
  preferences?: any;
  accessibleLocationIds?: string[];
  icon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  iconName?: string;
  imageUrl?: string;
  groupBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleData {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  permissions?: Permission[];
  primaryColor?: string;
  secondaryColor?: string;
  iconName?: string;
  imageUrl?: string;
  groupBy?: string;
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

export const useUserGroups = () => {
  return useQuery({
    queryKey: ["user-groups"],
    queryFn: async () => {
      const res = await axiosInstance.get<string[]>("/user/groups");
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

export const useRoles = (search?: string) => {
  return useQuery({
    queryKey: ["roles", search],
    queryFn: async () => {
      const res = await axiosInstance.get<{ data: RoleData[] }>("/roles", { params: { search } });
      return res.data.data;
    },
  });
};

export const useRoleGroups = () => {
  return useQuery({
    queryKey: ["role-groups"],
    queryFn: async () => {
      const res = await axiosInstance.get<string[]>("/roles/groups");
      return res.data;
    },
  });
};

export const usePermissionGroups = () => {
  return useQuery({
    queryKey: ["permission-groups"],
    queryFn: async () => {
      const res = await axiosInstance.get<string[]>("/roles/permissions/groups");
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

export const usePermissions = (search?: string) => {
  return useQuery({
    queryKey: ["permissions", search],
    queryFn: async () => {
      const res = await axiosInstance.get<{ data: Permission[] }>("/roles/permissions", { params: { search } });
      return res.data.data;
    },
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Permission>) => {
      const res = await axiosInstance.post("/roles/permissions", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/roles/permissions/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Permission> }) => {
      const res = await axiosInstance.patch(`/roles/permissions/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
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

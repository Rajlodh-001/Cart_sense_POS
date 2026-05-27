import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface OrganizationSettings {
  id: string;
  name: string;
  currency: string;
  region: string;
  taxType: 'INCLUSIVE' | 'EXCLUSIVE';
  preferences?: any;
}

export interface LocationSettings {
  id: string;
  name: string;
  address: string;
  taxRate: number;
  preferences?: any;
}

export const useOrganizationSettings = () => {
  return useQuery({
    queryKey: ["settings", "organization"],
    queryFn: async () => {
      const res = await axiosInstance.get<OrganizationSettings>("/organization/me");
      return res.data;
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<OrganizationSettings>) => {
      const res = await axiosInstance.patch("/organization/me", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings", "organization"] });
    },
  });
};

export const useLocationSettings = () => {
  return useQuery({
    queryKey: ["settings", "location"],
    queryFn: async () => {
      const res = await axiosInstance.get<LocationSettings>("/location/me");
      return res.data;
    },
  });
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<LocationSettings>) => {
      const res = await axiosInstance.patch("/location/me", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings", "location"] });
    },
  });
};

export const useAllLocations = () => {
  return useQuery({
    queryKey: ["locations", "all"],
    queryFn: async () => {
      const res = await axiosInstance.get<LocationSettings[]>("/location/list");
      return res.data;
    },
  });
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; locationSkuId: string; address?: string; phone?: string; email?: string }) => {
      const res = await axiosInstance.post("/location", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations", "all"] });
    },
  });
};

export const useUpdateAnyLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<LocationSettings> }) => {
      const res = await axiosInstance.patch(`/location/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations", "all"] });
    },
  });
};

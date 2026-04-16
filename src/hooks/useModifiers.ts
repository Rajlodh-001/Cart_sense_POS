import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export interface Modifier {
  id: string;
  name: string;
  note?: string;
  description?: string;
  categories?: { id: string; name: string }[];
  _count?: {
    products: number;
    categories: number;
  };
  products?: { id: string; name: string; imageUrl?: string }[];
}

interface ModifiersResponse {
  data: Modifier[];
  meta: {
    total: number;
    filteredTotal: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const useModifiers = (params?: { search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["modifiers", params],
    queryFn: async () => {
      const res = await axiosInstance.get<ModifiersResponse>("/modifier", { params });
      return res.data;
    },
  });
};

export const useModifier = (id: string) => {
  return useQuery({
    queryKey: ["modifier", id],
    queryFn: async () => {
      const res = await axiosInstance.get<Modifier>(`/modifier/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateModifier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Modifier>) => {
      const res = await axiosInstance.post("/modifier", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modifiers"] });
      toast.success("Modifier created successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to create modifier";
      toast.error(message);
    }
  });
};

export const useUpdateModifier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Modifier> }) => {
      const res = await axiosInstance.patch(`/modifier/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modifiers"] });
      queryClient.invalidateQueries({ queryKey: ["modifier"] });
      toast.success("Modifier updated");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to update modifier";
      toast.error(message);
    }
  });
};

export const useDeleteModifier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/modifier/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modifiers"] });
      toast.success("Modifier removed");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to delete modifier";
      toast.error(message);
    }
  });
};

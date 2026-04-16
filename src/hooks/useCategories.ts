import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export interface Category {
  id: string;
  name: string;
  color?: string;
  imageUrl?: string;
  icon?: string;
  _count?: {
    products: number;
  };
}

interface CategoriesResponse {
  data: Category[];
  meta: {
    total: number;
    filteredTotal: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Fetches all categories.
 * Used for populating the Menu Navbar.
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories", "all"],
    queryFn: async () => {
      // Fetch a larger limit assuming there aren't thousands of categories
      const res = await axiosInstance.get<CategoriesResponse>(
        "/category?limit=100",
      );
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour locally cached
  });
};

// --- CRUD MUTATIONS ---

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Category>) => {
      const res = await axiosInstance.post("/category", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to create category";
      toast.error(message);
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Category> }) => {
      const res = await axiosInstance.patch(`/category/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to update category";
      toast.error(message);
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/category/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to delete category";
      toast.error(message);
    }
  });
};

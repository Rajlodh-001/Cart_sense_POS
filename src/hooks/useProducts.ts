import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  skuId: string;
  isActive: boolean;
  imageUrl: string;
  category: { id: string; name: string; color: string };
  categoryId?: string;
  
  // New Fields
  description?: string;
  additionalNotes?: string;
  discount?: number;
  color?: string;
  size?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  weight?: number;
  recipe?: any;
  cookingDescription?: any;
  
  modifiers?: { id: string; name: string; note?: string }[];
  modifierIds?: string[];
}

interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    filteredTotal: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Fetches an initial batch of products to populate the local cache.
 * Keeps the data fresh for a longer duration (e.g., 1 hour).
 */
export const useInitialProducts = () => {
  return useQuery({
    queryKey: ["products", "initial"],
    queryFn: async () => {
      // Fetch a larger limit to have a good local cache, adjust as needed
      const res =
        await axiosInstance.get<ProductsResponse>("/product?limit=200");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

/**
 * Executes a fallback search against the backend API when the local cache
 * does not yield matching results.
 */
export const useProductSearch = (searchQuery: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["products", "search", searchQuery],
    queryFn: async () => {
      const res = await axiosInstance.get<ProductsResponse>(
        `/product?search=${encodeURIComponent(searchQuery)}`,
      );
      return res.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// --- CRUD MUTATIONS ---

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Product>) => {
      const res = await axiosInstance.post("/product", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to create product";
      toast.error(message);
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Product>;
    }) => {
      const res = await axiosInstance.patch(`/product/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product changes saved!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to update product";
      toast.error(message);
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/product/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product removed from catalog");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to delete product";
      toast.error(message);
    }
  });
};

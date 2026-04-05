import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Product {
  id: string;
  name: string;
  price: number;
  skuId: string;
  isActive: boolean;
  imageUrl: string;
  category: { id: string; name: string };
  notes?: { id: string; name: string; note?: string }[];
}

interface ProductsResponse {
  products: Product[];
  filteredCount: number;
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
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
      return res.data.products;
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
      return res.data.products;
    },
    enabled,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Category {
  id: string;
  name: string;
  color?: string;
  image?: string;
  icon?: string;
  _count?: {
    products: number;
  };
}

interface CategoriesResponse {
  categories: Category[];
  filteredCount: number;
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
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
      return res.data.categories;
    },
    staleTime: 1000 * 60 * 60, // 1 hour locally cached
  });
};

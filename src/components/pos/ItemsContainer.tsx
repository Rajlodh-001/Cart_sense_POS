"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import MenuNavbar from "./MenuNavbar";
import MenuPage from "./MenuPage";
import TopBar from "@/components/shared/TopBar";
import SearchBox from "./SearchBox";
import { categories as staticCategories } from "../../../lib/TempData";
import {
  useInitialProducts,
  useProductSearch,
  Product,
} from "@/hooks/useProducts";
import { useCategories, Category } from "@/hooks/useCategories";

const ItemsContainer = () => {
  const { data: dynamicCategories, isLoading: isCategoriesLoading } =
    useCategories();
  const [search, setSearch] = useState("");
  const [activeCategoryIds, setActiveCategoryIds] = useState<
    (number | string)[]
  >([]);

  const queryClient = useQueryClient();

  // 1. Fetch initial local cache of products (longer staleTime)
  const { data: initialProducts, isLoading: isInitialLoading } =
    useInitialProducts();

  // 2. Local filtering logic
  const localFilteredProducts = useMemo(() => {
    if (!initialProducts) return [];

    let filtered = initialProducts;

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.skuId?.toLowerCase().includes(lowerSearch),
      );
    }

    if (activeCategoryIds.length > 0) {
      // API products use string IDs for categories, handle string/number comparison
      filtered = filtered.filter((p) =>
        activeCategoryIds.some((id) => String(p.category.id) === String(id)),
      );
    }

    return filtered;
  }, [initialProducts, search, activeCategoryIds]);

  // Determine if we need to fall back to a database search
  const needsFallbackSearch =
    search.length > 0 && localFilteredProducts.length === 0;

  // 3. Optional fallback search querying the backend
  const { data: searchFallbackProducts, isLoading: isSearchLoading } =
    useProductSearch(search, needsFallbackSearch);

  // 4. Merge successfully fetched fallback products into the main initialProducts cache
  useEffect(() => {
    if (searchFallbackProducts && searchFallbackProducts.length > 0) {
      queryClient.setQueryData<Product[]>(["products", "initial"], (old) => {
        if (!old) return searchFallbackProducts;

        // Merge without duplicates by resolving on product ID
        const newItems = searchFallbackProducts.filter(
          (newP) => !old.some((oldP) => oldP.id === newP.id),
        );
        return [...old, ...newItems];
      });
    }
  }, [searchFallbackProducts, queryClient]);

  const [isMultiSelect, setIsMultiSelect] = useState(false);

  const handleToggleCategory = useCallback(
    (id: number | string) => {
      if (id === "all") {
        setActiveCategoryIds([]);
        return;
      }
      setActiveCategoryIds((prev) => {
        if (!isMultiSelect) {
          // Single select behavior
          return prev.includes(id) && prev.length === 1 ? [] : [id];
        }
        // Multi select behavior
        return prev.includes(id)
          ? prev.filter((cid) => cid !== id)
          : [...prev, id];
      });
    },
    [isMultiSelect],
  );

  // Determine the final list of products to display
  // If we had to fall back and we got results, they will be merged into initial cache and displayed via useMemo above
  // but if it's currently loading the remote search, we can show a loading state if needed.
  const displayProducts = localFilteredProducts;

  return (
    <div className="h-full bg-[#f0f2f5] w-full flex flex-col p-2 sm:p-4 overflow-hidden">
      <TopBar />

      {/* Search + Category Navigation */}
      <SearchBox searchQuery={search} onSearchChange={setSearch} />
      <MenuNavbar
        categories={dynamicCategories || []}
        activeCategoryIds={activeCategoryIds}
        onToggleCategory={handleToggleCategory}
        isMultiSelect={isMultiSelect}
        onToggleMultiSelect={setIsMultiSelect}
      />

      {/* Menu Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {isInitialLoading || (needsFallbackSearch && isSearchLoading) ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <MenuPage products={displayProducts} />
        )}

        {!isInitialLoading &&
          displayProducts.length === 0 &&
          !isSearchLoading && (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-400 bg-white/50 rounded-[2.5rem] border-2 border-dashed border-gray-200 m-4">
              <div className="bg-gray-100 p-8 rounded-full mb-8 shadow-inner">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">No products found</h3>
              <p className="text-gray-500 max-w-sm text-center text-lg leading-relaxed mb-10">
                We couldn't find any items matching your current filters or search query.
              </p>
              {(search || activeCategoryIds.length > 0) && (
                <button 
                  onClick={() => {
                    setSearch("");
                    setActiveCategoryIds([]);
                  }}
                  className="px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-[1.5rem] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 hover:px-12"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default ItemsContainer;

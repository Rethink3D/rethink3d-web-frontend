import { useState, useEffect, useCallback, useRef } from "react";
import { productService } from "../services/productService";
import type { ProductPreviewDTO, CategoryDTO } from "../types/dtos";
import { DEFAULT_LIMIT, DEBOUNCE_MS } from "../types/dtos/common";

export interface ProductCatalogFilters {
  search: string;
  selectedCategories: string[];
  isPersonalizable: boolean | null;
}

const INITIAL_FILTERS: ProductCatalogFilters = {
  search: "",
  selectedCategories: [],
  isPersonalizable: null,
};

export const useProductCatalog = () => {
  const [items, setItems] = useState<ProductPreviewDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ProductCatalogFilters>(INITIAL_FILTERS);

  const [categoryMap, setCategoryMap] = useState<CategoryDTO[]>([]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    productService
      .getProductCategories()
      .then(setCategoryMap)
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback(
    async (currentPage: number, currentFilters: ProductCatalogFilters, catMap: CategoryDTO[], isAppend: boolean) => {
      setLoading(true);
      try {
        const categoryIds = currentFilters.selectedCategories
          .map((name) => catMap.find((c) => c.name === name)?.id)
          .filter((id): id is number => id !== undefined);

        const data = await productService.searchProducts({
          page: currentPage,
          limit: DEFAULT_LIMIT,
          searchFor: currentFilters.search.trim() || undefined,
          categories: categoryIds.length > 0 ? categoryIds : undefined,
          isPersonalizable: currentFilters.isPersonalizable ?? undefined,
        });

        setItems((prev) => (isAppend ? [...prev, ...data.items] : data.items));
        setTotal(data.total);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    if (page === 1) {
      debounceRef.current = setTimeout(() => {
        fetchProducts(page, filters, categoryMap, false);
      }, DEBOUNCE_MS);
    } else {
      fetchProducts(page, filters, categoryMap, true);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [page, filters, categoryMap, fetchProducts]);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
    setPage(1);
  }, []);

  const applyFilters = useCallback(
    (categories: string[], isPersonalizable: boolean | null) => {
      setFilters((prev) => ({ ...prev, selectedCategories: categories, isPersonalizable }));
      setPage(1);
    },
    [],
  );

  const loadMore = useCallback(() => {
    if (!loading && page < Math.ceil(total / DEFAULT_LIMIT)) {
      setPage((prev) => prev + 1);
    }
  }, [loading, page, total]);

  const hasMore = page < Math.ceil(total / DEFAULT_LIMIT);


  const totalPages = Math.ceil(total / DEFAULT_LIMIT);

  const meta = total > 0
    ? { page, limit: DEFAULT_LIMIT, total, totalPages }
    : null;

  const activeFilterCount =
    filters.selectedCategories.length + (filters.isPersonalizable !== null ? 1 : 0);

  const availableCategories = categoryMap.map((c) => c.name);

  return {
    items,
    meta,
    loading,
    page,
    filters,
    availableCategories,
    activeFilterCount,
    hasMore,
    setSearch,
    applyFilters,
    loadMore,
  };
};


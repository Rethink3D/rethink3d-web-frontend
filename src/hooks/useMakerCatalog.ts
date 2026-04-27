import { useState, useEffect, useCallback, useRef } from "react";
import { makerService } from "../services/makerService";
import type { MakerPreviewDTO } from "../types/dtos";
import { DEFAULT_LIMIT, DEBOUNCE_MS } from "../types/dtos/common";

export interface MakerCatalogFilters {
  search: string;
  selectedCategories: string[];
  selectedServiceTypes: string[];
}

const INITIAL_FILTERS: MakerCatalogFilters = {
  search: "",
  selectedCategories: [],
  selectedServiceTypes: [],
};

export const useMakerCatalog = () => {
  const [items, setItems] = useState<MakerPreviewDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<MakerCatalogFilters>(INITIAL_FILTERS);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    makerService
      .getMakersCategories()
      .then((data) => setAvailableCategories(data.map((c) => c.name)))
      .catch(() => {});
  }, []);


  const fetchMakers = useCallback(
    async (currentPage: number, currentFilters: MakerCatalogFilters, isAppend: boolean) => {
      setLoading(true);
      try {
        const data = await makerService.getMakersCatalog({
          page: currentPage,
          limit: DEFAULT_LIMIT,
          search: currentFilters.search.trim() || undefined,
          categories:
            currentFilters.selectedCategories.length > 0
              ? currentFilters.selectedCategories.join(",")
              : undefined,
          service:
            currentFilters.selectedServiceTypes.length > 0
              ? currentFilters.selectedServiceTypes
              : undefined,
        });

        setItems((prev) => (isAppend ? [...prev, ...data.items] : data.items));
        setTotal(data.meta.total);
      } catch (error) {
        console.error("Failed to fetch makers", error);
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
        fetchMakers(page, filters, false);
      }, DEBOUNCE_MS);
    } else {
      fetchMakers(page, filters, true);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [page, filters, fetchMakers]);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
    setPage(1);
  }, []);

  const applyFilters = useCallback(
    (categories: string[], services: string[]) => {
      setFilters((prev) => ({
        ...prev,
        selectedCategories: categories,
        selectedServiceTypes: services,
      }));
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

  const activeFilterCount =
    filters.selectedCategories.length + filters.selectedServiceTypes.length;

  return {
    items,
    loading,
    filters,
    availableCategories,
    activeFilterCount,
    hasMore,
    setSearch,
    applyFilters,
    loadMore,
  };
};

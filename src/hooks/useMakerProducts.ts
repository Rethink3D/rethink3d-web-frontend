import { useState, useEffect, useCallback } from "react";
import { productService } from "../services/productService";
import type { ProductPreviewDTO } from "../types/dtos";
import { useDebounce } from "./useDebounce";

export const useMakerProducts = (makerId: string | undefined) => {
  const [products, setProducts] = useState<ProductPreviewDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchText, setSearchText] = useState("");
  const [isPersonalizableFilter, setIsPersonalizableFilter] = useState<boolean | null>(null);
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | null>(null);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const LIMIT = 12;

  const debouncedSearch = useDebounce(searchText, 500);

  const fetchProducts = useCallback(async (isFirstPage: boolean) => {
    if (!makerId) return;

    try {
      if (isFirstPage) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params = {
        page: isFirstPage ? 1 : page,
        limit: LIMIT,
        makerId,
        searchFor: debouncedSearch || undefined,
        isPersonalizable: isPersonalizableFilter !== null ? isPersonalizableFilter : undefined,
        isActive: isActiveFilter !== null ? isActiveFilter : undefined,
      };

      const response = await productService.getMakerProducts(params);

      if (isFirstPage) {
        setProducts(response.items);
      } else {
        setProducts((prev) => [...prev, ...response.items]);
      }

      setTotal(response.meta.total);
      setHasMore(response.meta.page < response.meta.totalPages);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch maker products", err);
      setError("Não foi possível carregar seus produtos.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [debouncedSearch, isPersonalizableFilter, isActiveFilter, page, makerId]);

  useEffect(() => {
    setPage(1);
    fetchProducts(true);
  }, [debouncedSearch, isPersonalizableFilter, isActiveFilter, makerId]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchProducts(false);
    }
  }, [page]);

  const activeFilterCount = [
    isPersonalizableFilter !== null,
    isActiveFilter !== null,
  ].filter(Boolean).length;

  return {
    products,
    loading,
    loadingMore,
    error,
    searchText,
    setSearchText,
    isPersonalizableFilter,
    setIsPersonalizableFilter,
    isActiveFilter,
    setIsActiveFilter,
    total,
    hasMore,
    loadMore,
    activeFilterCount,
  };
};

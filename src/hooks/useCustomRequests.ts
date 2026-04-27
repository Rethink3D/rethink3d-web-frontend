import { useState, useEffect, useCallback, useRef } from "react";
import { customRequestService } from "../services/customRequestService";
import api from "../services/api";
import type { CustomRequestDTO, CategoryDTO } from "../types/dtos";
import { DEFAULT_LIMIT, DEBOUNCE_MS } from "../types/dtos/common";

export const useCustomRequests = (initialType: "global" | "maker" = "global") => {
  const [requests, setRequests] = useState<CustomRequestDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<CategoryDTO[]>([]);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"global" | "maker">(initialType);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchRequests = useCallback(
    async (
      currentPage: number,
      currentType: "global" | "maker",
      currentStart: string,
      currentEnd: string,
      currentCategories: string[],
      currentServices: string[],
      currentMaterials: string[],
      isAppend: boolean
    ) => {
      setLoading(true);
      setError(null);
      try {
        const parsedStartDate = currentStart ? new Date(`${currentStart}T00:00:00`) : undefined;
        const parsedEndDate = currentEnd ? new Date(`${currentEnd}T23:59:59.999`) : undefined;

        const filters = {
          page: currentPage,
          limit: DEFAULT_LIMIT,
          startDate: parsedStartDate ? parsedStartDate.toISOString() : undefined,
          endDate: parsedEndDate ? parsedEndDate.toISOString() : undefined,
          categories: currentCategories.length > 0 ? currentCategories : undefined,
          service: currentServices.length > 0 ? currentServices : undefined,
          materials: currentMaterials.length > 0 ? currentMaterials : undefined,
        };

        const data =
          currentType === "global"
            ? await customRequestService.getGlobalRequests(filters)
            : await customRequestService.getMakerRequests(filters);

        setRequests((prev) => (isAppend ? [...prev, ...(data.items || [])] : data.items || []));
        setTotal(data.meta?.total || 0);
      } catch (err: unknown) {
        let message = "Erro ao carregar solicitações";
        if (err && typeof err === "object" && "response" in err) {
          const axiosErr = err as { response?: { data?: { message?: string } } };
          message = axiosErr.response?.data?.message || message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (page === 1) {
      debounceRef.current = setTimeout(() => {
        fetchRequests(page, activeTab, startDate, endDate, selectedCategories, selectedService, selectedMaterials, false);
      }, DEBOUNCE_MS);
    } else {
      fetchRequests(page, activeTab, startDate, endDate, selectedCategories, selectedService, selectedMaterials, true);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [page, activeTab, startDate, endDate, selectedCategories, selectedService, selectedMaterials, fetchRequests]);

  const loadMore = useCallback(() => {
    if (!loading && page < Math.ceil(total / DEFAULT_LIMIT)) {
      setPage((prev) => prev + 1);
    }
  }, [loading, page, total]);

  const hasMore = page < Math.ceil(total / DEFAULT_LIMIT);

  const handleSetTab = useCallback((tab: "global" | "maker") => {
    setActiveTab(tab);
    setPage(1);
    setStartDate("");
    setEndDate("");
    setSelectedCategories([]);
    setSelectedService([]);
    setSelectedMaterials([]);
  }, []);

  useEffect(() => {
    api.get<CategoryDTO[]>("/search/category")
      .then((res) => setAvailableCategories(res.data))
      .catch(() => {});
  }, []);

  return {
    requests,
    loading,
    error,
    activeTab,
    setActiveTab: handleSetTab,
    startDate,
    setStartDate: (val: string) => { setStartDate(val); setPage(1); },
    endDate,
    setEndDate: (val: string) => { setEndDate(val); setPage(1); },
    selectedCategories,
    setSelectedCategories: (val: string[]) => { setSelectedCategories(val); setPage(1); },
    selectedService,
    setSelectedService: (val: string[]) => { setSelectedService(val); setPage(1); },
    selectedMaterials,
    setSelectedMaterials: (val: string[]) => { setSelectedMaterials(val); setPage(1); },
    availableCategories,
    loadMore,
    hasMore,
    refresh: () => {
      setPage(1);
      fetchRequests(1, activeTab, startDate, endDate, selectedCategories, selectedService, selectedMaterials, false);
    },
  };
};

import { useState, useEffect, useCallback, useRef } from "react";
import { orderService } from "../services/orderService";
import type { OrderPreviewDTO, OrderTypeEnum } from "../types/dtos";
import { DEFAULT_LIMIT, DEBOUNCE_MS } from "../types/dtos/common";

export const useMakerOrders = (initialType: OrderTypeEnum = "product") => {
  const [orders, setOrders] = useState<OrderPreviewDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<OrderTypeEnum>(initialType);
  const [status, setStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchOrders = useCallback(
    async (
      currentPage: number,
      currentType: OrderTypeEnum,
      currentStatus: string,
      currentStart: string,
      currentEnd: string,
      isAppend: boolean,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const parsedStartDate = currentStart
          ? new Date(`${currentStart}T00:00:00`)
          : undefined;
        const parsedEndDate = currentEnd
          ? new Date(`${currentEnd}T23:59:59.999`)
          : undefined;

        const data = await orderService.getMakerOrders({
          page: currentPage,
          limit: DEFAULT_LIMIT,
          type: currentType,
          status: currentStatus || undefined,
          startDate: parsedStartDate
            ? parsedStartDate.toISOString()
            : undefined,
          endDate: parsedEndDate ? parsedEndDate.toISOString() : undefined,
        });

        setOrders((prev) => (isAppend ? [...prev, ...data.items] : data.items));
        setTotal(data.meta.total);
      } catch (err: unknown) {
        if (err && typeof err === "object" && "response" in err) {
          const anyErr = err as { response?: { data?: { message?: string } } };
          setError(
            anyErr.response?.data?.message || "Erro ao carregar pedidos",
          );
        } else {
          setError("Erro ao carregar pedidos");
        }
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
        fetchOrders(page, activeTab, status, startDate, endDate, false);
      }, DEBOUNCE_MS);
    } else {
      fetchOrders(page, activeTab, status, startDate, endDate, true);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [page, activeTab, status, startDate, endDate, fetchOrders]);

  const loadMore = useCallback(() => {
    if (!loading && page < Math.ceil(total / DEFAULT_LIMIT)) {
      setPage((prev) => prev + 1);
    }
  }, [loading, page, total]);

  const hasMore = page < Math.ceil(total / DEFAULT_LIMIT);

  const handleSetTab = useCallback((tab: OrderTypeEnum) => {
    setActiveTab(tab);
    setPage(1);
  }, []);

  const handleSetStatus = useCallback((newStatus: string) => {
    setStatus(newStatus);
    setPage(1);
  }, []);

  const handleSetStartDate = useCallback((date: string) => {
    setStartDate(date);
    setPage(1);
  }, []);

  const handleSetEndDate = useCallback((date: string) => {
    setEndDate(date);
    setPage(1);
  }, []);

  return {
    orders,
    loading,
    error,
    activeTab,
    setActiveTab: handleSetTab,
    status,
    setStatus: handleSetStatus,
    startDate,
    setStartDate: handleSetStartDate,
    endDate,
    setEndDate: handleSetEndDate,
    loadMore,
    hasMore,
    refresh: () => {
      setPage(1);
      fetchOrders(1, activeTab, status, startDate, endDate, false);
    },
  };
};

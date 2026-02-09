import { useState, useEffect, useCallback } from "react";
import orderService from "../services/orderService";
import type { OrderPreviewDTO, OrderTypeEnum } from "../types/dtos";

export const useMakerOrders = (initialType: OrderTypeEnum = "product") => {
  const [orders, setOrders] = useState<OrderPreviewDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OrderTypeEnum>(initialType);
  const [status, setStatus] = useState<string>("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getMakerOrders(activeTab);

      
      const filteredByStatus = status
        ? data.filter((order) => order.status === status)
        : data;

      
      const actionableOrders = filteredByStatus.filter(
        (order) => order.status !== "awaiting_payment",
      );

      
      const sortedOrders = [...actionableOrders].sort((a, b) => {
        
        if (a.status === "delayed" && b.status !== "delayed") return -1;
        if (a.status !== "delayed" && b.status === "delayed") return 1;

        
        const priority: Record<string, number> = {
          awaiting_maker: 0,
          on_going: 1,
        };

        const priorityA = priority[a.status] ?? 2;
        const priorityB = priority[b.status] ?? 2;

        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }

        
        return (
          new Date(b.creationTime).getTime() -
          new Date(a.creationTime).getTime()
        );
      });

      setOrders(sortedOrders);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const anyErr = err as { response?: { data?: { message?: string } } };
        setError(anyErr.response?.data?.message || "Erro ao carregar pedidos");
      } else {
        setError("Erro ao carregar pedidos");
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab, status]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    activeTab,
    setActiveTab,
    status,
    setStatus,
    refresh: fetchOrders,
  };
};

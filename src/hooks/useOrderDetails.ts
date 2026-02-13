import { useState, useEffect, useCallback } from "react";
import orderService from "../services/orderService";
import type { OrderDetailsDTO } from "../types/dtos/order";

export const useOrderDetails = (orderId: string | undefined) => {
  const [order, setOrder] = useState<OrderDetailsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetails = useCallback(async () => {
    if (!orderId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrderDetails(orderId);
      setOrder(data);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const anyErr = err as {
          response?: { status?: number; data?: { message?: string } };
        };
        const status = anyErr.response?.status;
        const message = anyErr.response?.data?.message;

        if (status === 404) {
          setError(
            "Pedido não encontrado. Ele pode ter sido removido ou você não tem permissão para visualizá-lo.",
          );
        } else if (status === 403) {
          setError("Você não tem permissão para visualizar este pedido.");
        } else {
          setError(message || "Erro ao carregar detalhes do pedido");
        }
      } else {
        setError("Erro ao carregar detalhes do pedido");
      }
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  return {
    order,
    loading,
    error,
    refresh: fetchOrderDetails,
  };
};

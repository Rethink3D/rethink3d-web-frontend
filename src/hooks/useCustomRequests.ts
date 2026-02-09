import { useState, useEffect, useCallback } from "react";
import { customRequestService } from "../services/customRequestService";
import type { CustomRequestDTO } from "../types/dtos";

export const useCustomRequests = (type: "global" | "maker" = "global") => {
  const [requests, setRequests] = useState<CustomRequestDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data =
        type === "global"
          ? await customRequestService.getGlobalRequests()
          : await customRequestService.getMakerRequests();
      setRequests(data);
      setError(null);
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
  }, [type]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return { requests, loading, error, refetch: fetchRequests };
};

import { useState, useEffect, useCallback } from "react";
import { customRequestService } from "../services/customRequestService";
import type { CustomRequestDetailsDTO } from "../types/dtos";

export const useCustomRequestDetails = (requestId: string | undefined) => {
  const [request, setRequest] = useState<CustomRequestDetailsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequestDetails = useCallback(async () => {
    if (!requestId) return;

    setLoading(true);
    setError(null);
    try {
      const data =
        await customRequestService.getCustomRequestDetails(requestId);
      setRequest(data);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const anyErr = err as { response?: { data?: { message?: string } } };
        setError(
          anyErr.response?.data?.message ||
            "Erro ao carregar detalhes da solicitação",
        );
      } else {
        setError("Erro ao carregar detalhes da solicitação");
      }
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    fetchRequestDetails();
  }, [fetchRequestDetails]);

  return {
    request,
    loading,
    error,
    refresh: fetchRequestDetails,
  };
};

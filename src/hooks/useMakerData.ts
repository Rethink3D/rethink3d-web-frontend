import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { makerService } from "../services/makerService";
import type { MakerPageDTO } from "../types/dtos";

export const useMakerData = () => {
  const [maker, setMaker] = useState<MakerPageDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const profile = await userService.getProfile();
        if (profile.makerId) {
          const makerData = await makerService.getMakerById(profile.makerId);
          if (isMounted) {
            setMaker(makerData);
          }
        } else {
          if (isMounted) setError("Você ainda não possui um perfil de Maker.");
        }
      } catch (err) {
        console.error("Failed to fetch maker data", err);
        if (isMounted) setError("Ocorreu um erro ao carregar as informações.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { maker, loading, error };
};

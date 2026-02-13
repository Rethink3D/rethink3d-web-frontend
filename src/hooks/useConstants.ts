import { useState, useEffect } from "react";
import type { ConstantNameEnum } from "../types/constants";
import { constantService } from "../services/constantService";

export function useConstants(names: ConstantNameEnum[]) {
  const [constants, setConstants] = useState<Record<string, string | number>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const namesKey = names.join(",");

  useEffect(() => {
    async function fetchConstants() {
      try {
        setLoading(true);
        // We use the names from the dependency list to be safe
        const currentNames = namesKey.split(",") as ConstantNameEnum[];
        const data = await constantService.getBatchConstants(currentNames);
        setConstants(data);
      } catch (err) {
        console.error("Failed to fetch constants", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    if (namesKey) {
      fetchConstants();
    } else {
      setLoading(false);
    }
  }, [namesKey]);

  const getConstant = <T extends string | number>(
    name: ConstantNameEnum,
    defaultValue: T,
  ): T => {
    return (constants[name] as T) ?? defaultValue;
  };

  return { constants, getConstant, loading, error };
}

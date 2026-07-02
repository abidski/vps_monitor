import { useEffect, useState } from "react";
import { get_services } from "../api/services.ts";
import type { DataPoint } from "../types";

export function useServices() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await get_services();
        setData(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);
  return { data, loading, error };
}

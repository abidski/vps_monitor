import { useEffect, useState } from "react";
import { get_history } from "../api/history.ts";
import type { DataPoint } from "../types";

export function useHistory(hours: number = 24) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await get_history(hours);
        setData(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [hours]);
  return { data, loading, error };
}

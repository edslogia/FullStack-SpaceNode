import { useState, useEffect } from "react";
import { getAllOperators, type Operator } from "../api/operator";

interface UseOperatorsResult {
  operators: Operator[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para gestionar el estado de los operators.
 */
export function useOperators(): UseOperatorsResult {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOperators = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllOperators();
      setOperators(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  return { operators, loading, error, refetch: fetchOperators };
}

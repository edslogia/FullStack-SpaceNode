import { useState } from "react";
import { getCustomerById, type CustomerDetail } from "../api/customer";

interface UseCustomerDetailResult {
  detail: CustomerDetail | null;
  loading: boolean;
  error: string | null;
  fetchDetail: (id: string) => Promise<void>;
}

/**
 * Hook para cargar el detalle de un customer bajo demanda (lazy loading).
 * Solo se ejecuta cuando se llama explícitamente a fetchDetail().
 */
export function useCustomerDetail(): UseCustomerDetailResult {
  const [detail, setDetail] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCustomerById(id);
      setDetail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setDetail(null);
    } finally {
      setLoading(false);
    }
  };

  return { detail, loading, error, fetchDetail };
}

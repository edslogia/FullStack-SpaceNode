export interface Operator {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  hasChangedPassword: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Obtiene todos los operators desde el backend.
 * Requiere autenticación con rol 'admin'.
 */
export async function getAllOperators(): Promise<Operator[]> {
  const token = window.localStorage.getItem("accessToken");

  const response = await fetch("/api/v1/operator", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al obtener operadores");
  }

  return response.json();
}

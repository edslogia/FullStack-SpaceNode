export interface Customer {
  id: string;
  username: string;
  fullName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  nodosCount: number;
  operatorsCount: number;
}

export interface Nodo {
  id: string;
  name: string;
  description: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerOperator {
  id: string;
  operatorId: string;
  customerId: string;
  operator: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    hasChangedPassword: boolean;
  };
}

export interface CustomerDetail {
  id: string;
  username: string;
  fullName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  nodos: Nodo[];
  operators: CustomerOperator[];
}

/**
 * Obtiene todos los customers desde el backend (datos resumidos).
 * Requiere autenticación con rol 'admin'.
 */
export async function getAllCustomers(): Promise<Customer[]> {
  const token = window.localStorage.getItem("accessToken");

  const response = await fetch("/api/v1/customer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al obtener clientes");
  }

  return response.json();
}

/**
 * Obtiene el detalle completo de un customer (con operadores y nodos).
 * Requiere autenticación con rol 'admin'.
 */
export async function getCustomerById(id: string): Promise<CustomerDetail> {
  const token = window.localStorage.getItem("accessToken");

  const response = await fetch(`/api/v1/customer/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al obtener detalle del cliente");
  }

  return response.json();
}

/**
 * Actualiza el estado (isActive) de un customer.
 * Requiere autenticación con rol 'admin'.
 */
export async function updateCustomerStatus(
  id: string,
  isActive: boolean
): Promise<Customer> {
  const token = window.localStorage.getItem("accessToken");

  const response = await fetch(`/api/v1/customer/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al actualizar estado del cliente");
  }

  const result = await response.json();
  return result.data;
}

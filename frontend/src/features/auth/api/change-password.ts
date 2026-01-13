const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ChangePasswordData {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordResponse {
  accessToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    hasChangedPassword: boolean;
    type: "admin" | "operator";
  };
  message: string;
}

export const changePassword = async (
  data: ChangePasswordData
): Promise<ChangePasswordResponse> => {
  const token = window.localStorage.getItem("accessToken");
  const res = await fetch(`${API_URL}/api/v1/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al cambiar la contraseña");
  }

  return res.json();
};

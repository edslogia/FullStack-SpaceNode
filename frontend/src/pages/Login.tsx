import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginFormState {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  // Maneja cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value, error: null });
  };

  // Envía el formulario de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm((f) => ({ ...f, loading: true, error: null }));

    // Validación simple (puedes mejorarla con Zod)
    if (!form.email || !form.password) {
      setForm((f) => ({
        ...f,
        error: "Por favor, completa todos los campos.",
        loading: false,
      }));
      return;
    }

    try {
      // Aquí deberías llamar a tu API real
      // const res = await fetch("/api/v1/auth/login", { ... })
      // Simulación de login exitoso
      if (form.email === "admin@spacenode.com" && form.password === "1234") {
        alert("Login exitoso (simulado)");
        // Redirigir o guardar token aquí
      } else {
        setForm((f) => ({
          ...f,
          error: "Credenciales incorrectas.",
          loading: false,
        }));
      }
    } catch (err) {
      setForm((f) => ({
        ...f,
        error: "Error de red o servidor.",
        loading: false,
      }));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-16">
      <form
        className="bg-surface p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-accent-blue">
          Iniciar sesión
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-accent-blue focus:ring focus:ring-accent-blue focus:ring-opacity-50 bg-background text-gray-100"
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-accent-blue focus:ring focus:ring-accent-blue focus:ring-opacity-50 bg-background text-gray-100"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        {form.error && (
          <div className="text-red-500 mb-4 text-sm">{form.error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-accent-blue text-white py-2 rounded hover:bg-accent-purple transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={form.loading}
        >
          {form.loading ? "Ingresando..." : "Entrar"}
        </button>
        <Link
          to="/"
          className="block mt-6 text-center text-accent-blue hover:underline text-sm"
        >
          ← Volver al dashboard público
        </Link>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginFormState {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
}

// Iconos SVG profesionales
const IconLock: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IconMail: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconShield: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconAlert: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

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
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Gradiente de fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-accent-purple/5 to-accent-green/5 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Grid decorativo de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative w-full max-w-md mx-4">
        {/* Tarjeta de login */}
        <div className="bg-surface border border-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Header con branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-purple rounded-2xl mb-4 shadow-lg shadow-accent-blue/20">
              <IconLock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green mb-2">
              SpaceNode
            </h1>
            <p className="text-gray-400 text-sm">Portal de Autenticación</p>
          </div>

          {/* Badge de seguridad */}
          <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-accent-green/10 border border-accent-green/30 rounded-lg">
            <IconShield className="w-4 h-4 text-accent-green" />
            <span className="text-xs text-accent-green font-medium">Conexión cifrada JWT + Argon2</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconMail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="admin@spacenode.com"
                  className="block w-full pl-10 pr-3 py-3 bg-background border border-gray-800 rounded-lg text-gray-100 placeholder-gray-600 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/50 transition-all"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Campo Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconLock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 bg-background border border-gray-800 rounded-lg text-gray-100 placeholder-gray-600 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/50 transition-all"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Mensaje de error */}
            {form.error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <IconAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{form.error}</p>
              </div>
            )}

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={form.loading}
              className="group relative w-full px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg hover:shadow-lg hover:shadow-accent-purple/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center">
                {form.loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Autenticando...
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>

            {/* Credenciales de demo */}
            <div className="mt-4 p-4 bg-accent-blue/10 border border-accent-blue/30 rounded-lg">
              <p className="text-xs text-gray-400 text-center mb-2">Credenciales de prueba:</p>
              <p className="text-xs text-accent-blue text-center font-mono">admin@spacenode.com / 1234</p>
            </div>
          </form>

          {/* Link de regreso */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-400 hover:text-accent-blue transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            © 2026 SpaceNode. Protocolo LOGIA WATCHER.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

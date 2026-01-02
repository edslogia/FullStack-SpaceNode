import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type LoginStep = 'login' | 'change-password';

interface LoginFormState {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
}

interface ChangePasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  error: string | null;
  loading: boolean;
}

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

const IconAlert: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user, changePassword } = useAuth();
  const [step, setStep] = useState<LoginStep>('login');

  // Estados
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const [passwordForm, setPasswordForm] = useState<ChangePasswordFormState>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    error: null,
    loading: false,
  });

  // Login
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value, error: null });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginForm((f) => ({ ...f, loading: true, error: null }));

    if (!loginForm.email || !loginForm.password) {
      setLoginForm((f) => ({
        ...f,
        error: 'Por favor, completa todos los campos.',
        loading: false,
      }));
      return;
    }

    try {
      const loggedInUser = await login(loginForm.email, loginForm.password);
      
      // Verificar si requiere cambio de contraseña obligatorio en primer login
      if (loggedInUser.firstLoginPasswordChange) {
        setStep('change-password');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setLoginForm((f) => ({
        ...f,
        error: err.message || 'Error al iniciar sesión.',
        loading: false,
      }));
    }
  };

  // Cambio de contraseña
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value, error: null });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordForm((f) => ({ ...f, loading: true, error: null }));

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordForm((f) => ({
        ...f,
        error: 'Por favor, completa todos los campos.',
        loading: false,
      }));
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordForm((f) => ({
        ...f,
        error: 'Las contraseñas no coinciden.',
        loading: false,
      }));
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordForm((f) => ({
        ...f,
        error: 'La contraseña debe tener al menos 8 caracteres.',
        loading: false,
      }));
      return;
    }

    try {
      await changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
        passwordForm.confirmPassword
      );
      navigate('/dashboard');
    } catch (err: any) {
      setPasswordForm((f) => ({
        ...f,
        error: err.message || 'Error al cambiar contraseña.',
        loading: false,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg shadow-lg mb-4">
            <IconLock className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">SpaceNode</h2>
          <p className="mt-2 text-gray-600">
            {step === 'login' ? 'Inicia sesión en tu cuenta' : 'Cambia tu contraseña'}
          </p>
        </div>

        {/* Formulario */}
        {step === 'login' ? (
          // Login Form
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            {loginForm.error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-4 flex gap-3">
                <IconAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{loginForm.error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <IconMail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@spacenode.com"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  disabled={loginForm.loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <IconLock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  disabled={loginForm.loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginForm.loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loginForm.loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        ) : (
          // Change Password Form
          <form className="space-y-6" onSubmit={handlePasswordSubmit}>
            {passwordForm.error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-4 flex gap-3">
                <IconAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{passwordForm.error}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Debes cambiar tu contraseña temporal antes de continuar.
              </p>
            </div>

            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña actual
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                disabled={passwordForm.loading}
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Nueva contraseña
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                disabled={passwordForm.loading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                disabled={passwordForm.loading}
              />
            </div>

            <button
              type="submit"
              disabled={passwordForm.loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {passwordForm.loading ? 'Cambiando contraseña...' : 'Cambiar contraseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

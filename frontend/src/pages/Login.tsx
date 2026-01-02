// Botón reutilizable para mostrar/ocultar contraseña
interface PasswordToggleButtonProps {
  onClick: () => void;
  disabled: boolean;
  isVisible: boolean;
  label?: string;
}

const PasswordToggleButton: React.FC<PasswordToggleButtonProps> = ({ onClick, disabled, isVisible, label }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label || (isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña')}
    className="absolute right-3 top-3 text-gray-500 disabled:text-gray-500 p-0 border-0 bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-150 hover:scale-110"
  >
    {isVisible ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
  </button>
);
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

const IconEye: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconEyeOff: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {/* Ojo base (igual que IconEye) */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    {/* Línea diagonal para tachar */}
    <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user, changePassword } = useAuth();
  const [step, setStep] = useState<LoginStep>('login');
  const [showPasswords, setShowPasswords] = useState({
    login: false,
    current: false,
    new: false,
    confirm: false,
  });

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
        // Redirigir al dashboard según el rol del usuario
        const dashboard = loggedInUser.role === 'ADMIN' ? '/dashboard-admin' : '/dashboard-operator';
        navigate(dashboard);
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
      // Redirigir al dashboard según el rol del usuario
      const dashboard = user?.role === 'ADMIN' ? '/dashboard-admin' : '/dashboard-operator';
      navigate(dashboard);
    } catch (err: any) {
      setPasswordForm((f) => ({
        ...f,
        error: err.message || 'Error al cambiar contraseña.',
        loading: false,
      }));
    }
  };

  return (
      <div className="w-full max-w-2xl sm:px-4">
        {/* Contenedor Principal */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-8 space-y-5 sm:p-10 w-full md:w-[450px]">
          {/* Header */}
          <div className="text-center">
          <p className="text-gray-300 text-lg">
            {step === 'login' ? 'Inicia sesión en tu cuenta' : 'Cambia tu contraseña'}
          </p>
        </div>

        {/* Formulario */}
        {step === 'login' ? (
          // Login Form
          <form className="space-y-5" onSubmit={handleLoginSubmit}>
            {loginForm.error && (
              <div className="rounded-md bg-red-900 bg-opacity-20 border border-red-600 p-4 flex gap-3">
                <IconAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{loginForm.error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                Email
              </label>
              <div className="relative">
                <IconMail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition"
                  placeholder="tu-correo@email.com"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  disabled={loginForm.loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <IconLock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  name="password"
                  type={showPasswords.login ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  disabled={loginForm.loading}
                />
                <PasswordToggleButton
                  onClick={() => setShowPasswords({ ...showPasswords, login: !showPasswords.login })}
                  disabled={loginForm.loading}
                  isVisible={showPasswords.login}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginForm.loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
            >
              {loginForm.loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        ) : (
          // Change Password Form
          <form className="space-y-5" onSubmit={handlePasswordSubmit}>
            {passwordForm.error && (
              <div className="rounded-md bg-red-900 bg-opacity-20 border border-red-600 p-4 flex gap-3">
                <IconAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{passwordForm.error}</p>
              </div>
            )}

            <div className="bg-blue-900 bg-opacity-20 border border-blue-600 rounded-lg p-4">
              <p className="text-sm text-blue-300">
                <strong>Nota:</strong> Debes cambiar tu contraseña temporal antes de continuar.
              </p>
            </div>

            <div>
              <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-200 mb-2">
                Contraseña actual
              </label>
              <div className="relative">
                <IconLock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition"
                  placeholder="••••••••"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  disabled={passwordForm.loading}
                />
                <PasswordToggleButton
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  disabled={passwordForm.loading}
                  isVisible={showPasswords.current}
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-200 mb-2">
                Nueva contraseña
              </label>
              <div className="relative">
                <IconLock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition"
                  placeholder="••••••••"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  disabled={passwordForm.loading}
                />
                <PasswordToggleButton
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  disabled={passwordForm.loading}
                  isVisible={showPasswords.new}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-200 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <IconLock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition"
                  placeholder="••••••••"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  disabled={passwordForm.loading}
                />
                <PasswordToggleButton
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  disabled={passwordForm.loading}
                  isVisible={showPasswords.confirm}
                />
              </div>
            </div>

              <button
              type="submit"
              disabled={passwordForm.loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Operator {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface CreateOperatorForm {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
}

const IconPlus: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const IconAlert: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const IconCheck: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [operators, setOperators] = useState<Operator[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [createForm, setCreateForm] = useState<CreateOperatorForm>({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  // Cargar operadores al montar el componente
  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/v1/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Error al cargar operadores');

      const data = await response.json();
      setOperators(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value, error: null });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateForm((f) => ({ ...f, loading: true, error: null }));

    if (!createForm.email || !createForm.password) {
      setCreateForm((f) => ({
        ...f,
        error: 'Por favor, completa todos los campos.',
        loading: false,
      }));
      return;
    }

    if (createForm.password.length < 8) {
      setCreateForm((f) => ({
        ...f,
        error: 'La contraseña debe tener al menos 8 caracteres.',
        loading: false,
      }));
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: createForm.email,
          password: createForm.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear operador');
      }

      // Resetear formulario y cargar operadores
      setCreateForm({ email: '', password: '', error: null, loading: false });
      setShowCreateForm(false);
      setSuccessMessage('Operador creado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchOperators();
    } catch (err: any) {
      setCreateForm((f) => ({
        ...f,
        error: err.message || 'Error al crear operador.',
        loading: false,
      }));
    }
  };

  if (user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Acceso denegado. Solo administradores.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-gray-600 mt-1">Bienvenido, {user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-md bg-green-50 border border-green-200 p-4 flex gap-3">
            <IconCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Create Operator Section */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Crear Operador</h2>
            {!showCreateForm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <IconPlus className="w-5 h-5 mr-2" />
                Nuevo Operador
              </button>
            )}
          </div>

          {showCreateForm && (
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {createForm.error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-4 flex gap-3">
                  <IconAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{createForm.error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email del operador
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="operador@spacenode.com"
                    value={createForm.email}
                    onChange={handleCreateChange}
                    disabled={createForm.loading}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña temporal
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={createForm.password}
                    onChange={handleCreateChange}
                    disabled={createForm.loading}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={createForm.loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {createForm.loading ? 'Creando...' : 'Crear Operador'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setCreateForm({ email: '', password: '', error: null, loading: false });
                  }}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Operators List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Operadores</h2>
          </div>

          {loading ? (
            <div className="px-6 py-8 text-center text-gray-600">
              <p>Cargando operadores...</p>
            </div>
          ) : operators.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-600">
              <p>No hay operadores creados aún.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Creado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {operators.map((operator) => (
                    <tr key={operator.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{operator.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {operator.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            operator.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {operator.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(operator.createdAt).toLocaleDateString('es-ES')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

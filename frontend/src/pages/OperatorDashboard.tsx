import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SensorData {
  id: string;
  sensorName: string;
  lastValue: number;
  unit: string;
  lastUpdate: string;
  status: 'online' | 'offline';
}

const OperatorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/v1/sensors', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Error al cargar datos de sensores');

      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'OPERATOR') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Acceso denegado. Solo operadores.</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Operador</h1>
              <p className="text-gray-600 mt-1">Bienvenido, {user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sensores Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Estado de Sensores</h2>
          </div>

          {loading ? (
            <div className="px-6 py-8 text-center text-gray-600">
              <p>Cargando sensores...</p>
            </div>
          ) : sensorData.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-600">
              <p>No hay datos de sensores disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {sensorData.map((sensor) => (
                <div
                  key={sensor.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">{sensor.sensorName}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        sensor.status === 'online'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {sensor.status === 'online' ? 'En línea' : 'Desconectado'}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-accent-blue">
                      {sensor.lastValue}
                      <span className="text-sm text-gray-600 ml-1">{sensor.unit}</span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Última actualización: {new Date(sensor.lastUpdate).toLocaleString('es-ES')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;

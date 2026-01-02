import React from "react";
import { Link } from "react-router-dom";

const PublicDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-100 mb-4">
            Monitoreo de Nodos en Tiempo Real
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Sistema de telemetría IoT para control y supervisión de dispositivos ESP32
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Feature 1 */}
          <div className="bg-surface rounded-lg shadow-md p-6">
            <div className="text-accent-green text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Tiempo Real</h3>
            <p className="text-gray-300">
              Monitorea voltaje, corriente y potencia de tus nodos en tiempo real vía MQTT y WebSockets.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-surface rounded-lg shadow-md p-6">
            <div className="text-accent-blue text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Historial</h3>
            <p className="text-gray-300">
              Almacenamiento eficiente con TimescaleDB. Consulta históricos y genera reportes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-surface rounded-lg shadow-md p-6">
            <div className="text-accent-purple text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Seguro</h3>
            <p className="text-gray-300">
              Autenticación JWT. Cada cliente accede solo a sus nodos autorizados.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-surface rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-100">Sistema en Producción</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-accent-green">24/7</div>
              <div className="text-gray-300 mt-2">Monitoreo continuo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-blue">MQTT</div>
              <div className="text-gray-300 mt-2">Protocolo IoT</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-100">ESP32</div>
              <div className="text-gray-300 mt-2">Compatible</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-purple">Cloud</div>
              <div className="text-gray-300 mt-2">Basado en nube</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-100">¿Listo para monitorear tus nodos?</h3>
          <Link
            to="/login"
            className="inline-block bg-accent-blue text-white px-8 py-3 rounded-md text-lg hover:bg-accent-purple transition"
          >
            Acceder al Dashboard
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500">
              © 2026 SpaceNode - Sistema de monitoreo IoT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicDashboard;

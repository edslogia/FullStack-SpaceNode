import React from "react";
import { Link } from "react-router-dom";

// Componentes de iconos SVG profesionales
const IconBolt: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconChart: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconShield: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconCpu: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const PublicDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section con gradiente */}
      <div className="relative overflow-hidden">
        {/* Gradiente de fondo animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-accent-green/10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-accent-green/20 text-accent-green text-sm font-semibold rounded-full border border-accent-green/30">
                Sistema en Producción
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green mb-6">
              SpaceNode IoT Platform
            </h1>
            <p className="text-2xl text-gray-200 mb-4 max-w-3xl mx-auto">
              Telemetría de alto rendimiento para ESP32
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Ingesta MQTT de &lt;50ms • Almacenamiento TimescaleDB • WebSocket en tiempo real
            </p>
          </div>
        </div>
      </div>

        {/* Features Grid Optimizado */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Tiempo Real */}
            <div className="group bg-surface hover:bg-surface-hover border border-gray-800 hover:border-accent-green/50 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/20">
              <div className="flex items-center justify-center w-14 h-14 bg-accent-green/10 rounded-lg mb-6 group-hover:scale-110 transition-transform">
                <IconBolt className="w-8 h-8 text-accent-green" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Tiempo Real</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Ingesta MQTT con latencia &lt;50ms. Visualización instantánea vía WebSocket.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-500">
                  <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                  Protocolo MQTT v5.0
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                  WebSocket bidireccional
                </div>
              </div>
            </div>

            {/* Feature 2: Almacenamiento */}
            <div className="group bg-surface hover:bg-surface-hover border border-gray-800 hover:border-accent-blue/50 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20">
              <div className="flex items-center justify-center w-14 h-14 bg-accent-blue/10 rounded-lg mb-6 group-hover:scale-110 transition-transform">
                <IconChart className="w-8 h-8 text-accent-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Series de Tiempo</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                TimescaleDB optimizado. Compresión automática. Consultas de agregación sub-segundo.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-500">
                  <span className="w-2 h-2 bg-accent-blue rounded-full mr-2"></span>
                  Hypertables particionadas
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="w-2 h-2 bg-accent-blue rounded-full mr-2"></span>
                  Retención configurable
                </div>
              </div>
            </div>

            {/* Feature 3: Seguridad */}
            <div className="group bg-surface hover:bg-surface-hover border border-gray-800 hover:border-accent-purple/50 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/20">
              <div className="flex items-center justify-center w-14 h-14 bg-accent-purple/10 rounded-lg mb-6 group-hover:scale-110 transition-transform">
                <IconShield className="w-8 h-8 text-accent-purple" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Enterprise Security</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Autenticación JWT + Argon2. RBAC granular. Aislamiento por tenant.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-500">
                  <span className="w-2 h-2 bg-accent-purple rounded-full mr-2"></span>
                  Tokens de acceso/refresh
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="w-2 h-2 bg-accent-purple rounded-full mr-2"></span>
                  Validación estricta DTOs
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas Técnicas */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-surface via-surface to-surface-hover border border-gray-800 rounded-2xl p-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">Stack Tecnológico</h2>
              <p className="text-gray-400">Arquitectura de microservicios de alto rendimiento</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Métrica 1 */}
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-green/10 rounded-xl mb-4 group-hover:bg-accent-green/20 transition-colors">
                  <IconCpu className="w-9 h-9 text-accent-green" />
                </div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent-green to-accent-blue mb-2">
                  &lt;50ms
                </div>
                <div className="text-sm text-gray-400 font-medium">Latencia MQTT</div>
                <div className="text-xs text-gray-600 mt-1">p95 @ 1000 msg/s</div>
              </div>

              {/* Métrica 2 */}
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-blue/10 rounded-xl mb-4 group-hover:bg-accent-blue/20 transition-colors">
                  <IconChart className="w-9 h-9 text-accent-blue" />
                </div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent-blue to-accent-purple mb-2">
                  100M+
                </div>
                <div className="text-sm text-gray-400 font-medium">Registros/día</div>
                <div className="text-xs text-gray-600 mt-1">TimescaleDB</div>
              </div>

              {/* Métrica 3 */}
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-purple/10 rounded-xl mb-4 group-hover:bg-accent-purple/20 transition-colors">
                  <IconShield className="w-9 h-9 text-accent-purple" />
                </div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent-purple to-accent-orange mb-2">
                  99.9%
                </div>
                <div className="text-sm text-gray-400 font-medium">Uptime SLA</div>
                <div className="text-xs text-gray-600 mt-1">Última 30d</div>
              </div>

              {/* Métrica 4 */}
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-orange/10 rounded-xl mb-4 group-hover:bg-accent-orange/20 transition-colors">
                  <IconBolt className="w-9 h-9 text-accent-orange" />
                </div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent-orange to-accent-green mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-400 font-medium">Monitoreo activo</div>
                <div className="text-xs text-gray-600 mt-1">Health checks</div>
              </div>
            </div>

            {/* Stack tecnológico */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-background border border-gray-800 rounded-lg text-sm text-gray-400 font-mono">NestJS</span>
                <span className="px-4 py-2 bg-background border border-gray-800 rounded-lg text-sm text-gray-400 font-mono">Prisma ORM</span>
                <span className="px-4 py-2 bg-background border border-gray-800 rounded-lg text-sm text-gray-400 font-mono">TimescaleDB</span>
                <span className="px-4 py-2 bg-background border border-gray-800 rounded-lg text-sm text-gray-400 font-mono">EMQX Broker</span>
                <span className="px-4 py-2 bg-background border border-gray-800 rounded-lg text-sm text-gray-400 font-mono">Docker</span>
                <span className="px-4 py-2 bg-background border border-gray-800 rounded-lg text-sm text-gray-400 font-mono">React + Vite</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section Premium */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative overflow-hidden bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green p-1 rounded-2xl">
            <div className="bg-background rounded-xl p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Listo para desplegar tu infraestructura IoT?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Accede al dashboard y comienza a recibir telemetría de tus dispositivos ESP32 en menos de 5 minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl hover:shadow-lg hover:shadow-accent-purple/50 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    Acceder al Dashboard
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-surface hover:bg-surface-hover border border-gray-800 rounded-xl transition-all duration-300 hover:border-gray-700"
                >
                  Ver Documentación
                </a>
              </div>
            </div>
          </div>
        </div>

      {/* Footer Profesional */}
      <footer className="bg-surface border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Columna 1: Marca */}
            <div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple mb-3">
                SpaceNode
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Plataforma IoT de grado empresarial para monitoreo y telemetría de dispositivos embebidos.
              </p>
            </div>

            {/* Columna 2: Tecnología */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Stack</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>NestJS + TypeScript</li>
                <li>TimescaleDB + Prisma</li>
                <li>MQTT (EMQX)</li>
                <li>React + TailwindCSS</li>
              </ul>
            </div>

            {/* Columna 3: Legal */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Proyecto</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Arquitectura Modular</li>
                <li>Código Open Source</li>
                <li>Documentación Técnica</li>
                <li>Health Monitoring</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-600">
              © 2026 SpaceNode IoT Platform. Diseñado bajo protocolo LOGIA WATCHER.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicDashboard;

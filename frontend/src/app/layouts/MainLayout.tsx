import { Outlet } from 'react-router-dom';
import { LandingNavbar } from '@/widgets/landing-navbar';
import { Footer } from '@/widgets/footer';

/**
 * MainLayout - Layout principal de la aplicación
 * Incluye navbar fixed y footer al final del contenido
 * Estructura: Navbar (fixed) + Main (flex-grow) + Footer (static)
 */

export const MainLayout = () => {
  return (
    <div className="min-vh-100 bg-space-deep d-flex flex-column">
      {/* Navbar fijo en top */}
      <LandingNavbar />
      
      {/* Contenido principal con padding-top para compensar navbar fixed */}
      <main className="flex-grow-1" style={{ paddingTop: '64px' }}>
        <Outlet />
      </main>
      
      {/* Footer estático al final del contenido */}
      <Footer />
    </div>
  );
};

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
    <div className="min-h-screen bg-space-deep flex flex-col">
      {/* Navbar fijo en top */}
      <LandingNavbar />
      
      {/* Contenido principal con padding-top para compensar navbar fixed */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      
      {/* Footer estático al final del contenido */}
      <Footer />
    </div>
  );
};

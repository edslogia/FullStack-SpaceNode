import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-surface shadow-md border-b border-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-accent-blue hover:underline">
              SpaceNode
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              to="/"
              className={`text-sm font-medium px-3 py-2 rounded transition hover:bg-background hover:text-accent-blue ${location.pathname === "/" ? "text-accent-blue" : "text-gray-100"}`}
            >
              Dashboard público
            </Link>
            <Link
              to="/login"
              className={`text-sm font-medium px-3 py-2 rounded transition hover:bg-background hover:text-accent-purple ${location.pathname === "/login" ? "text-accent-purple" : "text-gray-100"}`}
            >
              Iniciar sesión
            </Link>
            {/* Aquí puedes agregar más enlaces según crezcas el sistema */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

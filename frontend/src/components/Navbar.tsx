import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const IconLogout: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            {!user && (
              <Link
                to="/"
                className={`text-sm font-medium px-3 py-2 rounded transition hover:bg-background hover:text-accent-blue ${location.pathname === "/" ? "text-accent-blue" : "text-gray-100"}`}
              >
                Dashboard público
              </Link>
            )}
            {user && user.role === 'ADMIN' && (
              <Link
                to="/dashboard-admin"
                className={`text-sm font-medium px-3 py-2 rounded transition hover:bg-background hover:text-accent-purple ${location.pathname === "/dashboard-admin" ? "text-accent-purple" : "text-gray-100"}`}
              >
                Dashboard Admin
              </Link>
            )}
            {user && user.role === 'OPERATOR' && (
              <Link
                to="/dashboard-operator"
                className={`text-sm font-medium px-3 py-2 rounded transition hover:bg-background hover:text-accent-purple ${location.pathname === "/dashboard-operator" ? "text-accent-purple" : "text-gray-100"}`}
              >
                Dashboard
              </Link>
            )}
            {!user && (
              <Link
                to="/login"
                className={`text-sm font-medium px-3 py-2 rounded transition hover:bg-background hover:text-accent-purple ${location.pathname === "/login" ? "text-accent-purple" : "text-gray-100"}`}
              >
                Iniciar sesión
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <IconLogout className="w-5 h-5 mr-2" />
                Salir
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * LandingNavbar Widget - Navbar translúcido con efecto glassmorphism
 * Fixed top, responsive, con transición en scroll
 */

export const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Activar glassmorphism después de 20px de scroll
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 h-16
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-space-cosmos/70 backdrop-blur-md border-b border-slate-600/20 shadow-glass' 
          : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-cta rounded-lg transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold text-slate-200 transition-colors group-hover:text-cyan-core">
            SpaceNode
          </span>
        </Link>

        {/* Navegación central (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#features" 
            className="text-slate-400 hover:text-cyan-core transition-colors duration-200 font-medium"
          >
            Características
          </a>
          <a 
            href="#pricing" 
            className="text-slate-400 hover:text-cyan-core transition-colors duration-200 font-medium"
          >
            Pricing
          </a>
        </div>

        {/* CTA Login */}
        <Link
          to="/login"
          className="
            px-6 py-2 rounded-lg font-semibold
            bg-gradient-cta text-space-deep
            hover:shadow-lg hover:shadow-cyan-core/30
            hover:scale-105
            transition-all duration-300
          "
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

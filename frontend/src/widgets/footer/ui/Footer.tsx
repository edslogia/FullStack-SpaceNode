/**
 * Footer Widget - Componente de pie de página global
 * Aparece solo al final del contenido, no es fixed
 */

export const Footer = () => {
  return (
    <footer className="bg-space-cosmos border-t border-slate-600/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2026 SpaceNode. Telemetría industrial para el futuro.
          </p>
          
          {/* Enlaces legales */}
          <div className="flex gap-6 text-sm">
            <a 
              href="/terminos" 
              className="text-slate-400 hover:text-cyan-core transition-colors duration-200"
            >
              Términos
            </a>
            <a 
              href="/privacidad" 
              className="text-slate-400 hover:text-cyan-core transition-colors duration-200"
            >
              Privacidad
            </a>
            <a 
              href="/contacto" 
              className="text-slate-400 hover:text-cyan-core transition-colors duration-200"
            >
              Contacto
            </a>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-4 text-center">
          <p className="text-slate-600 text-xs">
            Hecho con 🚀 para la industria IoT
          </p>
        </div>
      </div>
    </footer>
  );
};

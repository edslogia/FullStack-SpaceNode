/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta SpaceNode: Azul Espacial + Cian Técnico (Dark Mode First)
        space: {
          deep: '#0A0E27',      // Fondo principal, cielo nocturno
          nebula: '#141B3D',    // Fondo secundario, cards
          cosmos: '#050816',    // Navegación, footer
        },
        cyan: {
          core: '#00D9FF',      // CTAs, enlaces, iconos activos
        },
        electric: {
          blue: '#3B82F6',      // Botones secundarios, highlights
        },
        aurora: {
          mint: '#7DD3C0',      // Indicadores de éxito, datos en vivo
        },
        slate: {
          200: '#E2E8F0',       // Texto principal
          400: '#94A3B8',       // Texto secundario
          600: '#475569',       // Bordes, divisores
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0A0E27 0%, #141B3D 100%)',
        'gradient-cta': 'linear-gradient(90deg, #00D9FF 0%, #3B82F6 100%)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        glass: '0 10px 40px rgba(5, 8, 22, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
  ],
}
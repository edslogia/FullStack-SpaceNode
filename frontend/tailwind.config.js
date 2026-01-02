/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta optimizada: alto contraste, legibilidad WCAG AA, experiencia premium
        background: "#0a0a0a",
        surface: "#151515",
        'surface-hover': "#1f1f1f",
        accent: {
          green: "#10b981",    // Esmeralda vibrante (éxito, tiempo real)
          purple: "#8b5cf6",   // Violeta profesional (seguridad, premium)
          blue: "#3b82f6",     // Azul eléctrico (tecnología, confianza)
          orange: "#f59e0b",   // Ámbar (alertas, energía)
        },
        gray: {
          100: "#d4d4d4",
          200: "#bfbfbf",
          300: "#a6a6a6",
          400: "#808080",
          500: "#606060",
          600: "#404040",
          700: "#303030",
          800: "#222222",
          900: "#1a1a1a",
        },
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
}
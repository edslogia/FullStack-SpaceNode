/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en VSCode, predominando negro, gris, verde, morado y azul
        background: "#1e1e1e",
        surface: "#252526",
        accent: {
          green: "#4EC9B0",
          purple: "#C586C0",
          blue: "#569CD6",
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
  plugins: [
    require('@tailwindcss/forms'), 
  ],
}
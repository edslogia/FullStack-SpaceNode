/**
 * Constantes de configuración del layout global
 * Siguiendo arquitectura FSD (Feature-Sliced Design)
 */

export const LAYOUT_CONFIG = {
  /** Altura fija del navbar en píxeles */
  NAVBAR_HEIGHT: 64,
  
  /** Altura aproximada del footer en píxeles */
  FOOTER_HEIGHT: 80,
  
  /** Z-index de componentes globales */
  Z_INDEX: {
    NAVBAR: 50,
    MODAL: 60,
    DROPDOWN: 40,
    OVERLAY: 55,
  },
  
  /** Breakpoints responsivos (sync con Tailwind) */
  BREAKPOINTS: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
} as const;

/** Tipo derivado para TypeScript */
export type LayoutConfig = typeof LAYOUT_CONFIG;

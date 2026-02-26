/**
 * Sistema de cores e gradientes.
 *
 * Uso com styled-components (ThemeProvider no index.js):
 *   background-color: ${(props) => props.theme.colors.white};
 *   background: ${(props) => props.theme.gradients.hero};
 */

/** Cores sólidas do sistema */
export const colors = {
  // Base (originais)
  lilac: '#D7CDE8',
  black: '#000000',
  dark: '#0B0631',
  white: '#FFFFFF',
  // Tons de cinza
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
  // Cores de destaque
  primary: '#0B0631',
  secondary: '#D7CDE8',
  success: '#198754',
  warning: '#FFC107',
  danger: '#DC3545',
  info: '#0D6EFD',
  // Extras
  purple: '#6F42C1',
  indigo: '#6610F2',
  teal: '#20C997',
  orange: '#FD7E14',
};

/** Gradientes prontos (string para background) */
const LILAC_RGBA = 'rgba(215, 205, 232, 0.35)';
const DARK_RGBA = 'rgba(11, 6, 49, 0.2)';

export const gradients = {
  /** Vidro: lilac → dark (com blur no objeto glass) */
  glass: `linear-gradient(135deg, ${LILAC_RGBA} 0%, ${DARK_RGBA} 100%)`,
  /** Escuro → lilac */
  darkToLilac: 'linear-gradient(135deg, #0B0631 0%, #D7CDE8 100%)',
  /** Lilac → branco */
  lilacToWhite: 'linear-gradient(180deg, #D7CDE8 0%, #FFFFFF 100%)',
  /** Hero: escuro suave */
  hero: 'linear-gradient(135deg, #0B0631 0%, #1a0d5c 50%, #0B0631 100%)',
  /** Sutil: branco → cinza claro */
  subtle: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
  /** Card elevado */
  card: 'linear-gradient(145deg, #FFFFFF 0%, #E9ECEF 100%)',
  /** Sunset */
  sunset: 'linear-gradient(90deg, #0B0631 0%, #6F42C1 50%, #FD7E14 100%)',
  /** Oceano */
  ocean: 'linear-gradient(135deg, #0B0631 0%, #0D6EFD 50%, #20C997 100%)',
  /** Escuro uniforme */
  dark: 'linear-gradient(180deg, #0B0631 0%, #212529 100%)',
  /** Lilac suave */
  lilacSoft: 'linear-gradient(135deg, #D7CDE8 0%, #E9ECEF 100%)',
};

/** Efeito vidro: gradiente + blur (imagem atrás fica desbotada) */
export const glass = {
  background: gradients.glass,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

/** Tema para ThemeProvider (colors + gradients + glass) */
export const theme = {
  colors,
  gradients,
  glass,
};

/**
 * Painel com efeito vidro (blur). Coloque imagem ou conteúdo atrás; o blur desbota.
 */
export function GlassPanel({ children, style = {}, blur = 12, ...rest }) {
  const glassStyle = {
    ...glass,
    ...(blur !== 12 && {
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
    }),
    ...style,
  };
  return (
    <div style={glassStyle} {...rest}>
      {children}
    </div>
  );
}

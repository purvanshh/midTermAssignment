// Premium Dark theme with enhanced glassmorphism for City Pulse app

export const colors = {
  // Primary backgrounds with gradient support
  background: '#050508',
  backgroundSecondary: '#0D0D12',
  backgroundTertiary: '#151520',

  // Enhanced glass effect colors
  glass: 'rgba(255, 255, 255, 0.03)',
  glassMedium: 'rgba(255, 255, 255, 0.06)',
  glassStrong: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassHighlight: 'rgba(255, 255, 255, 0.15)',
  glassShadow: 'rgba(0, 0, 0, 0.5)',

  // Text colors with better contrast
  textPrimary: '#FFFFFF',
  textSecondary: '#B8B8C8',
  textMuted: '#6B6B7B',

  // Vibrant accent colors
  accent: '#8B5CF6', // Violet
  accentLight: '#A78BFA',
  accentDark: '#7C3AED',
  accentGlow: 'rgba(139, 92, 246, 0.3)',

  // Secondary accent (cyan)
  secondary: '#06B6D4',
  secondaryLight: '#22D3EE',
  secondaryGlow: 'rgba(6, 182, 212, 0.3)',

  // Status colors
  success: '#10B981',
  successGlow: 'rgba(16, 185, 129, 0.2)',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Alert severity colors with glows
  alertHigh: '#F43F5E',
  alertHighBg: 'rgba(244, 63, 94, 0.12)',
  alertHighGlow: 'rgba(244, 63, 94, 0.3)',
  alertMedium: '#FB923C',
  alertMediumBg: 'rgba(251, 146, 60, 0.12)',
  alertMediumGlow: 'rgba(251, 146, 60, 0.3)',
  alertLow: '#FACC15',
  alertLowBg: 'rgba(250, 204, 21, 0.12)',
  alertLowGlow: 'rgba(250, 204, 21, 0.3)',

  // Misc
  divider: 'rgba(255, 255, 255, 0.06)',
  cardBackground: 'rgba(20, 20, 30, 0.6)',
  overlay: 'rgba(0, 0, 0, 0.85)',

  // Gradient colors
  gradientStart: '#8B5CF6',
  gradientEnd: '#06B6D4',
};

export const gradients = {
  primary: ['#8B5CF6', '#6366F1', '#06B6D4'],
  accent: ['#A78BFA', '#8B5CF6'],
  dark: ['#0D0D12', '#050508'],
  card: ['rgba(30, 30, 45, 0.8)', 'rgba(20, 20, 30, 0.6)'],
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: colors.textMuted,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
  },
  glowCyan: {
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  inner: {
    shadowColor: 'rgba(255, 255, 255, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
};

export const glassStyle = {
  backgroundColor: colors.glass,
  borderWidth: 1,
  borderColor: colors.glassBorder,
  borderRadius: borderRadius.lg,
};

export const glassCardStyle = {
  backgroundColor: colors.cardBackground,
  borderWidth: 1,
  borderColor: colors.glassBorder,
  borderRadius: borderRadius.xl,
  ...shadows.md,
};

export const glassButtonStyle = {
  backgroundColor: colors.glassMedium,
  borderWidth: 1,
  borderColor: colors.glassHighlight,
  borderRadius: borderRadius.full,
};

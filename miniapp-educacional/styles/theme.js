export const colors = {
  primary: {
    main: "#6366F1",
    light: "#818CF8",
    dark: "#4F46E5",
    gradient: ["#6366F1", "#8B5CF6", "#A855F7"],
  },

  secondary: {
    main: "#EC4899",
    light: "#F472B6",
    dark: "#DB2777",
  },

  success: {
    main: "#10B981",
    light: "#34D399",
    dark: "#059669",
    bg: "#ECFDF5",
  },
  warning: {
    main: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
    bg: "#FFFBEB",
  },
  error: {
    main: "#EF4444",
    light: "#F87171",
    dark: "#DC2626",
    bg: "#FEF2F2",
  },

  background: {
    primary: "#0F0F23",
    secondary: "#1A1A2E",
    card: "#16213E",
    light: "#F8FAFC",
    gradient: ["#0F0F23", "#1A1A2E", "#16213E"],
  },

  text: {
    primary: "#F8FAFC",
    secondary: "#94A3B8",
    muted: "#64748B",
    dark: "#1E293B",
    accent: "#A5B4FC",
  },

  border: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.15)",
    glow: "rgba(99, 102, 241, 0.5)",
  },

  modules: {
    1: { main: "#6366F1", light: "#818CF8", gradient: ["#6366F1", "#8B5CF6"] },
    2: { main: "#EC4899", light: "#F472B6", gradient: ["#EC4899", "#F472B6"] },
    3: { main: "#10B981", light: "#34D399", gradient: ["#10B981", "#34D399"] },
    4: { main: "#F59E0B", light: "#FBBF24", gradient: ["#F59E0B", "#FBBF24"] },
    5: { main: "#8B5CF6", light: "#A78BFA", gradient: ["#8B5CF6", "#A78BFA"] },
  },
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
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  code: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 20,
  },
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: (color = colors.primary.main) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  }),
};

export const glassCard = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: borderRadius.lg,
  backdropFilter: "blur(10px)",
};

export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary.main,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: borderRadius.md,
    ...shadows.md,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary.main,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: borderRadius.md,
  },
  ghost: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: borderRadius.md,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  glassCard,
  buttonStyles,
};

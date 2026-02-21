// FemWell — Design System

export const COLORS = {
  white: "#FFFFFF",
  background: "#FFFBFC",
  rose: "#C4748A",
  roseDark: "#8B4E6B",
  roseMid: "#A85E7A",
  roseLight: "#F9EEF1",
  roseBorder: "#EDD8E0",
  lavender: "#A98CC4",
  lavenderLight: "#F3EDF9",
  lavenderBorder: "#E0D4F0",
  sage: "#6AAB7B",
  sageLight: "#EAF4EC",
  sageBorder: "#C8E6CF",
  peach: "#E8956D",
  peachLight: "#FDF0EA",
  peachBorder: "#F5CDB0",
  text: "#2D1A24",
  textMuted: "#9E7A8A",
  textLight: "#C9A8B8",
  border: "#EDD8E0",
  borderLight: "#F5EBF0",
  card: "#FFFFFF",
  divider: "#F0E4EA",
};

export const FONTS = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 22,
  xxl: 28,
  xxxl: 34,
};

export const RADIUS = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

export const SHADOW = {
  sm: {
    shadowColor: "#2D1A24",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: "#2D1A24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  rose: {
    shadowColor: "#8B4E6B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const TOTAL_STEPS = 8;

export const PHASE_CONFIG = {
  Menstrual: {
    label: "Menstrual",
    days: "Days 1–5",
    color: "#C4748A",
    light: "#F9EEF1",
    border: "#EDD8E0",
    energy: "Low",
    intensity: "60%",
    workoutFocus: "Gentle movement & rest",
    nutritionFocus: "Iron-rich, anti-inflammatory",
  },
  Follicular: {
    label: "Follicular",
    days: "Days 6–14",
    color: "#6AAB7B",
    light: "#EAF4EC",
    border: "#C8E6CF",
    energy: "High",
    intensity: "100%",
    workoutFocus: "Heavy lifting, HIIT, PRs",
    nutritionFocus: "Lean protein, complex carbs",
  },
  Ovulation: {
    label: "Ovulation",
    days: "Days 15–17",
    color: "#E8956D",
    light: "#FDF0EA",
    border: "#F5CDB0",
    energy: "Peak",
    intensity: "100%",
    workoutFocus: "Peak performance, max effort",
    nutritionFocus: "Fiber, antioxidants, hydration",
  },
  Luteal: {
    label: "Luteal",
    days: "Days 18–28",
    color: "#A98CC4",
    light: "#F3EDF9",
    border: "#E0D4F0",
    energy: "Moderate",
    intensity: "70%",
    workoutFocus: "Moderate intensity, stress relief",
    nutritionFocus: "Magnesium, B6, complex carbs",
  },
};
// src/theme/theme.ts

export const theme = {
  colors: {
    primary: "#4F7D5A",
    primaryDark: "#28543A",
    forest: "#1F4530",
    sage: "#86A98C",
    sageLight: "#DCE9D8",

    background: "#F5F8F1",
    card: "#FFFFFF",

    text: "#24352A",
    textMuted: "#6B7C70",

    accent: "#C98A5B",

    success: "#4F7D5A",
    warning: "#C9A45C",
    error: "#B95F55",
  },

  sidebar: {
    width: {
      collapsed: "72px",
      expanded: "256px",
    },

    transition: "300ms",
  },

  radius: {
    card: "24px",
    button: "12px",
    input: "12px",
  },
} as const;

export type Theme = typeof theme;

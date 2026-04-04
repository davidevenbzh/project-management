import { alpha, createTheme } from "@mui/material/styles";

export type ThemeMode = "dark" | "light";

const fontFamily = 'Inter, "Segoe UI", sans-serif';
const monoFontFamily = '"JetBrains Mono", "Fira Code", monospace';

/**
 * Creates the shared MUI theme used by the component library and Storybook.
 */
export const createAppTheme = (mode: ThemeMode) => {
  const isDark = mode === "dark";
  const colors = isDark
    ? {
        background: "#050816",
        surface: "#0b1226",
        surfaceRaised: "#111a34",
        border: "#1f2b54",
        text: "#f3f7ff",
        muted: "#93a4d1",
        primary: "#00f5a0",
        primaryContrast: "#04200f",
        secondary: "#38bdf8",
        danger: "#ff5c8a",
        warning: "#f59e0b",
      }
    : {
        background: "#f3f7ff",
        surface: "#ffffff",
        surfaceRaised: "#eef4ff",
        border: "#b7caf2",
        text: "#11203f",
        muted: "#5c6f96",
        primary: "#2563eb",
        primaryContrast: "#ffffff",
        secondary: "#ef4444",
        danger: "#dc2626",
        warning: "#f97316",
      };

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        contrastText: colors.primaryContrast,
      },
      secondary: {
        main: colors.secondary,
      },
      error: {
        main: colors.danger,
      },
      warning: {
        main: colors.warning,
      },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.text,
        secondary: colors.muted,
      },
      divider: colors.border,
    },
    shape: {
      borderRadius: 18,
    },
    typography: {
      fontFamily,
      button: {
        fontWeight: 700,
        letterSpacing: "0.03em",
        textTransform: "none",
      },
      subtitle2: {
        fontFamily: monoFontFamily,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      },
      overline: {
        fontFamily: monoFontFamily,
        fontWeight: 700,
        letterSpacing: "0.14em",
      },
      h1: {
        fontSize: "clamp(2.8rem, 6vw, 5rem)",
        fontWeight: 800,
      },
      h2: {
        fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
        fontWeight: 800,
      },
      h3: {
        fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
        fontWeight: 800,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            colorScheme: mode,
          },
          body: {
            backgroundColor: colors.background,
            color: colors.text,
            transition: "background-color 180ms ease, color 180ms ease",
          },
          "::selection": {
            backgroundColor: alpha(colors.primary, 0.32),
            color: colors.text,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: "1rem",
            minHeight: 44,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: 700,
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            padding: 10,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            borderBottomColor: colors.border,
            fontFamily: monoFontFamily,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          },
          body: {
            borderBottomColor: alpha(colors.border, 0.8),
          },
        },
      },
    },
  });
};

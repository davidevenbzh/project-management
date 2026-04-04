import Button, { type ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";



export type AppButtonTone = "primary" | "secondary" | "ghost" | "danger";

export type AppButtonProps = Omit<ButtonProps, "color" | "variant"> & {
  tone?: AppButtonTone;
  loading?: boolean;
};

const toneToVariant: Record<AppButtonTone, ButtonProps["variant"]> = {
  primary: "contained",
  secondary: "outlined",
  ghost: "text",
  danger: "contained",
};

/**
 * Renders the library button with the shared hacker-inspired styling.
 */
export function AppButton({
  children,
  className,
  disabled,
  loading = false,
  startIcon,
  tone = "primary",
  ...props
}: AppButtonProps) {
  return (
    <Button
      className={["pm-button", `pm-button--${tone}`, className]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || loading}
      startIcon={
        loading ? <CircularProgress color="inherit" size={16} /> : startIcon
      }
      variant={toneToVariant[tone]}
      {...props}
    >
      {children}
    </Button>
  );
}

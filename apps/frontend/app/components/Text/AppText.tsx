import Typography, { type TypographyProps } from "@mui/material/Typography";



export type AppTextTone = "default" | "muted" | "accent" | "success" | "danger";

export type AppTextProps = Omit<TypographyProps, "color"> & {
  mono?: boolean;
  tone?: AppTextTone;
};

/**
 * Displays body copy with library tone and typography options.
 */
export function AppText({
  className,
  mono = false,
  tone = "default",
  ...props
}: AppTextProps) {
  return (
    <Typography
      className={[
        "pm-text",
        `pm-text--${tone}`,
        mono ? "pm-text--mono" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

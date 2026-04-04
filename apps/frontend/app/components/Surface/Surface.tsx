import Paper, { type PaperProps } from "@mui/material/Paper";

import { AppText } from "../Text/AppText";
import { AppTitle } from "../Title/AppTitle";


export type SurfaceAccent = "primary" | "secondary" | "danger" | "neutral";

export type SurfaceProps = Omit<PaperProps, "title"> & {
  accent?: SurfaceAccent;
  actions?: React.ReactNode;
  description?: string;
  eyebrow?: string;
  padding?: "normal" | "dense";
  title?: string;
};

/**
 * Renders a reusable framed container for grouped content.
 */
export function Surface({
  accent = "neutral",
  actions,
  children,
  className,
  description,
  eyebrow,
  padding = "normal",
  title,
  ...props
}: SurfaceProps) {
  return (
    <Paper
      className={[
        "pm-surface",
        `pm-surface--${accent}`,
        padding === "dense" ? "pm-surface--dense" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {title || description || actions ? (
        <div className="pm-surface__header">
          <AppTitle kicker={eyebrow} subtitle={description} variant="h4">
            {title}
          </AppTitle>
          {actions}
        </div>
      ) : null}
      <div className="pm-surface__content">
        {children ?? (
          <AppText tone="muted" variant="body2">
            No content configured.
          </AppText>
        )}
      </div>
    </Paper>
  );
}

import Typography, { type TypographyProps } from '@mui/material/Typography';

import '../component-library.css';

export type AppTitleProps = {
  align?: TypographyProps['align'];
  children: React.ReactNode;
  className?: string;
  kicker?: string;
  subtitle?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
};

/**
 * Displays a heading with optional kicker and subtitle copy.
 */
export function AppTitle({
  align,
  children,
  className,
  kicker,
  subtitle,
  variant = 'h2',
}: AppTitleProps) {
  return (
    <div className={['pm-title', className].filter(Boolean).join(' ')}>
      {kicker ? <p className="pm-title__kicker">{kicker}</p> : null}
      <Typography align={align} className="pm-title__content" variant={variant}>
        {children}
      </Typography>
      {subtitle ? (
        <Typography align={align} className="pm-title__subtitle" variant="body1">
          {subtitle}
        </Typography>
      ) : null}
    </div>
  );
}
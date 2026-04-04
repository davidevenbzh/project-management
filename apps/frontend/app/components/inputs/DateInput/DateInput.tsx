import TextField, { type TextFieldProps } from '@mui/material/TextField';

import '../../component-library.css';

export type DateInputProps = Omit<TextFieldProps, 'helperText' | 'type' | 'variant'> & {
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
};

/**
 * Renders a styled date input suitable for lightweight scheduling flows.
 */
export function DateInput({ className, error, errorText, helperText, ...props }: DateInputProps) {
  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      className={['pm-field', className].filter(Boolean).join(' ')}
      error={error || Boolean(errorText)}
      helperText={errorText ?? helperText}
      type="date"
      variant="outlined"
      {...props}
    />
  );
}
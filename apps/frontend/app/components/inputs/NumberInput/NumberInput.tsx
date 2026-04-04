import TextField, { type TextFieldProps } from "@mui/material/TextField";



export type NumberInputProps = Omit<
  TextFieldProps,
  "helperText" | "type" | "variant"
> & {
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
};

/**
 * Renders a styled number input with the shared field chrome.
 */
export function NumberInput({
  className,
  error,
  errorText,
  helperText,
  ...props
}: NumberInputProps) {
  return (
    <TextField
      className={["pm-field", className].filter(Boolean).join(" ")}
      error={error || Boolean(errorText)}
      helperText={errorText ?? helperText}
      inputProps={{ inputMode: "numeric", ...(props.inputProps ?? {}) }}
      type="number"
      variant="outlined"
      {...props}
    />
  );
}

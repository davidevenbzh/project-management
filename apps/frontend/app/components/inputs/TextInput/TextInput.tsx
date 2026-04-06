import TextField, { type TextFieldProps } from "@mui/material/TextField";

export type TextInputProps = Omit<TextFieldProps, "helperText" | "type" | "variant"> & {
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
};

/**
 * Renders the library text input field.
 */
export function TextInput({ className, error, errorText, helperText, ...props }: TextInputProps) {
  return (
    <TextField
      className={["pm-field", className].filter(Boolean).join(" ")}
      error={error || Boolean(errorText)}
      helperText={errorText ?? helperText}
      type="text"
      variant="outlined"
      {...props}
    />
  );
}

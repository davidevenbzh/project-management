import TextField, { type TextFieldProps } from "@mui/material/TextField";

export type NumberInputProps = Omit<
  TextFieldProps,
  "helperText" | "inputProps" | "type" | "variant"
> & {
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
  htmlInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

/**
 * Renders a styled number input with the shared field chrome.
 */
export function NumberInput({
  className,
  error,
  errorText,
  htmlInputProps,
  helperText,
  slotProps,
  ...props
}: NumberInputProps) {
  const htmlInputSlotProps =
    slotProps?.htmlInput && typeof slotProps.htmlInput === "object" ? slotProps.htmlInput : {};

  return (
    <TextField
      {...props}
      className={["pm-field", className].filter(Boolean).join(" ")}
      error={error || Boolean(errorText)}
      helperText={errorText ?? helperText}
      slotProps={{
        ...slotProps,
        htmlInput: {
          ...htmlInputSlotProps,
          ...htmlInputProps,
          inputMode: "numeric",
        },
      }}
      type="number"
      variant="outlined"
    />
  );
}

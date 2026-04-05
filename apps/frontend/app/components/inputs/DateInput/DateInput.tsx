import TextField, { type TextFieldProps } from "@mui/material/TextField";

export type DateInputProps = Omit<TextFieldProps, "helperText" | "type" | "variant"> & {
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
};

/**
 * Renders a styled date input suitable for lightweight scheduling flows.
 */
export function DateInput({
  className,
  error,
  errorText,
  helperText,
  slotProps,
  ...props
}: DateInputProps) {
  const inputLabelSlotProps =
    slotProps?.inputLabel && typeof slotProps.inputLabel === "object" ? slotProps.inputLabel : {};

  return (
    <TextField
      {...props}
      className={["pm-field", className].filter(Boolean).join(" ")}
      error={error || Boolean(errorText)}
      helperText={errorText ?? helperText}
      slotProps={{
        ...slotProps,
        inputLabel: {
          ...inputLabelSlotProps,
          shrink: true,
        },
      }}
      type="date"
      variant="outlined"
    />
  );
}

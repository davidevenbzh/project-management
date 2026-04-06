import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

export type CheckboxFieldProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  description?: React.ReactNode;
  disabled?: boolean;
  errorText?: React.ReactNode;
  label: React.ReactNode;
  name?: string;
  onChange?: (checked: boolean) => void;
};

/**
 * Renders a styled checkbox field with optional helper copy.
 */
export function CheckboxField({
  checked,
  defaultChecked,
  description,
  disabled,
  errorText,
  label,
  name,
  onChange,
}: CheckboxFieldProps) {
  return (
    <FormControl className="pm-checkbox-field" error={Boolean(errorText)}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            name={name}
            onChange={(_, nextChecked) => onChange?.(nextChecked)}
          />
        }
        label={label}
      />
      {description ? <FormHelperText>{description}</FormHelperText> : null}
      {errorText ? <FormHelperText>{errorText}</FormHelperText> : null}
    </FormControl>
  );
}

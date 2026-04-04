import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import '../../component-library.css';

export type RadioGroupOption = {
  description?: string;
  label: string;
  value: string;
};

export type RadioGroupFieldProps = {
  defaultValue?: string;
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
  label: string;
  name: string;
  onChange?: (value: string) => void;
  options: RadioGroupOption[];
  row?: boolean;
  value?: string;
};

/**
 * Renders a styled radio group for compact option selection.
 */
export function RadioGroupField({
  defaultValue,
  errorText,
  helperText,
  label,
  name,
  onChange,
  options,
  row = false,
  value,
}: RadioGroupFieldProps) {
  return (
    <FormControl className="pm-radio-group" error={Boolean(errorText)}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        defaultValue={defaultValue}
        name={name}
        row={row}
        value={value}
        onChange={(_, nextValue) => onChange?.(nextValue)}
      >
        {options.map((option) => (
          <div className="pm-radio-group__option" key={option.value}>
            <FormControlLabel control={<Radio />} label={option.label} value={option.value} />
            {option.description ? <p className="pm-radio-group__hint">{option.description}</p> : null}
          </div>
        ))}
      </RadioGroup>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      {errorText ? <FormHelperText>{errorText}</FormHelperText> : null}
    </FormControl>
  );
}
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import '../../component-library.css';

export type AutocompleteOption = {
  description?: string;
  label: string;
  value: string;
};

export type AutocompleteInputProps = {
  defaultValue?: AutocompleteOption | null;
  disabled?: boolean;
  errorText?: React.ReactNode;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  label: string;
  loading?: boolean;
  noOptionsText?: string;
  onChange?: (value: AutocompleteOption | null) => void;
  options: AutocompleteOption[];
  placeholder?: string;
  value?: AutocompleteOption | null;
};

/**
 * Renders a styled autocomplete with local filtering and async-friendly states.
 */
export function AutocompleteInput({
  defaultValue,
  disabled,
  errorText,
  fullWidth = true,
  helperText,
  label,
  loading = false,
  noOptionsText = 'No matches found',
  onChange,
  options,
  placeholder,
  value,
}: AutocompleteInputProps) {
  return (
    <Autocomplete
      className="pm-autocomplete"
      defaultValue={defaultValue}
      disabled={disabled}
      fullWidth={fullWidth}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, selectedValue) => option.value === selectedValue.value}
      loading={loading}
      noOptionsText={noOptionsText}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          className="pm-field"
          error={Boolean(errorText)}
          helperText={errorText ?? helperText}
          label={label}
          placeholder={placeholder}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={18} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={(renderProps, option) => (
        <li {...renderProps} key={option.value}>
          <div className="pm-autocomplete__option">
            <span>{option.label}</span>
            {option.description ? <span className="pm-autocomplete__description">{option.description}</span> : null}
          </div>
        </li>
      )}
      slotProps={{
        paper: {
          className: 'pm-autocomplete__paper',
        },
      }}
      value={value}
      onChange={(_, nextValue) => onChange?.(nextValue)}
    />
  );
}
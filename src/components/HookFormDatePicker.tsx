import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useController, Path, Control, RegisterOptions } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import locale from "date-fns/locale/en-US";

if (locale && locale.options) {
  locale.options.weekStartsOn = 1;
}

type HookFormDatePickerProps<TFormValues> = TextFieldProps & {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  rules?: RegisterOptions;

};
export default function HookFormDatePicker<TFormValues>({ control, name, rules, ...props }: HookFormDatePickerProps<TFormValues>) {
  const { field: { onChange, onBlur, value, name: fieldName },
    fieldState: { error } } = useController<TFormValues>({ control, name, rules });

  return(
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={locale}
    >
      <DatePicker
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} {...props}
            variant="standard"
            onBlur={onBlur}
            error={!!error}
            helperText={error && error.message}
            label={props.label ? props.label : fieldName}
          />
        )}
      />
    </LocalizationProvider>
  );
}


import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useController, Path, Control, RegisterOptions } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type HookFormTimePickerProps<TFormValues> = TextFieldProps & {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  rules?: RegisterOptions;

};

export default function HookFormTimePicker<TFormValues>({ control, name, rules, ...props }: HookFormTimePickerProps<TFormValues>) {
  const { field: { onChange, onBlur, value, name: fieldName },
    fieldState: { error } } = useController<TFormValues>({ control, name, rules });


  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        ampm={false}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            variant={"standard"}
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

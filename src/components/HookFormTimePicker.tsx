import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { useController, Path, Control, PathValue, RegisterOptions } from "react-hook-form";
import { parse } from "date-fns";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type HookFormTimePickerProps<TFormValues> = TextFieldProps & {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  rules?: RegisterOptions;

};

export default function HookFormTimePicker<TFormValues>({ control, name, rules, ...props }: HookFormTimePickerProps<TFormValues>) {
  const { field: { onChange, value, name: fieldName },
    fieldState: { error } } = useController<TFormValues>({ control, name, rules });
  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopTimePicker
        ampm={false}
        openTo="hours"
        views={["hours", "minutes"]}
        inputFormat="HH:mm"
        mask="__:__"
        value={value}
        onChange={(newValue, keyboardInput) => {
          if(keyboardInput){
            if(keyboardInput.length === 5){
              onChange(parse(keyboardInput, "HH:mm", new Date()));
            }
          }
          if(newValue && !keyboardInput){
            onChange(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            variant={"standard"}
            sx={{ width: 200 }}
            helperText={error && error.message}
            error={!!(error)}
            label={props.label ? props.label : fieldName}
          />
        )}
      />
    </LocalizationProvider>
  );
}
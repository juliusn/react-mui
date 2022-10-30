import React from "react";
import { Path, Control, RegisterOptions, useController } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type HookFormFieldProps<TFormValues> = TextFieldProps & {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
}
function HookFormField<TFormValues>({ control, name, rules, ...props }: HookFormFieldProps<TFormValues> ) {
  const { field: { onChange, onBlur, name: fieldName, value },
    fieldState: { error } } = useController<TFormValues>({ control, name, rules });
  const isError = !!(error);
  return(
    <TextField
      variant="standard"
      sx={{ maxWidth: 200 }}
      { ...props }
      onChange={(e) => {
        if(props.type=== "number"){
          onChange(parseInt(e.target.value));
        }else{
          onChange(e);
        }
      }}
      onBlur={onBlur}
      value={value}
      label={props.label? props.label: fieldName}
      error={isError}
      helperText={isError && error.message}
    />
  );
}

export default HookFormField;

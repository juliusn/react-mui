import React from "react";
import TextField,{ TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

type FormikFieldProps = Omit<TextFieldProps, "name"> & {
  name: string
};

function FormikField ({ name, label, onChange, ...rest } : FormikFieldProps) {
  const [ field , meta, ] = useField(name);
  const { error } = meta;
  const initialOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    if(onChange) onChange(e);
    field.onChange(e);
  };
  return (
    <TextField
      {...field}
      onChange={initialOnChange}
      {...rest}
      fullWidth
      error={meta.touched && !!error }
      helperText={meta.touched && error}
      label={label}
    />
  );
}

export default FormikField;

import React from "react";
import TextField,{ TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

type FormikFieldProps = Omit<TextFieldProps, "name"> & {
  name: string
};

function FormikField ({ name, label, ...rest } : FormikFieldProps) {
  const [ field , meta, ] = useField(name);
  const { error } = meta;
  return (
    <TextField
      {...field}
      {...rest}
      fullWidth
      error={meta.touched && !!error }
      helperText={meta.touched && error}
      label={label}
    />
  );
}

export default FormikField;

import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const TextInput = (props) => {
  return (
    <Controller
      {...props}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={props.label}
          error={!!error}
          helperText={error ? error.message : null}
          required
          fullWidth
        />
      )}
    />
  );
};

export default TextInput;

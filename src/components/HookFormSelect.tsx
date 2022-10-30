import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { Path, Control, RegisterOptions, useController } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";


type ReactHookSelectMultipleI<TFormValues> = SelectProps & {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  children: React.ReactNode;
}
export default function MultipleSelectCheckmarks<TFormValues>({
  control,
  name,
  rules,
  label,
  children,
} : ReactHookSelectMultipleI<TFormValues>) {
  const { field: { onChange, value },
    fieldState: { error } } = useController<TFormValues>({ control, name, rules });

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        value={value}
        onChange={onChange}
        variant="standard"
        error={!!error}
      >
        { children }
      </Select>
      {
        !!error &&
        <FormHelperText sx={{ color: "red" }} >{error.message}</FormHelperText>
      }
    </FormControl>
  );
}


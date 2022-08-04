import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { parse } from "date-fns";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { OrderTemplate } from "../../../Types";
import { UseFormSetValue } from "react-hook-form";
import { OrderFormValues } from "./CreateNewOrderForm";

interface TemplateSelectionProps{
  templates: OrderTemplate[]
  setValue: UseFormSetValue<OrderFormValues>;
}

export default function TemplateSelection({ templates, setValue }:TemplateSelectionProps) {
  const [ template, setTemplate ] = useState<OrderTemplate|null>();
  const filterOptions = createFilterOptions({
    stringify: (option: OrderTemplate) => `${option.ship} ${option.time} ${option.port}`,
  });

  useEffect( () => {
    setValue("ship", template?.ship ? template.ship:"");
    setValue("time", template?.time ? parse(template?.time, "HH:mm", new Date()):new Date());
    setValue("port", template?.port ? template.port:"");
    setValue("dock", template?.dock ? template.dock:"");
    setValue("event", template?.event ? template.event:"");
    setValue("services", template?.services ? template.services:[]);
  }, [template, setValue]);

  return (
    <Autocomplete
      filterOptions={filterOptions}
      sx={{ maxWidth: 200 }}

      options={templates}
      onChange={(e,value) => setTemplate(value)}
      groupBy={(option: OrderTemplate) => option.port}
      getOptionLabel={(option: OrderTemplate) => `${option.ship} ${option.time}`}
      renderInput={(params) => <TextField variant="standard" {...params} label="Templates" />}
    />
  );
}

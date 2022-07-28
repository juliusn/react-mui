import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { OrderTemplateValues, OrderTemplate } from "../../Types";
import { isWeekend } from "date-fns";

interface TemplateSelectionProps {
  templates: OrderTemplateValues
  date: Date

}
export default function TemplateSelection({ templates, date }:TemplateSelectionProps) {
  const [ orderTemplates, setOrderTempaltes ] = useState<OrderTemplate[]>([]);

  useEffect(() => {
    if(!isWeekend(date)){
      setOrderTempaltes(templates.business_day);
    }else {
      setOrderTempaltes([]);
    }
  },[date, templates.business_day]);

  const options = orderTemplates?.map(({ ship, dateBegin, port }: OrderTemplate) => {
    return {
      ship,
      dateBegin,
      port
    };
  });
  const filterOptions = createFilterOptions({
    stringify: (option: OrderTemplate) => `${option.ship} ${option.dateBegin} ${option.port}`,
  });
  return (
    <Autocomplete
      id="grouped-demo"
      filterOptions={filterOptions}
      options={options.sort((a, b) => -b.port.localeCompare(a.port))}
      groupBy={(option) => option.port}
      getOptionLabel={(option) => `${option.ship} ${option.dateBegin}`}
      renderInput={(params) => <TextField variant="standard" {...params} label="Templates" />}
    />
  );
}

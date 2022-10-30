import React, { useState, forwardRef, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { TemplateDayOfWeek, ServiceI, OrderTemplateI, Services } from "Types";
import { useForm, useFieldArray, UseFormSetValue, Control, useWatch } from "react-hook-form";
import { OrderFormValues } from "./OrderByEventForm";
import Dialog from "@mui/material/Dialog";
import { parse, format } from "date-fns";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import { onPromise } from "utils/utils";
import HookFormField from "components/HookFormField";
import HookFormSelect from "components/HookFormSelect";
import Grid from "@mui/material/Grid";
import HookFormTimePicker from "components/HookFormTimePicker";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useModifyStorage } from "hooks/useStorage";

interface TemplateSelectProps{
  control: Control<OrderFormValues>;
  setValue: UseFormSetValue<OrderFormValues>;
  ref: React.Ref<HTMLInputElement | null>;
  label?: string;
}
type TestTemplate = OrderTemplateI & {
  inputValue?: string;
}

const TemplateSelect = forwardRef(({ control, setValue, label }:TemplateSelectProps, ref) => {
  const [ template, setTemplate ] = useState<TestTemplate|null>(null);
  const [open, toggleOpen] = useState(false);
  const [ templates, setTemplates ] = useState<TestTemplate[]>([]);
  const date = useWatch({ control, name: "date" });
  const { getOrderTemplates, postOrderTemplate } = useModifyStorage();
  const handleClose = () => {
    toggleOpen(false);
  };
  const handleSubmit = (order: initialValuesI) => {
    postOrderTemplate(order)
      .then(r => setTemplates(t => t.concat(r)))
      .catch(e => console.log(e));
    handleClose();
  };

  useEffect(() => {
    getOrderTemplates(date)
      .then(r => setTemplates(r))
      .catch(e => console.log(e));
  }, [date, getOrderTemplates]);

  const filterOptions = createFilterOptions({
    stringify: (option: TestTemplate) => `tämä ${option.ship} ${format(option.time, "HH:mm")} ${option.port}`,
  });

  useEffect( () => {
    setValue("ship", template?.ship ? template.ship:"", { shouldDirty: true });
    setValue("time", template?.time ? template.time:new Date()), { shouldDirty: true };
    setValue("port", template?.port ? template.port:""), { shouldDirty: true };
    setValue("dock", template?.dock ? template.dock:""), { shouldDirty: true };
    setValue("event", template?.event ? template.event:"", { shouldDirty: true });
    setValue("services", template?.services ? template.services:[], { shouldDirty: true });
  }, [template, setValue]);

  return (
    <>
      <Autocomplete
        value={template}
        filterOptions={(options, params) => {
          const filtered = filterOptions(options, params);
          filtered.push({
            inputValue: params.inputValue,
            ship: "Lisää template",
            time: new Date(),
            port: "",
            dock: "",
            event: "",
            services: [],
            dayOfWeek: "",
          });
          return filtered;
        }}
        sx={{ maxWidth: 200 }}
        options={templates}
        selectOnFocus
        isOptionEqualToValue={(option, value ) => option.ship === value.ship && format(option.time, "HH:mm") === format(value.time, "HH:mm")}
        onChange={(e, newValue) => {
          console.log(newValue);
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog"s form.
            setTimeout(() => {
              toggleOpen(true);
            });
          } else if (newValue && (newValue.inputValue || newValue.ship === "Lisää template")){
            toggleOpen(true);
          }else {
            setTemplate(newValue);
          }
        }}
        groupBy={(option: TestTemplate) => option.port}
        getOptionLabel={(option: TestTemplate) => {
          if(option.ship.includes("Lisää")) return (option.ship);
          return(`${option.ship} ${format(option.time, "HH:mm")}`);
        }}
        renderInput={(params) => <TextField label={label? label: "Templates"} variant="standard" {...params} inputRef={ref} />}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography>Luo alustapahtuma template</Typography>
        </DialogTitle>
        <DialogContent>
          <CreateTemplateForm submit={handleSubmit}/>
        </DialogContent>
      </Dialog>
    </>
  );
});
interface initialValuesI {
  services: ServiceI[],
  ship: string,
  time: Date,
  port: string,
  dock?: string,
  event?: string,
  dayOfWeek: string,
}
const initialValues : initialValuesI = {
  ship: "",
  services:[{ persons: 1, readiness:15, service:"", place:"" }],
  time: new Date(),
  port: "",
  dock: "",
  event: "",
  dayOfWeek: "",
};
const schema = z.object({
  ship: z.string().min(1),
  port: z.string().min(1),
  time: z.date(),
  dock: z.string(),
  event: z.string().min(1),
  services: z.array(z.object({
    readiness: z.number().min(15),
    service: z.string().min(1),
    place: z.string().min(1),
    persons: z.number(),
  })).min(1),
  dayOfWeek: z.string().min(1),
});
interface CreateTemplateFormI {
  submit: (data: initialValuesI) => void,
  defaultValues?: Services,
}
const CreateTemplateForm = ({
  submit,
}:CreateTemplateFormI) => {

  const { formState: { isDirty }, control, handleSubmit, watch } = useForm<initialValuesI>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  const services = watch("services");

  useEffect(() => console.log(services), [services]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });
  const onSubmit = (data: initialValuesI) => {
    submit(data);
  };
  return (
    <>
      <Grid columns={12} spacing={4} container>
        <Grid item xs={6}>
          <HookFormField<initialValuesI>
            control={control}
            name="ship"
            required
            label="Laiva"
          />
        </Grid>
        <Grid item xs={6}>
          <HookFormTimePicker<initialValuesI>
            control={control}
            name="time"
            required
            label="Aika"
          />

        </Grid>
        <Grid item xs={6}>
          <HookFormField<initialValuesI>
            control={control}
            name="port"
            required
            label="Satama"
          />
        </Grid>
        <Grid item xs={6}>
          <HookFormField<initialValuesI>
            control={control}
            name="dock"
            required
            label="Laituri"
          />
        </Grid>
        <Grid item xs={6}>
          <HookFormField<initialValuesI>
            control={control}
            required
            name="event"
            label="Tapahtuma"
          />
        </Grid>
        <Grid item xs={6}>
          <HookFormSelect
            label="Viikonpäivät"
            name="dayOfWeek"
            control={control}
          >
            <MenuItem value={TemplateDayOfWeek.workday}>Arkipäivä</MenuItem>
            <MenuItem value={TemplateDayOfWeek.friday}>Perjantai</MenuItem>
            <MenuItem value={TemplateDayOfWeek.saturday}>Lauantai</MenuItem>
            <MenuItem value={TemplateDayOfWeek.sunday}>Sunnuntai</MenuItem>
          </HookFormSelect>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Palvelut</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button startIcon={<AddCircleOutlineIcon />} onClick={() => append({ service: "", place: "", persons: 1, readiness: 15 })}/>
        </Grid>
        { fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <Grid item xs={3}>
              <HookFormField<initialValuesI>
                control={control}
                required
                key={`services:${index}:service`}
                name={`services.${index}.service`}
                label="Tapahtuma"
              />
            </Grid>
            <Grid item xs={3}>
              <HookFormField<initialValuesI>
                control={control}
                required
                key={`services:${index}:place`}
                name={`services.${index}.place`}
                label="Paikka"
              />
            </Grid>
            <Grid item xs={2}>
              <HookFormField<initialValuesI>
                control={control}
                required
                name={`services.${index}.persons`}
                label="Määrä"
                type="number"
                sx={{ maxWidth: 70 }}
              />
            </Grid>
            <Grid item xs={2}>
              <HookFormField<initialValuesI>
                control={control}
                required
                name={`services.${index}.readiness`}
                label="Valmius"
                type="number"
                sx={{ maxWidth: 70 }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => remove(index)} endIcon={<DeleteIcon />} />
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Button disabled={!isDirty} onClick={onPromise(handleSubmit(onSubmit))}>submit</Button>
        </Grid>
      </Grid>
    </>
  );
};
TemplateSelect.displayName = "TemplateSelect";
export default TemplateSelect;

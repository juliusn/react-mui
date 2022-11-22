import React, { useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";
import { getHours, getMinutes, setHours, setMinutes, startOfToday } from "date-fns";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { OrderByEventI, NewOrderByEventI, ServiceI, OrderFormEventI } from "Types";
import { useFieldArray, useForm, Control } from "react-hook-form";
import HookFormField from "components/HookFormField";
import TemplateSelect from "./TemplateSelect";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import HookFormDatePicker from "components/HookFormDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { onPromise } from "utils/utils";
import HookFormTimePicker from "components/HookFormTimePicker";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";


export interface OrderFormValues  {
  date: Date,
  services: ServiceI[],
  ship: string,
  time: Date,
  port: string,
  dock?: string,
  description?: string,
  event?: string,
}
const initialValues: OrderFormValues = {
  date: new Date(),
  ship: "",
  services:[{ persons: 1, readiness: 15, service: "", place: "" }],
  time: new Date(),
  port: "",
  dock: "",
  description: "",
  event: "",
};
export const schema = yup.object({
  date: yup.date().min(startOfToday(), "Date must not be in past"),
  ship: yup.string().required("Ship is required"),
  port: yup.string().required("Port is required"),
  time: yup.date().required().typeError("Kenttä on pakollinen"),
  dock: yup.string().required("Dock is required"),
  description: yup.string(),
  event: yup.string().required("event is required"),
});

interface OrderFormByEventI {
  title: string,
  titleComponent?: React.ReactNode,
  actionComponent?: React.ReactNode,
  template?: boolean,
  submit: (order: OrderFormEventI) => void,
  order?: OrderByEventI | NewOrderByEventI,
  buttonTitle: string,
}
function parseToInitialValues(order: OrderByEventI|NewOrderByEventI):OrderFormValues {
  return { ...order, date: new Date(order.dateBegin), time: new Date(order.dateBegin) };
}
const OrderFormByEvent = ({ buttonTitle, actionComponent, titleComponent, title, template, submit, order }: OrderFormByEventI) => {
  const ref = useRef<HTMLInputElement|null>(null);
  const { reset, formState: { isDirty }, setValue, control, handleSubmit } = useForm<OrderFormValues>({
    defaultValues:  order ? parseToInitialValues(order) : initialValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const onSubmit = ({ date, time, ...rest }: OrderFormValues) => {
    let initialDateTime = new Date(date);
    const hours = getHours(time);
    const minutes = getMinutes(time);
    initialDateTime = setHours(initialDateTime, hours);
    initialDateTime = setMinutes(initialDateTime, minutes );
    const initialOrder = { ...rest, dateBegin:initialDateTime, client:"SFPS", type: "event" } as const;
    if( order) {
      submit({ ...initialOrder, id: order.id });
    }else {
      submit({ ...initialOrder, id: uuidv4() });
    }
    reset({ ...initialValues, date });
    if(ref.current && template){
      ref.current.focus();
      ref.current.select();
    }
  };

  return(
    <>
      <Grid container>
        <Grid item xs={6}>
          <Box sx={{ display:"flex", justifyContent:"space-between" }}>
            <Typography variant="h5">{title}</Typography>
          </Box>
        </Grid>
        { template &&
        <Grid item xs={6}>
          <TemplateSelect
            setValue={setValue}
            control={control}
            ref={ref}
            label="Valmis tilaus"
          />
        </Grid>
        }
        { titleComponent &&
        <Grid item xs={6}>
          {titleComponent}
        </Grid>
        }
      </Grid>
      <Divider sx={{ margin: 2 }} />
      <OrderByEventForm
        control={control}
      />
      <Box sx={{ display: "flex", justifyContent: ( actionComponent ? "space-between" : "flex-end" ), marginTop: 4, marginBottom: 4 }}>
        { actionComponent }
        <Button disabled={!isDirty} endIcon={<EditIcon />} variant="outlined" onClick={onPromise(handleSubmit(onSubmit))}>{buttonTitle}</Button>
      </Box>
    </>
  );
};
interface OrderByEventFormI {
  control: Control<OrderFormValues>,
}
const OrderByEventForm = ({ control } : OrderByEventFormI ) => {

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  return(
    <>
      <form>
        <Grid columns={12} spacing={4} container>
          <Grid item xs={6}>
            <HookFormDatePicker<OrderFormValues>
              control={control}
              name="date"
              label="Päivämäärä"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="ship"
              required
              label="Laiva"
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormTimePicker<OrderFormValues>
              control={control}
              name="time"
              required
              label="Aika"
            />

          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="port"
              required
              label="Satama"
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="dock"
              required
              label="Laituri"
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              required
              name="event"
              label="Tapahtuma"
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="description"
              label="Lisätietoja"
              multiline
              maxRows={9}
            />
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
                <HookFormField<OrderFormValues>
                  control={control}
                  required
                  key={`services:${index}:service`}
                  name={`services.${index}.service`}
                  label="Tapahtuma"
                />
              </Grid>
              <Grid item xs={3}>
                <HookFormField<OrderFormValues>
                  control={control}
                  required
                  key={`services:${index}:place`}
                  name={`services.${index}.place`}
                  label="Paikka"
                />
              </Grid>
              <Grid item xs={2}>
                <HookFormField<OrderFormValues>
                  control={control}
                  required
                  name={`services.${index}.persons`}
                  label="Määrä"
                  type="number"
                  sx={{ maxWidth: 70 }}
                />
              </Grid>
              <Grid item xs={2}>
                <HookFormField<OrderFormValues>
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
        </Grid>
      </form>
    </>
  );
};

export default OrderFormByEvent;
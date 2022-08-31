import { Order, NewOrder, NewOrderByHourlyWork, OrderByHourlyWork } from "Types";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { getHours, getMinutes, setHours, setMinutes, startOfToday } from "date-fns";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import HookFormField from "components/HookFormField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import HookFormDatePicker from "components/HookFormDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { onPromise } from "utils/utils";
import HookFormTimePicker from "components/HookFormTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


export interface OrderFormValues  {
  date: Date,
  time: Date,
  port: string,
  description?: string,
  duration: number,
  persons: number,
}
const initialValues: OrderFormValues = {
  date: new Date(),
  duration: 4,
  time: new Date(),
  port: "Vuosaari",
  description: "",
  persons: 1,
};
export const schema = yup.object({
  date: yup.date().min(startOfToday(), "Date must not be in past"),
  duration: yup.number().required("Duration is required"),
  port: yup.string().required("Port is required"),
  time: yup.date().required().typeError("Kenttä on pakollinen"),
  description: yup.string(),
});

interface ModifyNewOrderI {
  order: NewOrderByHourlyWork|OrderByHourlyWork,
  goBack: () => void,
  update: (order: NewOrder|Order) => void,
  deleteOrder: (id: string) => void,
}

const ModifyHourlyWorkOrder = ({ order, goBack, update, deleteOrder }: ModifyNewOrderI) => {
  const { setValue, control, handleSubmit } = useForm<OrderFormValues>({
    defaultValues:  initialValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  useEffect( () => {
    setValue("date", order.dateTime);
    setValue("time", order.dateTime);
    setValue("duration", order.duration);
    setValue("persons", order.persons);
    setValue("port", order.port);
  }, [order, setValue]);
  const onSubmit = ({ date, time, ...rest }: OrderFormValues) => {
    let initialDateTime = new Date(date);
    const hours = getHours(time);
    const minutes = getMinutes(time);
    initialDateTime = setHours(initialDateTime, hours);
    initialDateTime = setMinutes(initialDateTime, minutes );
    update({ id:order.id, ...rest, dateTime:initialDateTime, from:"SPFS", type:"hourwork" });
    goBack();
  };
  const handleDelete = () => {
    deleteOrder(order.id);
    goBack();
  };
  return(
    <>
      <Typography sx={{ textAlign: "center" }} variant="h5">Muokkaa tuntityötilausta</Typography>
      <Divider sx={{ margin: 2 }} />
      <form>
        <Grid columns={12} spacing={4} container>
          <Grid item xs={6}>
            <HookFormDatePicker<OrderFormValues>
              control={control}
              name="date"
              required
            />
          </Grid >
          <Grid item xs={6}>
            <HookFormTimePicker<OrderFormValues>
              control={control}
              name="time"
              required
            />

          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="duration"
              required
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="persons"
              type="number"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="port"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="description"
              multiline
              maxRows={9}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </form>
      <Box sx={{ display: "flex", justifyContent:"space-between", marginTop: 4, marginBottom: 4 }}>
        <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => goBack()}>Palaa muuttamatta</Button>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>Poista tilaus</Button>
        <Button variant="outlined" startIcon={<EditIcon />} onClick={onPromise(handleSubmit(onSubmit))}>Tallenna muutokset</Button>
      </Box>
    </>
  );
};

export default ModifyHourlyWorkOrder;

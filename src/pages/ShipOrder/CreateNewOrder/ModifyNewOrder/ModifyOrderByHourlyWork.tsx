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
    setValue("date", order.dateBegin);
    setValue("time", order.dateBegin);
    setValue("duration", order.duration);
    setValue("persons", order.persons);
    setValue("port", order.port);
    setValue("description", order.description);
  }, [order, setValue]);
  const onSubmit = ({ date, time, ...rest }: OrderFormValues) => {
    let initialDateTime = new Date(date);
    const hours = getHours(time);
    const minutes = getMinutes(time);
    initialDateTime = setHours(initialDateTime, hours);
    initialDateTime = setMinutes(initialDateTime, minutes );
    update({ id:order.id, ...rest, dateBegin:initialDateTime, client:"SFPS", type:"hourwork" });
    goBack();
  };
  const handleDelete = () => {
    deleteOrder(order.id);
    goBack();
  };
  return(
    <>
      <Box display="flex" justifyContent= "space-between">
        <Typography sx={{ textAlign: "center" }} variant="h5">Muokkaa tuntityötilausta</Typography>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>Poista</Button>
      </Box>
      <Divider sx={{ margin: 2 }} />
      <form>
        <Grid columns={12} spacing={4} container>
          <Grid item md={6} lg={4}>
            <HookFormDatePicker<OrderFormValues>
              control={control}
              name="date"
              label="Päivämäärä"
              required
            />
          </Grid >
          <Grid item md={6} lg={4}>
            <HookFormTimePicker<OrderFormValues>
              control={control}
              name="time"
              required
              label="Aika"
            />

          </Grid>
          <Grid item md={6} lg={4}>
            <HookFormField<OrderFormValues>
              control={control}
              name="duration"
              label="Kesto"
              required
              type="number"
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <HookFormField<OrderFormValues>
              control={control}
              name="persons"
              label="Henkilömäärä"
              type="number"
              required
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <HookFormField<OrderFormValues>
              control={control}
              name="port"
              label="Satama"
              required
            />
          </Grid>
          <Grid item md={6} lg={4}>
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
        </Grid>
      </form>
      <Box sx={{ display: "flex", justifyContent:"space-between", marginTop: 4, marginBottom: 4 }}>
        <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => goBack()}>Palaa</Button>
        <Button variant="outlined" startIcon={<EditIcon />} onClick={onPromise(handleSubmit(onSubmit))}>Tallenna</Button>
      </Box>
    </>
  );
};

export default ModifyHourlyWorkOrder;

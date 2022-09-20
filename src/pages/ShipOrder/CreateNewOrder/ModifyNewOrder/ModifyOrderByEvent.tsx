import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { useForm } from "react-hook-form";
import HookFormField from "components/HookFormField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HookFormDatePicker from "components/HookFormDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import Services from "../CreateNewOrder/OrdersByEvents/InitialServices";
import { onPromise } from "utils/utils";
import HookFormTimePicker from "components/HookFormTimePicker";
import { OrderFormValues, schema } from "../CreateNewOrder/OrdersByEvents";
import { NewOrderByEvent, Order, NewOrder } from "Types";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


interface ModifyNewOrderI {
  order: NewOrderByEvent,
  goBack: () => void,
  update: (order: NewOrder|Order) => void,
  deleteOrder: (id: string) => void,
}

const ModifyNewOrder = ({ update, deleteOrder, order, goBack }:ModifyNewOrderI) => {
  const { setValue, control, handleSubmit } = useForm<OrderFormValues>({
    defaultValues: order,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  useEffect( () => {
    //setup inputs
    setValue("services", order.services? order.services : []);
    setValue("date", order.dateBegin);
    setValue("time", order.dateBegin);
    setValue("description", order.description);
    setValue("dock", order.dock);
    setValue("port", order.port);
    setValue("ship", order.ship);
    setValue("event", order.event);
  },[setValue, order]);

  const onSubmit = ({ date, time, ...rest }: OrderFormValues) => {
    let initialDateTime = new Date(date);
    const hours = getHours(time);
    const minutes = getMinutes(time);
    initialDateTime = setHours(initialDateTime, hours);
    initialDateTime = setMinutes(initialDateTime, minutes );
    if(!order) throw new Error("id is null");
    update({ id:order.id, ...rest, dateBegin:initialDateTime, client:"SFPS", type: "event" });
    goBack();
  };
  const handleDelete = () => {
    deleteOrder(order.id);
    goBack();
  };
  return(
    <>
      <form>
        <Box display="flex" justifyContent= "space-between">
          <Typography sx={{ textAlign: "center" }} variant="h5">Muokkaa tilausta</Typography>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>Poista</Button>
        </Box>
        <Divider sx={{ margin: 2 }} />
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
            <HookFormField<OrderFormValues>
              control={control}
              name="ship"
              label="Laiva"
              required
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <HookFormTimePicker<OrderFormValues>
              control={control}
              name="time"
              label="Aika"
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
              name="dock"
              label="Laituri"
              required
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <HookFormField<OrderFormValues>
              control={control}
              required
              label="Tapahtuma"
              name="event"
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <HookFormField<OrderFormValues>
              control={control}
              name="description"
              multiline
              label="Lisätietoja"
              maxRows={9}
            />
          </Grid>
          <Grid item md={12}>
            <Divider />
          </Grid>
        </Grid>
      </form>
      <form>
        <Services control={control} />
      </form>
      <Box sx={{ marginTop: 4, marginBottom: 4 }} display="flex" justifyContent= "space-between">
        <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => goBack()}>Palaa</Button>
        <Button variant="outlined" startIcon={<EditIcon />} onClick={onPromise(handleSubmit(onSubmit))}>Tallenna</Button>
      </Box>
    </>
  );
};

export default ModifyNewOrder;

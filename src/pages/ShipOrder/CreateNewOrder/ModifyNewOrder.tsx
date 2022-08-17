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
import Services from "./Services";
import { onPromise } from "utils/utils";
import HookFormTimePicker from "components/HookFormTimePicker";
import useOrdersStore from "./useOrdersStore";
import { OrderFormValues, schema } from "./CreateNewOrderForm";

const initialValues: OrderFormValues = {
  date: new Date(),
  ship: "",
  services:[],
  time: new Date(),
  port: "",
  dock: "",
  description: "",
  event: "",
};

const ModifyNewOrder = () => {
  const updateOrder = useOrdersStore(state => state.updateOrder);
  const order = useOrdersStore(state => state.modifiableOrder);
  const setPage = useOrdersStore(state => state.setPage);
  const { setValue, control, handleSubmit } = useForm<OrderFormValues>({
    defaultValues:   order ? order: initialValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  useEffect( () => {
    if(!order) throw new Error("object is null");
    setValue("services", order.services? order.services : []);
    setValue("date", order.dateTime);
    setValue("time", order.dateTime);
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
    updateOrder({ id:order.id, ...rest, dateTime:initialDateTime, from:"SPFS" });
    setPage("create");
  };

  return(
    <>
      <form>
        <Typography variant="h5">Muokkaa tilausta</Typography>
        <Divider sx={{ margin: 2 }} />
        <Grid columns={12} spacing={4} container>
          <Grid item xs={6}>
            <HookFormDatePicker<OrderFormValues>
              control={control}
              name="date"
              required
            />
          </Grid >
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="ship"
              required
            />
          </Grid>
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
              name="port"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="dock"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              required
              name="event"
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
      <form>
        <Services control={control} />
      </form>
      <Box sx={{ marginTop: 4, marginBottom: 4 }} display="flex" justifyContent= "space-between">
        <Button variant="outlined" onClick={() => setPage("create")}>Palaa muuttamatta</Button>
        <Button variant="outlined" onClick={onPromise(handleSubmit(onSubmit))}>Tallenna muutokset</Button>
      </Box>
    </>
  );
};

export default ModifyNewOrder;

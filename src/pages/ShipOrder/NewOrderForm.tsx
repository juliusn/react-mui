import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { format, startOfToday } from "date-fns";
import { Order } from "../../Types";
import { getOrderTemplates } from "../../storage/readAndWriteOrders";
import DividedCard from "../../components/DividedCard";
import { useForm } from "react-hook-form";
import HookFormField from "../../components/HookFormField";
import TemplateSelection from "./TemplateSelection";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import HookFormDatePicker from "../../components/HookFormDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  date: string,
  template: string,
  orders: Order[],
  ship: string,
  time: string,
  port: string,
  dock?: string,
  description?: string,
  event?: string,
}
const initialValues: FormValues = {
  date: format(new Date(), "dd/MM/yy"),
  template: "",
  ship: "",
  orders:[],
  time:"00:00",
  port: "",
  dock: "",
  description: "",
  event: "",
};
const schema = yup.object({
  date: yup.date().min(startOfToday(), "Date must not be in past"),
  ship: yup.string().required("Ship is required"),
  port: yup.string().required("Port is required"),
  time: yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "HH:MM format" }),
  dock: yup.string().required("Dock is required"),
  description: yup.string(),
  event: yup.string().required("event is required"),
});
const Form = () => {
  const { watch, control, handleSubmit } = useForm<FormValues>({
    defaultValues:  initialValues,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  const dateWatch = watch("date");
  return(
    //eslint-disable-next-line
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid columns={7} spacing={4} container>
        <Grid item xs={4}>
          <HookFormDatePicker<FormValues>
            control={control}
            name="date"
            required
          />
        </Grid >
        <Grid item xs={3}>
          <TemplateSelection
            templates= {getOrderTemplates()}
            date={new Date(dateWatch)}
          />
        </Grid>
        <Grid item xs={4}>
          <HookFormField<FormValues>
            control={control}
            name="ship"
            required
          />
        </Grid>
        <Grid item xs={3}>
          <HookFormField<FormValues>
            control={control}
            name="time"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <HookFormField<FormValues>
            control={control}
            name="port"
            required
          />
        </Grid>
        <Grid item xs={3}>
          <HookFormField<FormValues>
            control={control}
            name="dock"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <HookFormField<FormValues>
            control={control}
            required
            name="event"
          />
        </Grid>
        <Grid item xs={3}>
          <HookFormField<FormValues>
            control={control}
            name="description"
            multiline
            maxRows={9}
          />
        </Grid>
      </Grid>
      <Button type="submit">submit</Button>
    </form>
  );
};

const NewShipOrderForm = () => {

  return(
    <Container component={Paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ textAlign: "center" }} >Alustapahtuma</Typography>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <DividedCard
            left={<Paper elevation={6} />}
            right={ <Form/> }
            spacing={3}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default NewShipOrderForm;


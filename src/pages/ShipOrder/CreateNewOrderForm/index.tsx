import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { isFriday, isSaturday, isSunday, isWeekend, startOfToday } from "date-fns";
import { Service, OrderTemplate } from "../../../Types";
import { getOrderTemplates } from "../../../storage/readAndWriteOrders";
import DividedCard from "../../../components/DividedCard";
import { useForm, useFieldArray } from "react-hook-form";
import HookFormField from "../../../components/HookFormField";
import TemplateSelection from "./TemplateSelection";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import HookFormDatePicker from "../../../components/HookFormDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddServicesToOrdersForm from "./AddServicesToOrderForm";
import { onPromise } from "../../../utils/utils";
import OrderServicesTable from "./OrderServicesTable";

export interface OrderFormValues {
  date: Date,
  services: Service[],
  ship: string,
  time: string,
  port: string,
  dock?: string,
  description?: string,
  event?: string,
}
const initialValues: OrderFormValues = {
  date: new Date,
  ship: "",
  services:[],
  time:"",
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
const OrderForm = () => {
  const { setValue, watch, control, handleSubmit } = useForm<OrderFormValues>({
    defaultValues:  initialValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { append, remove } = useFieldArray({
    control,
    name: "services",
  });
  const [ templates, setTemplates ] = useState<OrderTemplate[]>();

  const services = watch("services");
  const onSubmit = (data: OrderFormValues) => {
    console.log(data);
  };

  const dateWatch = watch("date");
  useEffect(() => {
    if(isWeekend(dateWatch)){
      if(isSaturday(dateWatch)){
        setTemplates(getOrderTemplates().saturday);
      }
      if(isSunday(dateWatch)){
        setTemplates(getOrderTemplates().sunday);
      }
    }
    if(!isWeekend(dateWatch)){
      if(isFriday(dateWatch)){
        setTemplates(getOrderTemplates().friday);
      }else{
        setTemplates(getOrderTemplates().business_day);
      }
    }
  }, [dateWatch]);
  return(
    <>
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
            <TemplateSelection
              setValue={setValue}
              templates= {templates? templates : []}
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="ship"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
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
        <Grid columns={12} spacing={4} container>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }} >Palvelut</Typography>
          </Grid>
          <Grid item xs={12}>
            <AddServicesToOrdersForm
              append={append}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={6}>asd</Grid>
            <OrderServicesTable
              services={services}
              remove={remove}
            />
          </Grid>
        </Grid>
      </form>
      <Button onClick={onPromise(handleSubmit(onSubmit))}>submit</Button>
    </>
  );
};
const CreateNewOrderForm = () => {

  return(
    <Container component={Paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ textAlign: "center" }} >Alustapahtuma</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <DividedCard
            left={<Paper elevation={6} />}
            right={ <OrderForm/> }
            spacing={3}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default CreateNewOrderForm;


import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { getHours, getMinutes, setHours, setMinutes, isFriday, isSaturday, isSunday, isWeekend, startOfToday } from "date-fns";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Service, OrderTemplate } from "../../../Types";
import { getOrderTemplates } from "../../../storage/readAndWriteOrders";
import { useForm, useFieldArray } from "react-hook-form";
import HookFormField from "../../../components/HookFormField";
import TemplateSelection from "./TemplateSelection";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import HookFormDatePicker from "../../../components/HookFormDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CreateNewServicesForm from "./CreateNewServicesForm";
import { onPromise } from "../../../utils/utils";
import OrderServicesTable from "./OrderServicesTable";
import HookFormTimePicker from "../../../components/HookFormTimePicker";
import { v4 as uuidv4 } from "uuid";
import useOrdersStore from "./useOrdersStore";


export interface OrderFormValues  {
  date: Date,
  services: Service[],
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
  services:[],
  time: new Date(),
  port: "",
  dock: "",
  description: "",
  event: "",
};
const schema = yup.object({
  date: yup.date().min(startOfToday(), "Date must not be in past"),
  ship: yup.string().required("Ship is required"),
  port: yup.string().required("Port is required"),
  time: yup.date().required().typeError("Kenttä on pakollinen"),
  dock: yup.string().required("Dock is required"),
  description: yup.string(),
  event: yup.string().required("event is required"),
});


const CreateNewOrderForm = () => {
  const { reset, setValue, watch, control, handleSubmit } = useForm<OrderFormValues>({
    defaultValues:  initialValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { append, remove } = useFieldArray({
    control,
    name: "services",
  });
  const [ templates, setTemplates ] = useState<OrderTemplate[]>();
  const createOrder = useOrdersStore(state => state.setNewOrder);
  const services = watch("services");
  const onSubmit = ({ date, time, ...rest }: OrderFormValues) => {
    let initialDateTime = new Date(date);
    const hours = getHours(time);
    const minutes = getMinutes(time);
    initialDateTime = setHours(initialDateTime, hours);
    initialDateTime = setMinutes(initialDateTime, minutes );
    const id: string = uuidv4();
    createOrder({ id, ...rest, dateTime:initialDateTime, from:"SPFS" });
    reset({ ...initialValues, date });
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
      <Typography variant="h5">Luo uusi tilaus</Typography>
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
        <Grid sx={{ marginTop:1 }}columns={12} spacing={4} container>
          <Grid item xs={12}>
            <CreateNewServicesForm
              append={append}
            />
          </Grid>
          <Grid item xs={12}>
            <OrderServicesTable
              services={services}
              remove={remove}
            />
          </Grid>
        </Grid>
      </form>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Button variant="outlined" onClick={onPromise(handleSubmit(onSubmit))}>Lisää tilaus</Button>
      </Box>
    </>
  );
};

export default CreateNewOrderForm;
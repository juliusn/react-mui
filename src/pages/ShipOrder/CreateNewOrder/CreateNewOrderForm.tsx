import React, { useRef } from "react";
import Divider from "@mui/material/Divider";
import { getHours, getMinutes, setHours, setMinutes, startOfToday } from "date-fns";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Service } from "Types";
import { useForm } from "react-hook-form";
import HookFormField from "components/HookFormField";
import TemplateSelect from "./TemplateSelect";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import HookFormDatePicker from "components/HookFormDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { onPromise } from "utils/utils";
import Services from "./Services";
import HookFormTimePicker from "components/HookFormTimePicker";
import { v4 as uuidv4 } from "uuid";
import useOrdersStore from "./useOrdersStore";
import { useDialog } from "./";

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
export const schema = yup.object({
  date: yup.date().min(startOfToday(), "Date must not be in past"),
  ship: yup.string().required("Ship is required"),
  port: yup.string().required("Port is required"),
  time: yup.date().required().typeError("Kenttä on pakollinen"),
  dock: yup.string().required("Dock is required"),
  description: yup.string(),
  event: yup.string().required("event is required"),
});


const CreateNewOrderForm = () => {
  const { setShowDialog } = useDialog();
  const ref = useRef<HTMLInputElement|null>(null);
  const { reset, setValue, control, handleSubmit } = useForm<OrderFormValues>({
    defaultValues:  initialValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const createOrder = useOrdersStore(state => state.setNewOrder);
  const onSubmit = ({ date, time, ...rest }: OrderFormValues) => {
    let initialDateTime = new Date(date);
    const hours = getHours(time);
    const minutes = getMinutes(time);
    initialDateTime = setHours(initialDateTime, hours);
    initialDateTime = setMinutes(initialDateTime, minutes );
    const id: string = uuidv4();
    createOrder({ id, ...rest, dateTime:initialDateTime, from:"SPFS" });
    reset({ ...initialValues, date });
    if(ref.current){
      ref.current.focus();
      ref.current.select();
    }
    if(setShowDialog) setShowDialog(true);
  };

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
            <TemplateSelect
              setValue={setValue}
              control={control}
              ref={ref}
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
        <Services control={control}/>
      </form>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Button variant="outlined" onClick={onPromise(handleSubmit(onSubmit))}>Lisää tilaus</Button>
      </Box>
    </>
  );
};

export default CreateNewOrderForm;

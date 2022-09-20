import React from "react";
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
import { v4 as uuidv4 } from "uuid";
import useOrdersStore from "../useOrdersStore";
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


const CreateNewOrderForm = () => {
  const { reset, control, handleSubmit } = useForm<OrderFormValues>({
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
    createOrder({ id, ...rest, dateBegin:initialDateTime, client:"SFPS", type:"hourwork" });
    reset({ ...initialValues, date });
  };

  return(
    <>
      <Typography sx={{ textAlign: "center" }} variant="h5">Luo uusi tuntityö tilaus</Typography>
      <Divider sx={{ margin: 2 }} />
      <form>
        <Grid columns={12} spacing={4} container>
          <Grid item xs={6}>
            <HookFormDatePicker<OrderFormValues>
              control={control}
              name="date"
              required
              label="Päivämäärä"
            />
          </Grid >
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
              name="duration"
              required
              type="number"
              label="Kesto"
            />
          </Grid>
          <Grid item xs={6}>
            <HookFormField<OrderFormValues>
              control={control}
              name="persons"
              type="number"
              required
              label="Henkilömäärä"
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
              name="description"
              multiline
              maxRows={9}
              label="Lisätietoja"
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </form>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 4, marginBottom: 4 }}>
        <Button endIcon={<EditIcon />} variant="outlined" onClick={onPromise(handleSubmit(onSubmit))}>Lisää tilaus</Button>
      </Box>
    </>
  );
};

export default CreateNewOrderForm;

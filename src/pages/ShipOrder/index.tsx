import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import FormikField from "../../components/FormikField";
import { format, isWeekend, isFriday } from "date-fns";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Button from "@mui/material/Button";
import { Order, OrderTemplate } from "../../Types";
import OrderList from "./OrderList";
import { getOrders, getOrderTemplates } from "../../storage/readAndWriteOrders";

interface values {
  date: string,
  orders: Order[],
  ship: string,
  dateBegin: string,
  port: string,
  dock?: string,
}
const initialValues: values = {
  date: format(new Date(), "yyyy-MM-dd"),
  ship: "",
  orders:[],
  dateBegin: "",
  port: "",
  dock: "",
};
const ShipOrder = () => {
  const [ templates, setTemplates ] = useState<OrderTemplate[]>([]);
  const [ orders, setOrders ] = useState<Order[]>([
  ]);
  const [ date, setDate ] = useState(initialValues.date);


  useEffect(() => {
    if(!date) return;
    if( !isWeekend(new Date(date)) && !isFriday(new Date(date))){
      console.log("vk");
      return setTemplates(getOrderTemplates().business_day.templates);
    }
    console.log("vkl");
    return setTemplates([]);
  },[date]);
  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [ selectedOrders, setSelectedOrders ] = useState<OrderTemplate[]>([]);

  return(
    <Container>
      <Formik
        validationSchema={ Yup.object({
          date: Yup.date().required(),
        })}
        initialValues={initialValues}
        onSubmit={ (values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form>
            <Stack spacing={2} direction="column">
              <Typography variant="h4">Create new order</Typography>
              <FormikField
                id="date"
                name="date"
                label="Päivämäärä"
                type="date"
                sx={{ width: 220 }}
                onChange={(value) => setDate(value.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={templates}
                disableCloseOnSelect
                groupBy={(option) => option.port}
                getOptionLabel={(option) => `${option.ship} ${option.ETA}`}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.ship} {option.ETA}
                  </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <FormikField {...params} name="date" label="Select order template" placeholder="Select order template" />
                )}
                onChange={(e,values) => setSelectedOrders(values)}
                value={selectedOrders}
              />
              <Button onClick={() => handleSubmit()}>
                Select
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <OrderList orders={orders} />
    </Container>
  );
};

export default ShipOrder;


import React from "react";
import useOrdersStore from "../useOrdersStore";
import OrderFormByHourly from "../HourlyOrdersForm";
import { OrderFormHourlyI } from "Types";
import { NewOrderByHourlyWork } from "utils/ZodSchemas";

const CreateNewOrderForm = () => {
  const createOrder = useOrdersStore(state => state.setNewOrder);
  const submit = ( order : OrderFormHourlyI) => {
    createOrder(NewOrderByHourlyWork.parse(order));
  };

  return(
    <OrderFormByHourly
      submit={submit}
      title="Luo uusi tuntityö"
      buttonTitle="Lisää tilaus"
    />
  );
};

export default CreateNewOrderForm;

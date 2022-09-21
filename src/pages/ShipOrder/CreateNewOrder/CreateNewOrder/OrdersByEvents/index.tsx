import React from "react";
import { OrderFormEventI } from "Types";
import { NewOrderByEvent } from "utils/ZodSchemas";
import useOrdersStore from "../../useOrdersStore";
import OrderFormByEvent from "./OrderByEventForm";

const CreateNewOrderForm = () => {
  const createOrder = useOrdersStore(state => state.setNewOrder);
  const submit = (order: OrderFormEventI ) => {
    createOrder(NewOrderByEvent.parse(order));
  };
  return(
    <OrderFormByEvent
      title="Luo uusi tilaus"
      buttonTitle="Lisää tilaus"
      template
      submit={submit}
    />
  );
};
export default CreateNewOrderForm;

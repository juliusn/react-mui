import React from "react";
import { OrderFormReturn } from "Types";
import { NewOrder } from "utils/ZodSchemas";
import useOrdersStore from "../../useOrdersStore";
import OrderFormByEvent from "./OrderByEventForm";

const CreateNewOrderForm = () => {
  const createOrder = useOrdersStore(state => state.setNewOrder);
  const submit = (order: OrderFormReturn ) => {
    createOrder(NewOrder.parse(order));
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

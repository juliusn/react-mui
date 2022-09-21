import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { NewOrderByEvent, Order, NewOrder, OrderFormReturn } from "Types";
import { OrderUnion } from "utils/ZodSchemas";
import OrderFormByEvent from "pages/ShipOrder/CreateNewOrder/CreateNewOrder/OrdersByEvents/OrderByEventForm";


interface ModifyNewOrderI {
  order: NewOrderByEvent,
  goBack: () => void,
  update: (order: NewOrder|Order) => void,
  deleteOrder: (id: string) => void,
}


const ModifyNewOrder = ({ update, deleteOrder, order, goBack }:ModifyNewOrderI) => {
  return(
    <ModifyOrderByEvent
      deleteOrder={deleteOrder}
      update={update}
      order={order}
      actionComponent={
        <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => goBack()}>Palaa</Button>
      }
      goBack={goBack}
      buttonTitle="Tallenna muutokset"
    />

  );
};
interface ModifyOrder extends ModifyNewOrderI {
  actionComponent?: React.ReactNode,
  buttonTitle: string,
}
export const ModifyOrderByEvent  = ({ buttonTitle, goBack, actionComponent, update, deleteOrder, order }:ModifyOrder) => {

  const submit = (order: OrderFormReturn) => {
    update(OrderUnion.parse(order));
    goBack();
  };
  const handleDelete = () => {
    deleteOrder(order.id);
    goBack();
  };
  return(
    <>
      <OrderFormByEvent
        title="Muokkaa tilausta"
        buttonTitle={buttonTitle}
        submit={submit}
        order={order}
        titleComponent={
          <Box sx={{ display:"flex", justifyContent:"flex-end" }}>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>Poista</Button>
          </Box>
        }
        actionComponent={actionComponent}
      />

    </>
  );
};

export default ModifyNewOrder;

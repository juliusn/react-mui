import { OrderI, NewOrderI, OrderFormHourlyI } from "Types";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import HourlyOrdersForm from "../HourlyOrdersForm";
import { OrderFormHourly } from "utils/ZodSchemas";
import CloseIcon from "@mui/icons-material/Close";



interface ModifyNewOrderI {
  order: OrderFormHourlyI,
  goBack: () => void,
  update: (order: NewOrderI|OrderI) => void,
  deleteOrder: (id: string) => void,
}

const ModifyHourlyWorkOrder = ({ order, goBack, update, deleteOrder }: ModifyNewOrderI) => (
  <ModifyOrderByHourlyWork
    deleteOrder={deleteOrder}
    update={update}
    order={order}
    goBack={goBack}
    buttonTitle={"Tallenna muutokset"}
    actionComponent={
      <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => goBack()}>Palaa</Button>
    }
  />
);
interface ModifyOrder extends ModifyNewOrderI {
  actionComponent?: React.ReactNode,
  buttonTitle: string,
}
export const ModifyOrderByHourlyWork  = ({ buttonTitle, goBack, actionComponent, update, deleteOrder, order }:ModifyOrder) => {

  const submit = (order: OrderFormHourlyI) => {
    update(OrderFormHourly.parse(order));
    goBack();
  };
  const handleDelete = () => {
    deleteOrder(order.id);
    goBack();
  };
  return(
    <HourlyOrdersForm
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
  );
};

export default ModifyHourlyWorkOrder;

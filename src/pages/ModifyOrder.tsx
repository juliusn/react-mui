import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModifyOrderByHourlyWork from "./ShipOrder/CreateNewOrder/ModifyNewOrder/ModifyOrderByHourlyWork";
import ModifyOrderByEvent from "./ShipOrder/CreateNewOrder/ModifyNewOrder/ModifyOrderByEvent";
import { NewOrder } from "Types";
import { getOrderById, updateOrder, deleteOrderById } from "storage/readAndWriteOrders";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const ModifyOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [ order, setOrder ] = useState<NewOrder>();
  const goBack= () => navigate("/ship-order");

  useLayoutEffect( () => {
    if(!orderId) throw new Error();
    const initialOrder = getOrderById(orderId);
    if(!initialOrder){
      navigate("/ship-order");
      return;
    }
    setOrder(initialOrder);
  }, [orderId, navigate]);

  if(!order) return <></>;
  if("services" in order){
    return (
      <Box component={Paper} sx={{ padding: 2 }}>
        <ModifyOrderByEvent
          deleteOrder={deleteOrderById}
          order={order}
          goBack={goBack}
          update={updateOrder}
        />
      </Box>
    );
  }else{
    return (
      <ModifyOrderByHourlyWork
        deleteOrder={deleteOrderById}
        order={order}
        goBack={goBack}
        update={updateOrder}
      />);
  }

};
export default ModifyOrder;

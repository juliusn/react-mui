import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStorage from "../useOrdersStore";
import ModifyOrderByHourlyWork from "./ModifyOrderByHourlyWork";
import ModifyOrderByEvent from "./ModifyOrderByEvent";
import { NewOrderI } from "Types";


const ModifyNewOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [ order, setOrder ] = useState<NewOrderI>();
  const fetchOrder= useStorage(state => state.getOrderById);
  const deleteOrder= useStorage(state => state.deleteOrderById);
  const updateOrder = useStorage(state => state.updateOrder);
  const goBack = () => navigate("/create/new");
  useEffect( () => {
    if(!orderId) throw new Error();
    const initialOrder = fetchOrder(orderId);
    if(!initialOrder){
      navigate("/create/new");
      return;
    }
    setOrder(initialOrder);
  }, [orderId, navigate, fetchOrder]);

  if(!order) return <></>;
  if("services" in order){
    return <ModifyOrderByEvent order={order} goBack={goBack} update={updateOrder} deleteOrder={deleteOrder}/>;
  }else{
    return <ModifyOrderByHourlyWork order={order} goBack={goBack} update={updateOrder} deleteOrder={deleteOrder}/>;
  }

};
export default ModifyNewOrder;

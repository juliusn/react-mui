import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModifyOrderByHourlyWork from "./ShipOrder/CreateNewOrder/ModifyNewOrder/ModifyOrderByHourlyWork";
import { ModifyOrderByEvent } from "./ShipOrder/CreateNewOrder/ModifyNewOrder/ModifyOrderByEvent";
import { OrderByEvent, OrderByHourlyWork } from "Types";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DividedCard from "components/DividedCard";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import { useModifyStorage, useSubscribeOrderById } from "hooks/useStorage";


const ModifyOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  if(!orderId) return null;
  return( <Render id={orderId} navigate={navigate} />);
};
interface RenderProps {
  id: string,
  navigate: (url: string) => void,
}
const Render = ({ id, navigate }: RenderProps ) => {
  const { order } = useSubscribeOrderById(id);
  const goBack= () => navigate("/ship-order");
  const { deleteOrderById, updateOrderByid } = useModifyStorage();


  if(!order) return <></>;
  if("services" in order){
    return (
      <Container sx={{ marginTop:2, padding: 1 }} component={Paper}>
        <DividedCard
          size={4}
          right={
            <ModifyOrderByEvent
              deleteOrder={deleteOrderById}
              order={order}
              goBack={goBack}
              update={updateOrderByid}
              buttonTitle="Tallenna muutokset"
            />
          }
          left={<BasicInfoAboutOrder order={order} />}
        />
      </Container>
    );
  }else{
    return (
      <Container sx={{ marginTop:2, padding: 1 }} component={Paper}>
        <DividedCard
          size={4}
          right={
            <ModifyOrderByHourlyWork
              deleteOrder={deleteOrderById}
              order={order}
              goBack={goBack}
              update={updateOrderByid}
            />
          }
          left={<BasicInfoAboutOrder order={order} />}
        />
      </Container>
    );
  }
};
const BasicInfoAboutOrder = ({ order }:{ order: OrderByHourlyWork|OrderByEvent }) => {
  return(
    <Grid container sx={{ padding: 5 }} spacing={4} >
      <Grid item xs={12}>
        <Typography variant="h5">Ordered</Typography>
        <Typography variant="caption">{order.dateOrdered ? format(order.dateOrdered, "dd/MM/yyyy HH:mm"): ""}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Type of order</Typography>
        <Typography variant="caption" >{order.type}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Status of order</Typography>
        <Typography>{order.status ? "Accpeted" : "Pending"}</Typography>
        <Divider />
      </Grid>
    </Grid>
  );
};
export default ModifyOrder;

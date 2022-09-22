import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModifyOrderByHourlyWork } from "./ShipOrder/CreateNewOrder/ModifyNewOrder/ModifyOrderByHourlyWork";
import { ModifyOrderByEvent } from "./ShipOrder/CreateNewOrder/ModifyNewOrder/ModifyOrderByEvent";
import { OrderByEventI, OrderByHourlyWorkI } from "Types";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DividedCard from "components/DividedCard";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import { useModifyStorage, useSubscribeOrderById } from "hooks/useStorage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";


const ModifyOrder = () => {
  const { orderId } = useParams();
  if(!orderId) return null;
  return( <Render id={orderId} />);
};
interface RenderProps {
  id: string,
}
const Render = ({ id }: RenderProps ) => {
  const navigate = useNavigate();
  const { order } = useSubscribeOrderById(id);
  const goBack= () => navigate("/ship-order");
  const { deleteOrderById, updateOrderByid } = useModifyStorage();
  const buttonTitle="Tallenna muutokset";


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
              buttonTitle={buttonTitle}
            />
          }
          left={<BasicInfoAboutOrder order={order} goBack={goBack}/>}
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
              buttonTitle={buttonTitle}
            />
          }
          left={<BasicInfoAboutOrder order={order} goBack={goBack}/>}
        />
      </Container>
    );
  }
};
interface BasicInfoAboutOrderI {
  order: OrderByHourlyWorkI|OrderByEventI,
  goBack: () => void,
}
const BasicInfoAboutOrder = ({ goBack, order }:BasicInfoAboutOrderI) => {
  return(
    <Grid container spacing={4} >
      <Grid item xs={12}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => goBack()}>Takaisin</Button>
      </Grid>
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

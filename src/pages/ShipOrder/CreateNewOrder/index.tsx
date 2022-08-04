import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Order } from "../../../Types";
import DividedCard from "../../../components/DividedCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import NewOrdersList from "./NewOrdersList";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CreateNewOrderForm from "./CreateNewOrderForm";
import ModifyNewOrder from "./ModifyNewOrder";

export type NewOrder = Omit<Order, "dateOrdered"|"status">
type CreateNew = {
  page: "createNew";
};
type Modify = {
  page: "modify";
  order: NewOrder
};
export type Page = CreateNew | Modify;

const CreateNewOrder = () => {
  const [ newOrders, setNewOrders ] = useState<NewOrder[]>([]);
  const [ page, setPage ] = useState<Page>({ page: "createNew" });
  const [ selectedOrder, setSelectedOrder ] = useState<string|null>(null);

  useEffect(() => {
    console.log("rerender");
    if(page.page === "modify"){
      setSelectedOrder(page.order.id);
      console.log(page.order);
    }else{
      setSelectedOrder(null);
    }
  },[page]);

  const renderPage= () => {
    if(page.page === "createNew") return(<CreateNewOrderForm createNewOrder={setNewOrders} />);
    if(page.page === "modify") return(<ModifyNewOrder setPage={setPage} modifyOrder={setNewOrders} order={page.order} />);
  };

  return(
    <Container sx={{ marginTop:2, padding: 1 }} component={Paper}>
      <Grid container spacing={4}>
        <Grid item xs={6} >
          <Typography variant="h5" sx={{ textAlign: "start" }}>Luo uusia tilauksia</Typography>
        </Grid>
        <Grid item xs={6} >
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              endIcon={<SendRoundedIcon />}
            >
              Lähetä kaikki tilaukset (muista asettaa tarkistus)
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <DividedCard
            left={<NewOrdersList selectedRow={selectedOrder} setPage={setPage} newOrders={newOrders} />}
            right={renderPage()}
            size={0.4}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default CreateNewOrder;


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
import useOrdersStore from "./useOrdersStore";

export type NewOrder = Omit<Order, "dateOrdered"|"status">

const CreateNewOrder = () => {
  const page = useOrdersStore(state => state.page);

  const renderPage= () => {
    if(page === "create") return(<CreateNewOrderForm />);
    if(page === "modify") return(<ModifyNewOrder />);
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
            left={<NewOrdersList />}
            right={renderPage()}
            size={0.4}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default CreateNewOrder;


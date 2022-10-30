import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import DividedCard from "components/DividedCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import NewOrdersList from "./NewOrdersList";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, Outlet } from "react-router-dom";
import useOrdersStore from "./useOrdersStore";
import { PostOrderI } from "Types";
import { useModifyStorage } from "hooks/useStorage";



const CreateNewOrder = () => {
  const navigate = useNavigate();
  const orders = useOrdersStore(state => state.orders);
  const clearOrders = useOrdersStore(state => state.removeAllOrders);
  const { postOrders } = useModifyStorage();

  const onSubmit = () => {
    const order: PostOrderI[] = orders.map(o => ({ ...o, status: "pending" }));
    postOrders(order);
    // tarksita että onko samat talletettu jo listalle
    clearOrders();
    navigate("/ship-order");
  };

  return(
    <Container sx={{ marginTop:2, padding: 1 }} component={Paper}>
      <Grid container spacing={4}>
        <Grid item xs={3} >
          <Button
            onClick={() => navigate("/ship-order")}
            startIcon={<ArrowBackIcon/>}
          >
            Takaisin
          </Button>
        </Grid>
        <Grid item xs={3} >
          <Typography variant="h5" sx={{ textAlign: "start" }}>Luo uusia tilauksia</Typography>
        </Grid>
        <Grid item xs={6} >
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              endIcon={<SendRoundedIcon />}
              onClick={onSubmit}
            >
              Lähetä tilaukset (muista asettaa tarkistus)
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {/* outlet renders CreateNewOrder/index or ModifyNewOrder/index */ }
          <DividedCard
            left={<NewOrdersList />}
            right={<Outlet/>}
            size={5}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default CreateNewOrder;

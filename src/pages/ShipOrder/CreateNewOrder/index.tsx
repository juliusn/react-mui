import React, { useState } from "react";
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
import { useCallbackPrompt } from "hooks/useCallbackPrompt";
import { v4 as uuid } from "uuid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, Outlet, useOutletContext } from "react-router-dom";
import useOrdersStore from "./useOrdersStore";
import { PostOrder } from "Types";


import { db } from "../../../firebase";
import { writeBatch, serverTimestamp, doc } from "firebase/firestore";

type ContextType = { setShowDialog: React.Dispatch<React.SetStateAction<boolean>> | null };
const CreateNewOrder = () => {
  const navigate = useNavigate();
  const [ showDialog, setShowDialog ] = useState<boolean>(false);
  //const { showPrompt, confirmNavigation, cancelNavigation } = useCallbackPrompt(showDialog);
  const orders = useOrdersStore(state => state.orders);
  const clearOrders = useOrdersStore(state => state.removeAllOrders);

  const onSubmit = () => {
    const batch = writeBatch(db);
    const order: PostOrder[] = orders.map(o => ({ ...o, status: "pending" }));
    order.forEach((o : PostOrder) => {
      const id = uuid();
      const orderRef = doc(db, "orders", id);
      batch.set(orderRef, { ...o, dateOrdered: serverTimestamp() });
    });
    batch.commit().catch(e => console.log(e));
    // tarksita että onko samat talletettu jo listalle
    clearOrders();
    navigate("/ship-order");
  };

  return(
    <Container sx={{ marginTop:2, padding: 1 }} component={Paper}>
      {/*
      <ConfirmationDialog
        show={showPrompt}
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
      />
  */}
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
              { ////////////////////////////////////////////////////////////////////
              }
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
            right={<Outlet context={setShowDialog}/>}
            size={5}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export function useDialog() {
  return useOutletContext<ContextType>();
}
export default CreateNewOrder;

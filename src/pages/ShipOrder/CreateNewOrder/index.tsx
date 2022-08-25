import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Order } from "Types";
import DividedCard from "components/DividedCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import NewOrdersList from "./NewOrdersList";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useCallbackPrompt } from "hooks/useCallbackPrompt";
import ConfirmationDialog from "components/Prompt";
import { useParams, Outlet, useOutletContext } from "react-router-dom";

export type NewOrder = Omit<Order, "dateOrdered"|"status">
type ContextType = { setShowDialog: React.Dispatch<React.SetStateAction<boolean>> | null };
const CreateNewOrder = () => {
  const [ showDialog, setShowDialog ] = useState<boolean>(false);
  const { showPrompt, confirmNavigation, cancelNavigation } = useCallbackPrompt(showDialog);
  const { orderId } = useParams();

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
            right={<Outlet context={setShowDialog}/>}
            size={0.4}
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


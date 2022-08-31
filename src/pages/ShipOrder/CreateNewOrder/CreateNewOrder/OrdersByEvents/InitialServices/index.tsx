import React from "react";
import Grid from "@mui/material/Grid";
import CreateNewServicesForm from "./CreateNewServicesForm";
import OrderServicesTable from "./InitialServicesTable";
import { Control } from "react-hook-form";
import { OrderFormValues } from "..";

interface ServicesProps {
  control: Control<OrderFormValues>;
}
function InitialServices({ control } : ServicesProps) {
  return(
    <Grid sx={{ marginTop:1 }}columns={12} spacing={4} container>
      <Grid item xs={12}>
        <CreateNewServicesForm
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <OrderServicesTable
          control={control}
        />
      </Grid>
    </Grid>

  );
}

export default InitialServices;

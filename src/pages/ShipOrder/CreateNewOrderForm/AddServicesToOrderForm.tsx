import React from "react";
import { UseFieldArrayAppend, useForm } from "react-hook-form";
import HookFormField from "../../../components/HookFormField";
import Grid from "@mui/material/Grid";
import { OrderFormValues } from "./index";
import { yupResolver } from "@hookform/resolvers/yup";
import { onPromise } from "../../../utils/utils";
import { Service } from "../../../Types";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";

interface AddServicesToOrderFormProps {
  append: UseFieldArrayAppend<OrderFormValues, "services">;
}

const initialValues: Service = {
  place: "",
  service: "",
  persons: 1,
  readiness: 15,
};

const schema = yup.object({
  persons: yup.number().typeError("Kentän on oltava numero").min(1, "Kentän on oltava positiivinen määrä").required("Kenttä on pakollinen"),
  readiness: yup.number().typeError("Kentän on oltava numero").min(1, "Kentän on oltava positiivinen määrä").required("Kenttä on pakollinen"),
  place: yup.string().required("Kenttä on pakollinen"),
  service: yup.string().required("Kenttä on pakollinen"),
});
export default function AddServicesToOrderForm({ append }: AddServicesToOrderFormProps) {
  const { control, handleSubmit } = useForm<Service>({
    defaultValues:  initialValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: Service) => {
    append(data);
  };
  return(
    <>
      <Grid container columns={12} spacing={4}>
        <Grid item xs={6}>
          <HookFormField<Service>
            control={control}
            name="service"
            label="Tehtävä"
          />
        </Grid>
        <Grid item xs={6}>
          <HookFormField<Service>
            control={control}
            name="place"
            label="Paikka"
          />
        </Grid>
        <Grid item xs={6}>
          <HookFormField<Service>
            control={control}
            name="persons"
            label="Työtekijät"
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <HookFormField<Service>
            control={control}
            type="number"
            label="Valmius"
            name="readiness"
          />
        </Grid>
      </Grid>
      <Grid container columns={12} sx={{ marginTop: 2 }} direction="row" justifyContent={"end"} alignItems="center" >
        <Button color="primary" onClick={onPromise(handleSubmit(onSubmit))} endIcon={<AddIcon />}>
          <Typography>Lisää tehtävä</Typography>
        </Button>
      </Grid>
    </>
  );
}

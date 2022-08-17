import React from "react";
import { useFieldArray, useForm, Control } from "react-hook-form";
import HookFormField from "components/HookFormField";
import Grid from "@mui/material/Grid";
import { OrderFormValues } from "../CreateNewOrderForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { onPromise } from "utils/utils";
import { Service } from "Types";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";

interface AddServicesToOrderFormProps {
  control: Control<OrderFormValues>
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
export default function CreateNewServicesForm({ control : serviceControl }: AddServicesToOrderFormProps) {
  const { reset, control, handleSubmit } = useForm<Service>({
    defaultValues:  initialValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { append } = useFieldArray({ control: serviceControl, name: "services" });

  const onSubmit = (data: Service) => {
    append(data);
    reset(initialValues);
  };
  return(
    <>
      <Grid container columns={12} spacing={4}>
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ textAlign: "space-between" }} >Palvelut</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" onClick={onPromise(handleSubmit(onSubmit))} endIcon={<AddIcon />}>
            <Typography>Lisää tehtävä</Typography>
          </Button>
        </Grid>
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
            label="Työntekijät"
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
    </>
  );
}

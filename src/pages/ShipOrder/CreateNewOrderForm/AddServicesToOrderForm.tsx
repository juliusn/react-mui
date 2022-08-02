import React from "react";
import { UseFieldArrayAppend, useForm } from "react-hook-form";
import HookFormField from "../../../components/HookFormField";
import Grid from "@mui/material/Grid";
import { OrderFormValues } from "./index";
import { yupResolver } from "@hookform/resolvers/yup";
import { onPromise } from "../../../utils/utils";
import { Service } from "../../../Types";
import IconButton from "@mui/material/IconButton";
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
  persons: yup.number().required(),
  readiness: yup.number().required("readiness is required"),
  place: yup.string().required("place is required"),
  service: yup.string().required("service is required"),
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
      <Grid item xs={3}>
        <HookFormField<Service>
          control={control}
          name="service"
        />
      </Grid>
      <Grid item xs={3}>
        <HookFormField<Service>
          control={control}
          name="place"
        />
      </Grid>
      <Grid item xs={3}>
        <HookFormField<Service>
          control={control}
          name="persons"
          type="number"
        />
      </Grid>
      <Grid item xs={3}>
        <HookFormField<Service>
          control={control}
          type="number"
          name="readiness"
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={onPromise(handleSubmit(onSubmit))}>
          <AddIcon />
        </IconButton>
      </Grid>
    </>
  );
}

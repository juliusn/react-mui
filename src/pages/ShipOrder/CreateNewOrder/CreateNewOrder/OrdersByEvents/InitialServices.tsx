import React from "react";
import Grid from "@mui/material/Grid";
import HookFormField from "components/HookFormField";
import { OrderFormValues } from "./OrderByEventForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { onPromise } from "utils/utils";
import { Service } from "Types";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Control, useFieldArray, useWatch, UseFieldArrayRemove } from "react-hook-form";

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
        <ServicesTable
          control={control}
        />
      </Grid>
    </Grid>

  );
}

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

function CreateNewServicesForm({ control : serviceControl }: AddServicesToOrderFormProps) {
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
        <Grid item xs={6} sx={{ justifyContent: "flex-end", display: "flex" }}>
          <Typography variant="h5" sx={{ textAlign: "ceneter" }} >Palvelut</Typography>
        </Grid>
        <Grid item xs={6} sx={{ justifyContent: "flex-end", display: "flex" }}>
          <Button variant="outlined" onClick={onPromise(handleSubmit(onSubmit))} endIcon={<AddIcon />}>
            Lisää tehtävä
          </Button>
        </Grid>
        <Grid item xs={6} md={3}>
          <HookFormField<Service>
            control={control}
            name="service"
            label="Tehtävä"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <HookFormField<Service>
            control={control}
            name="place"
            label="Paikka"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <HookFormField<Service>
            control={control}
            name="persons"
            label="Työntekijät"
            type="number"
          />
        </Grid>
        <Grid item xs={6} md={3}>
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
interface ServiceTableProps {
  control: Control<OrderFormValues>,
}
function ServicesTable({ control } :ServiceTableProps ) {
  const services = useWatch({ control,  name: "services" });
  const { remove } = useFieldArray({ control, name: "services" });

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Persons</TableCell>
            <TableCell>Place</TableCell>
            <TableCell>Readiness</TableCell>
            <TableCell>Service</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { services.length !== 0
            ? services.map((row, index) => <Row key={`${row.place} ${row.service}`} {...row} remove={remove} index={index} />)
            : <PlaceHolderRow />  }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const PlaceHolderRow = () => {
  return(
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, height: 50 }}
      >
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </>
  );
};
interface RowProps extends Service {
  remove: UseFieldArrayRemove
  index: number
}

const Row = ({ index, persons, service, place, readiness, remove }: RowProps) => {
  return(
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>{persons}</TableCell>
        <TableCell>{place}</TableCell>
        <TableCell>{readiness}</TableCell>
        <TableCell>{service}</TableCell>
        <TableCell>
          <IconButton onClick={() => remove(index)}><DeleteIcon/></IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};
export default InitialServices;

import React from "react";
import Table from "@mui/material/Table";
import { Service } from "Types";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Control, useFieldArray, useWatch, UseFieldArrayRemove } from "react-hook-form";
import { OrderFormValues } from "..";

interface ServiceTableProps {
  control: Control<OrderFormValues>,
}
export default function ServicesTable({ control } :ServiceTableProps ) {
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

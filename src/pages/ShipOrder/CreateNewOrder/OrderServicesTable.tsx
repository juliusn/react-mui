import React from "react";
import Table from "@mui/material/Table";
import { Service } from "../../../Types";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { UseFieldArrayRemove } from "react-hook-form";

interface ServiceListProps {
  remove: UseFieldArrayRemove,
  services: Service[],
}
export default function OrderServicesTable({ remove, services } :ServiceListProps ) {

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Persons</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Readiness</TableCell>
            <TableCell>Service</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { services.map((row, index) => <Row key={`${row.place} ${row.service}`} {...row} remove={remove} index={index} />) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
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

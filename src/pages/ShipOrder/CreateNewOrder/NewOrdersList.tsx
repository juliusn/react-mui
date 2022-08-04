import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Order } from "../../../Types";
import { format } from "date-fns";
import { Page } from "./index";

type NewOrder = Omit<Order, "dateOrdered"|"status">

interface NewOrderListProps {
  newOrders: NewOrder[]|undefined,
  setPage: React.Dispatch<React.SetStateAction<Page>>,
  selectedRow: string|null,
}

const NewOrdersList = ({ newOrders, setPage, selectedRow }: NewOrderListProps) => {
  return(
    <Box>
      <Typography variant="h5" >Uudet tilaukset</Typography>
      <Divider sx={{ margin: 2 }} variant="middle" />
      <TableContainer sx={{ marginTop: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Alus</TableCell>
              <TableCell>Aika</TableCell>
              <TableCell>Tapahtuma</TableCell>
              <TableCell>Työntekijää</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              newOrders?.map(a => <Row key={a.id} order={a} selected={a.id===selectedRow} setPage={setPage} />)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
interface RowProps {
  order: NewOrder,
  setPage: React.Dispatch<React.SetStateAction<Page>>,
  selected: boolean,
}
function Row({ selected, setPage, order }: RowProps) {
  const { ship, event, description, port, dock, services, dateTime } = order;
  const serviceProviders = services ? services.map<number>(a => a.persons).reduce<number>((a,c) => c + a, 0 as number) : 0;

  return (
    <>
      <TableRow
        selected={selected}
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setPage({ page: "modify", order })}
      >
        <TableCell>{ship} </TableCell>
        <TableCell>{format(dateTime, "dd/MM HH:mm")} </TableCell>
        <TableCell>{event} </TableCell>
        <TableCell>{serviceProviders} </TableCell>
      </TableRow>
    </>
  );
}
export default NewOrdersList;

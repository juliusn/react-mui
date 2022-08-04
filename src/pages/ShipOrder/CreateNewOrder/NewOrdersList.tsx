import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Order } from "../../../Types";
import { format } from "date-fns";
import useOrdersStore, { Page } from "./useOrdersStore";

type NewOrder = Omit<Order, "dateOrdered"|"status">


const NewOrdersList = () => {
  const getOrders = useOrdersStore(state => state.orders);
  const setSelected = useOrdersStore(state => state.setModifiableOrder);
  const setPage = useOrdersStore(state => state.setPage);
  const selected = useOrdersStore(state => state.modifiableOrder);
  return(
    <Box>
      <Typography variant="h5" >Uudet tilaukset</Typography>
      <Divider sx={{ margin: 2 }} variant="middle" />
      <TableContainer sx={{ marginTop: 1 }} component={Paper}>
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
              getOrders.length !== 0
                ? getOrders?.map(a => <Row key={a.id} order={a} selected={a.id===selected?.id} setSelected={setSelected} setPage={setPage} />)
                : <PlaceHolderRow />
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
interface RowProps {
  order: NewOrder,
  setPage: (page: Page) => void,
  selected: boolean,
  setSelected: (newOrder: NewOrder) => void,
}
function Row({ selected, setPage, order, setSelected }: RowProps) {
  const { ship, event, services, dateTime } = order;
  const serviceProviders = services ? services.map<number>(a => a.persons).reduce<number>((a,c) => c + a, 0 as number) : 0;
  const handleClick = () => {
    setSelected(order);
    setPage("modify");
  };
  return (
    <>
      <TableRow
        selected={selected}
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={handleClick}
      >
        <TableCell>{ship} </TableCell>
        <TableCell>{format(dateTime, "dd/MM HH:mm")} </TableCell>
        <TableCell>{event} </TableCell>
        <TableCell>{serviceProviders} </TableCell>
      </TableRow>
    </>
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
      </TableRow>
    </>
  );
};
export default NewOrdersList;

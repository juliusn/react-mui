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
import { NewOrderI } from "Types";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import useOrdersStore from "./useOrdersStore";

const NewOrdersList = () => {
  const { orderId } = useParams();
  const getOrders = useOrdersStore(state => state.orders);
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
                ? getOrders?.map(a => <Row key={a.id} order={a} selected={a.id === orderId} />)
                : <PlaceHolderRow />
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
interface RowProps {
  order: NewOrderI,
  selected: boolean,
}
function Row({ selected, order }: RowProps) {
  const { dateBegin, type } = order;
  // eslint-disable-next-line
  const serviceProviders = type === "event" ? order.services.map<number>(a => a.persons).reduce<number>((a,c) => c + a, 0 as number) : order.persons;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`modify/${order.id}`);
  };
  return (
    <>
      <TableRow
        selected={selected}
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={handleClick}
      >
        <TableCell>{order.type === "event" ? order.ship : ""} </TableCell>
        <TableCell>{format(dateBegin, "dd/MM HH:mm")} </TableCell>
        <TableCell>{order.type === "event" ? order.event : "tuntityö"} </TableCell>
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

import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { Order, Service } from "../../Types";


function Row({ ship, event, dateOrdered, description, from, status, port, dock, services, dateBegin }: Order) {
  const [open, setOpen] = useState(false);
  //eslint-disable-next-line
  const serviceProviders = services ? services.map<number>(a => a.persons).reduce<number>((a,c) => c + a, 0 as number) : 0;
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen((a) => !a)}
      >
        <TableCell> {ship} </TableCell>
        <TableCell> {dateOrdered} </TableCell>
        <TableCell> {status? <Chip  color="success" label="Hyväksytty" />:<Chip color="warning" label="Odottaa"/>} </TableCell>
        <TableCell> {from} </TableCell>
        <TableCell> {dateBegin} </TableCell>
        <TableCell> {port} </TableCell>
        <TableCell> {dock} </TableCell>
        <TableCell> {event} </TableCell>
        <TableCell> {serviceProviders} </TableCell>
      </TableRow>
      <TableRow>
        <CollapsibleCell description={description} services={services} open={open}/>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleCell = ({ services, open, description } : { description?: string, open: boolean, services: Service[]|undefined }) => {

  return (
    <TableCell padding="none" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
      <Collapse  in={open} timeout="auto" unmountOnExit>
        <Paper sx={{ elevation: 5, margin: 2 }} >
          <Grid sx={{ padding: 2,  marginTop: 3, marginBottom: 2 }} container>
            <Grid item>
              <Table size="small" aria-label="services">
                <TableHead>
                  <TableRow>
                    <TableCell>Palvelu</TableCell>
                    <TableCell>Paikka</TableCell>
                    <TableCell>Tilattu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { services && services.map(row => (
                    <TableRow key={row.place}>
                      <TableCell>{row.service}</TableCell>
                      <TableCell>{row.place}</TableCell>
                      <TableCell>{row.persons}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={1}>
              <Divider orientation={"vertical"}  />
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={6}>
              <TextField
                id="standard-textarea"
                label="Huomioitavaa"
                multiline
                fullWidth={ description ? true: false}
                variant="standard"
                value={description}
                disabled
              />
            </Grid>
          </Grid>
        </Paper>
      </Collapse>
    </TableCell>
  );
};

export default function CollapsibleTable({ orders } :{ orders : Order[] }) {

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Alus</TableCell>
            <TableCell>Tilattu</TableCell>
            <TableCell>Tila</TableCell>
            <TableCell>Tilaaja</TableCell>
            <TableCell>Aika</TableCell>
            <TableCell>Satama</TableCell>
            <TableCell>Laituri</TableCell>
            <TableCell>Tapahtuma</TableCell>
            <TableCell>Aluspalvelut</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { orders.map((row) => (
            <Row key={row.id} {...row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


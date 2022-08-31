import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DividedCard from "components/DividedCard";
import { OrderByEvent, Order, OrderByHourlyWork, Service } from "Types";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface RowMenuProps {
  anchorEl : null | HTMLElement
  onClose: () => void
  id: string
}
const RowMenu = ({ id, anchorEl, onClose }: RowMenuProps ) => {
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  return(
    <Menu
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={onClose}
    >
      <MenuItem>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText onClick={() => navigate(`/modify/${id}`)}>Muokkaa tilausta</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText>Poista tilaus</ListItemText>
      </MenuItem>
    </Menu>
  );
};
// put Collabsiblerow component to render description
function RowByHourlyWork({ id, persons, duration , dateOrdered, from, status, port, dateTime }: OrderByHourlyWork) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return(
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>{format(dateOrdered, "dd/MM HH:mm")}</TableCell>
        <TableCell>{status? <Chip  color="success" label="Hyväksytty" />:<Chip color="warning" label="Odottaa"/>} </TableCell>
        <TableCell>{from} </TableCell>
        <TableCell>{format(dateTime, "dd/MM HH:mm")} </TableCell>
        <TableCell>{port} </TableCell>
        <TableCell></TableCell>
        <TableCell>Tuntityö {duration} h</TableCell>
        <TableCell>{persons}</TableCell>
        <TableCell>
          <IconButton onClick={handleClick}><MoreVertIcon /></IconButton>
          <RowMenu
            anchorEl={anchorEl}
            onClose={handleClose}
            id={id}
          />
        </TableCell>
      </TableRow>
    </>
  );

}
function RowByEvent({ id, ship, event, dateOrdered, description, from, status, port, dock, services, dateTime }: OrderByEvent) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //eslint-disable-next-line
  const serviceProviders = services ? services.map<number>(a => a.persons).reduce<number>((a,c) => c + a, 0 as number) : 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>
          <IconButton
            onClick={() => setOpen((a) => !a)}
          >
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
          </IconButton>
        </TableCell>
        <TableCell>{ship} </TableCell>
        <TableCell>{format(dateOrdered, "dd/MM HH:mm")}</TableCell>
        <TableCell>{status? <Chip  color="success" label="Hyväksytty" />:<Chip color="warning" label="Odottaa"/>} </TableCell>
        <TableCell>{from} </TableCell>
        <TableCell>{format(dateTime, "dd/MM HH:mm")} </TableCell>
        <TableCell>{port} </TableCell>
        <TableCell>{dock} </TableCell>
        <TableCell>{event} </TableCell>
        <TableCell>{serviceProviders} </TableCell>
        <TableCell>
          <IconButton onClick={handleClick}><MoreVertIcon /></IconButton>
          <RowMenu
            anchorEl={anchorEl}
            onClose={handleClose}
            id={id}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <CollapsibleCell description={description} services={services} open={open}/>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleCell = ({ services, open, description } : { description?: string, open: boolean, services: Service[]|undefined }) => {

  return (
    <TableCell padding="none" style={{  paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
      <Collapse  in={open} timeout="auto" unmountOnExit>
        <Box sx={{  margin: 2 }} >
          <DividedCard
            left={
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
            }
            right={
              <TextField
                id="standard-textarea"
                label="Huomioitavaa"
                multiline
                rows={ description ? 6: 0}
                fullWidth={ description ? true: false}
                variant="standard"
                value={description}
                disabled
              />
            }
          />
        </Box>
      </Collapse>
    </TableCell>
  );
};

export default function OrdersList({ orders } :{ orders : Order[] }) {

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Alus</TableCell>
            <TableCell>Tilattu</TableCell>
            <TableCell>Tila</TableCell>
            <TableCell>Tilaaja</TableCell>
            <TableCell>Aika</TableCell>
            <TableCell>Satama</TableCell>
            <TableCell>Laituri</TableCell>
            <TableCell>Tapahtuma</TableCell>
            <TableCell>Henkilöt</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { orders.map((row) => {
            if("services" in row) return <RowByEvent key={row.id} {...row} />;
            return <RowByHourlyWork key={row.id} {...row} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


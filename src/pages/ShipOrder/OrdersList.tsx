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
import { OrderByEvent, Status, Order, OrderByHourlyWork } from "Types";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useModifyStorage, useSubscribeOrders } from "hooks/useStorage";


interface RowMenuProps {
  anchorEl : null | HTMLElement
  onClose: () => void
  id: string
}
const RowMenu = ({ id, anchorEl, onClose }: RowMenuProps ) => {
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const { deleteOrderById } = useModifyStorage();
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
        <ListItemText onClick={() => deleteOrderById(id)}>Poista tilaus</ListItemText>
      </MenuItem>
    </Menu>
  );
};
function RenderStatus (status: Status) {
  if(status === "pending") return <Chip color="warning" label="Pending"/>;
  return <Chip  color="success" label="Accepted" />;
}

function Row(props: { order : Order }) {
  const { order } = props;
  const { type, status, dateOrdered, dateBegin, id, client, port } = order;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function selectCellByType(cellNum: number ){
    if(order.type==="event"){
      switch(cellNum){
      case 1:
        return order.ship;
      case 7:
        return order.dock;
      case 8:
        return order.event;
      case 9:
        return order.services.map<number>(a => a.persons).reduce<number>((a,c) => c + a, 0 as number);
      default:
        return null;
      }
    }
    if(type==="hourwork"){
      switch(cellNum){
      case 8:
        return `${order.duration}h tuntityö`;
      case 9:
        return order.persons;
      default:
        return null;
      }
    }
    return null;
  }
  return(
    <>
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
        <TableCell>{selectCellByType(1)}</TableCell>
        <TableCell>{dateOrdered ? format(dateOrdered, "dd/MM HH:mm") : ""}</TableCell>
        <TableCell>{RenderStatus(status)}</TableCell>
        <TableCell>{client} </TableCell>
        <TableCell>{format(dateBegin, "dd/MM HH:mm")} </TableCell>
        <TableCell>{port} </TableCell>
        <TableCell>{selectCellByType(7)}</TableCell>
        <TableCell>{selectCellByType(8)}</TableCell>
        <TableCell>{selectCellByType(9)}</TableCell>
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
        <CollapsibleCell open={open}>
          { order.type === "event" ? <Event order={order} /> : <Hourly order={order}/>}
        </CollapsibleCell>
      </TableRow>
    </>
  );
}
const CollapsibleCell = ({  open, children } : { open: boolean, children: React.ReactNode }) => {
  return(
    <TableCell padding="none" style={{  paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
      <Collapse  in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </TableCell>
  );
};
const Event = ( props: { order: OrderByEvent }) => {
  const { services, description, id }  = props.order;
  return (
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
                <TableRow key={`${row.place}-${id}`}>
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
  );
};
const Hourly = (props :{ order: OrderByHourlyWork }) => {
  const { description } = props.order;
  return (
    <Box sx={{  margin: 2 }} >
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
    </Box>
  );
};

export default function OrdersList() {

  const { orders } = useSubscribeOrders();

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
          { orders.map((row) => <Row key={row.id} order={row}/>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


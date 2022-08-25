import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Order } from "Types";
import CollapsibleTable from "./OrderList";
import { getOrders } from "storage/readAndWriteOrders";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, Outlet } from "react-router-dom";

const ShipOrder = () => {
  const [ orders, setOrders ] = useState<Order[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    //muokkaa hakemaan serveriltä data
    setOrders(getOrders());
  }, []);

  return(
    <Container component={Paper} sx={{ padding: 2 }}>
      <Box component="div" sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => navigate("/create/new")}
        >
          Lisää uusi tilaus
        </Button>
      </Box>
      <CollapsibleTable orders={orders} />
      <Outlet />
    </Container>
  );
};

export default ShipOrder;


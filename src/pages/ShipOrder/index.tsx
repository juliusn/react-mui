import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Order } from "../../Types";
import CollapsibleTable from "./OrderList";
import { getOrders } from "../../storage/readAndWriteOrders";

const ShipOrder = () => {
  const [ orders, setOrders ] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return(
    <Container>
      <CollapsibleTable orders={orders} />
    </Container>
  );
};

export default ShipOrder;


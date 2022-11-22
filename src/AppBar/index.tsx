import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MediumDisplay from "./MediumDisplay";

export interface PageFields {
  name: string
  path: string
}
const pages: PageFields[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Port Events",
    path: "/port-events",
  },
  {
    name: "Ship Order",
    path: "/ship-order",
  },
];
const ResponsiveAppBar = () => {
  const title = "Application";

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <MediumDisplay title={title} pages={pages} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

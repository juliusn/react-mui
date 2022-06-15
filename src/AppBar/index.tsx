import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import SmallDisplay from "./SmallDisplay";
import BigDisplay from "./BigDisplay";
import ToolbarUserMenu from "./ToolbarUserMenu";

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
        <Toolbar disableGutters>
          <SmallDisplay title={title} pages={pages} />
          <BigDisplay title={title} pages={pages} />
          <ToolbarUserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { PageFields } from "./index";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer({ pages } : { pages: PageFields[] }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const setOpen = () =>  setIsOpen(true);
  const setClose = () =>  setIsOpen(false);
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    navigate(href);
    setClose();
  };
  const list = () => (
    <Box
      role="presentation"
      onClick={setClose}
      onKeyDown={setClose}
      data-testid="drawer-listing"
    >
      <List>
        {pages.map(({ name, path }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton onClick={() => handleNavigate(path)}>
              <ListItemText data-testid={"drawer-listing-item"} primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div data-testid="drawer">
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={setOpen}
        color="inherit"
        data-testid="drawer-button"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={setClose}
      >
        {list()}
      </Drawer>
    </div>
  );
}


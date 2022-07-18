import React from "react";
import Typography from "@mui/material/Typography";
import { PageFields } from "./index";
import TemporaryDrawer from "./Drawer";
import ToolbarUserMenu from "./ToolbarUserMenu";

interface MediumDisplayProps {
  title: string
  pages: PageFields[]
}
const MediumDisplay = ({ title, pages }: MediumDisplayProps ) => {
  return(
    <>
      <TemporaryDrawer pages={pages} />
      <Typography
        variant="h6"
        component="div"
      >
        {title}
      </Typography>
      <ToolbarUserMenu />
    </>
  );
};
export default MediumDisplay;

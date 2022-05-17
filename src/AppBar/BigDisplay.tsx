import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PageFields } from "./index";
import { useNavigate } from "react-router-dom";

interface BigDisplayProps {
  title: string
  pages: PageFields[]
}
const BigDisplay = ({ title, pages }: BigDisplayProps ) => {
  const navigate = useNavigate();
  return(
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2,  display: { xs: "none", md: "flex" } }}
      >
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map(({ name, path }) => (
          <Button
            key={name}
            sx={{ my: 2, color: "white", display: "block" }}
            onClick={() => navigate(path)}
          >
            {name}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default BigDisplay;

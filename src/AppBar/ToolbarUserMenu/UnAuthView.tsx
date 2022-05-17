import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

const UnAuthView = () => {
  const navigate = useNavigate();
  return(
    <ButtonGroup variant="text" aria-label="text button group">
      <Button color="inherit" onClick={() => navigate("/")}>
        Login
      </Button>
      <Button color="inherit" onClick={() => navigate("/register")}>
        Register
      </Button>
    </ButtonGroup>
  );
};

export default UnAuthView;

import React, { useState } from "react";
import  Tooltip from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { logout } from "../../firebase";
import { UserProfileData } from "../../UserContextProvider";


interface RegisterViewProps {
  userProfile: UserProfileData
}

const AuthView = ( { userProfile }: RegisterViewProps ) => {
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement|null>(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };
  return(
    <>
      <Tooltip title={userProfile.name}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="logout" onClick={handleLogout}>
          <Typography textAlign="center">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
export default AuthView;

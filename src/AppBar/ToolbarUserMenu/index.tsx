import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useUserProfileContext } from "../../UserContextProvider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import UnAuthView from "./UnAuthView";
import AuthView from "./AuthView";

const UserMenu = () => {
  const { userProfile, loadingUserProfile } = useUserProfileContext();
  return(
    <Box sx={{ flexGrow: 0 }}>
      {loadingUserProfile
        ?  <UserMenuSkeleton />
        : userProfile
          ?  <AuthView userProfile={userProfile} />
          : <UnAuthView/>
      }
    </Box>
  );
};

const UserMenuSkeleton = () => (

  <IconButton
    size="large"
    disabled
    color="inherit"
    sx={{ p: 0 }}
  >
    <AccountCircle />
  </IconButton>
);

export default UserMenu;

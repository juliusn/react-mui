import React from "react";
import { logout } from "./firebase";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useUserProfileContext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { userProfile, loadingUserProfile } = useUserProfileContext();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ m: 2, p: 2 }}>
        <Stack spacing={2} direction="column">
          <Fade in={!loadingUserProfile}>
            <Box sx={{ px: 1, py: 0.75 }}>
              <div>
                {userProfile ? `Welcome, ${userProfile.name}!` : "No user information available."}
              </div>
            </Box>
          </Fade>
          <Fade in={loadingUserProfile}>
            <LinearProgress />
          </Fade>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              disabled={loadingUserProfile}
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
export default Dashboard;

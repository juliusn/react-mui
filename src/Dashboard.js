import React from "react";
import { logout } from "./firebase";
import Button from "@mui/material/Button";
import { Box, Container, Fade, LinearProgress, Paper, Stack } from "@mui/material";
import { useUserProfileContext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const { userProfile, loadingUserProfile } = useUserProfileContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingUserProfile) return;
    if (!userProfile) {
      navigate("/");
    }
  }, [userProfile, loadingUserProfile, navigate]);

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
                navigate("/");
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

import { Button, Container, Fade, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "./components/TextInput";
import { auth } from "./firebase";

function Reset() {
  const navigate = useNavigate();
  const [sendPasswordResetEmail, loading, error] = useSendPasswordResetEmail(auth);
  const reset = async ({ email }) => {
    await sendPasswordResetEmail(email);
    alert("Check your email and follow the provided link to reset your password.");
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      console.error(error.code, error.message);
      alert(`Error code "${error.code}". Message: ${error.message}`);
    }
  }, [error]);

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  return (
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ m: 2, p: 2 }}>
        <form onSubmit={handleSubmit(reset)}>
          <Stack spacing={2} direction="column">
            <Typography variant="h4">Reset Password</Typography>

            <TextInput
              name={"email"}
              control={control}
              label={"Email Address"}
              defaultValue=""
              rules={{
                required: "This field is required.",
              }}
            />
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                Send Reset Email
              </Button>
            </Stack>
            <Fade in={loading}>
              <LinearProgress />
            </Fade>
            <div>
              Don't have an account? <Link to="/register">Register here.</Link>
            </div>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
export default Reset;

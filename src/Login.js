import {
  Button,
  Container,
  Fade,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "./components/TextInput";
import { auth } from "./firebase";

function Login() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [signInWithEmailAndPassword, authUser, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  const login = async ({ email, password }) => signInWithEmailAndPassword(email, password);
  useEffect(() => {
    if (error) {
      switch (error.code) {
      case "auth/user-not-found":
        alert("This email has not been registered.");
        break;
      case "auth/wrong-password":
        alert("Wrong password.");
        break;
      default:
        console.error(error.code, error.message);
        alert(`Error code "${error.code}". Message: ${error.message}`);
      }
    }
  }, [authUser, error, navigate]);
  return (
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ m: 2, p: 2 }}>
        <form onSubmit={handleSubmit(login)}>
          <Stack spacing={2} direction="column">
            <Typography variant="h4">User Login</Typography>
            <TextInput
              name={"email"}
              control={control}
              label={"Email Address"}
              defaultValue=""
              rules={{
                required: "This field is required.",
              }}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "This field is required.",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={"Password"}
                  type={"password"}
                  error={!!error}
                  helperText={error ? error.message : null}
                  required
                  fullWidth
                />
              )}
            />
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                Login
              </Button>
            </Stack>
            <Fade in={loading}>
              <LinearProgress />
            </Fade>
            <div>
              <Link to="/reset">Forgot Password?</Link>
            </div>
            <div>
              Don`&apos;`t have an account? <Link to="/register">Register here.</Link>
            </div>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;

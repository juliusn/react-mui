import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { auth } from "./firebase";
import { Formik, Form } from "formik";
import FormikField from "./components/FormikField";
import * as Yup from "yup";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, authUser, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  const login = async ({ email, password }: FormData) => await signInWithEmailAndPassword(email, password);
  useEffect(() => {
    if (error) {
      switch (error.code) {
      case "auth/user-not-found":
        alert("Wrong email and/or password.");
        break;
      case "auth/wrong-password":
        alert("Wrong email and/or password.");
        break;
      default:
        console.error(error.code, error.message);
        alert(`Error code "${error.code}". Message: ${error.message}`);
      }
    }
  }, [authUser, error, navigate]);

  const initialValues: FormData = {
    email: "",
    password: "",
  };
  return (
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Formik
        validationSchema={ Yup.object({
          email: Yup.string().email("Field must be valid email").required("Field is required"),
          password: Yup.string().required("Field is required")
        })}
        initialValues={initialValues}
        onSubmit={ async (values) => {
          await login(values);
        }}
      >
        {() => (
          <Paper elevation={0} variant="outlined" sx={{ m: 2, p: 2 }}>
            <Form>
              <Stack spacing={2} direction="column">
                <Typography variant="h4">User Login</Typography>
                <FormikField
                  name={"email"}
                  label={"Email Address"}
                  autoComplete="email"
                />
                <FormikField
                  name={"password"}
                  label={"Password"}
                  autoComplete="current-password"
                  type="password"
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
                  Don&#39;t have an account? <Link to="/register">Register here.</Link>
                </div>
              </Stack>
            </Form>
          </Paper>
        )}
      </Formik>
    </Container>
  );
}

export default Login;

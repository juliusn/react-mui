import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { Formik, Form } from "formik";
import FormikField from "./components/FormikField";
import * as Yup from "yup";

interface FormData {
  email: string
}
function Reset() {
  const navigate = useNavigate();
  const [sendPasswordResetEmail, loading, error] = useSendPasswordResetEmail(auth);
  const reset = async ({ email }: FormData) => {
    await sendPasswordResetEmail(email);
    alert("Check your email and follow the provided link to reset your password.");
    navigate("/login");
  };

  useEffect(() => {
    if (!error) return;
    if("code" in error) {
      console.log(`Error code: "${error.code}". Message: ${error.message}`);
      alert(`Error code: "${error.code}". Message: ${error.message}`);
    }else{
      console.log(`Error name: "${error.name}". Message: ${error.message}`);
      alert(`Error name: "${error.name}". Message: ${error.message}`);
    }
  }, [error]);


  const initialValues: FormData= {
    email: "",
  };
  return (
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ m: 2, p: 2 }}>
        <Formik
          validationSchema={ Yup.object({
            email: Yup.string().email("Field must be valid email").required("This Field is required")
          })}
          initialValues={initialValues}
          onSubmit={ async (values) => {
            await reset(values);
          }}
        >
          {() => (
            <Form>
              <Stack spacing={2} direction="column">
                <Typography variant="h4">Reset Password</Typography>
                <FormikField
                  name={"email"}
                  label={"Email Address"}
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
                  Don&apos;t have an account? <Link to="/register">Register here.</Link>
                </div>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}
export default Reset;

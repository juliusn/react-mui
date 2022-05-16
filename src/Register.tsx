import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, writeBatch } from "firebase/firestore";
import { Formik, Form } from "formik";
import FormikField from "./components/FormikField";
import * as Yup from "yup";

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}
function Register() {
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, userCredential, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (error) {
      switch (error.code) {
      case "auth/email-already-in-use":
        alert("A user with this email address has already been registered.");
        break;
      default:
        console.log(error.code, error.message);
        alert(`Error code "${error.code}". Message: ${error.message}`);
      }
    }
    if (userCredential && userName) {
      const batch = writeBatch(db);
      const userRef = doc(db, "users", userCredential.user.uid);
      batch.set(userRef, {
        name: userName,
        email: userCredential.user.email,
      });
      const privilegesRef = doc(db, "users", userCredential.user.uid, "private", "privileges");
      batch.set(privilegesRef, {
        isSysAdmin: false,
        roles: {},
      });
      batch
        .commit()
        .then(() => {
          navigate("/dashboard");
        })
        .catch((error: Error) => {
          alert(error.message);
        });
    }
  }, [userCredential, userName, error, navigate]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ m: 2, p: 2 }}>
        <Formik
          validationSchema={ Yup.object({
            name: Yup.string().max(32, "This field cannot be longer than 32 characters").required("This field is reqired"),
            email: Yup.string().email("Field must be valid emal").max(32, "This field cannot be longer than 32 characters").required("This field is reqired"),
            password: Yup.string().min(8, "Password should be atleast 8 characters long.").required("This field is required"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),

          })}
          initialValues={initialValues}
          onSubmit={ async ({ name, email, password } : FormData) => {
            setUserName(name);
            await createUserWithEmailAndPassword(email, password);
          }}
        >
          {() => (
            <Form>
              <Stack spacing={2} direction="column">
                <Typography variant="h4">Register</Typography>
                <FormikField
                  name={"name"}
                  label={"Full Name"}
                  autoComplete="name"
                  required
                  fullWidth
                />
                <FormikField
                  name={"email"}
                  label={"Email Address"}
                  autoComplete="email"
                  required
                  fullWidth
                />
                <FormikField
                  label={"Password"}
                  type={"password"}
                  required
                  fullWidth
                  autoComplete="new-password"
                  name="password"
                />
                <FormikField
                  label={"Confirm Password"}
                  type={"password"}
                  autoComplete="new-password"
                  required
                  fullWidth
                  name="confirmPassword"
                />
                <Stack spacing={2} direction="row" justifyContent="center">
                  <Button variant="contained" color="primary" type="submit" disabled={loading}>
                    Register
                  </Button>
                </Stack>
                <Fade in={loading}>
                  <LinearProgress />
                </Fade>
                <div>
                  Already have an account? <Link to="/">Login here.</Link>
                </div>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default Register;

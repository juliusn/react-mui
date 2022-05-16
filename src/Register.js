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
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import TextInput from "./components/TextInput";
import { doc, writeBatch } from "firebase/firestore";

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
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [userCredential, userName, error, navigate]);

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { control, getValues, reset, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: defaultValues,
  });

  const register = async ({ name, email, password }) => {
    setUserName(name);
    createUserWithEmailAndPassword(email, password);
  };
  return (
    <Container maxWidth="sm" sx={{ pl: 0, pr: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ m: 2, p: 2 }}>
        <form onSubmit={handleSubmit(register)}>
          <Stack spacing={2} direction="column">
            <Typography variant="h4">Register</Typography>
            <TextInput
              name={"name"}
              control={control}
              label={"Full Name"}
              defaultValue=""
              rules={{
                required: "This field is required.",
                maxLength: {
                  value: 32,
                  message: "This field cannot be longer than 32 characters.",
                },
              }}
            />
            <TextInput
              name={"email"}
              control={control}
              label={"Email Address"}
              defaultValue=""
              rules={{
                required: "This field is required.",
                maxLength: {
                  value: 32,
                  message: "This field cannot be longer than 32 characters.",
                },
              }}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "This field is required.",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long.",
                },
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
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "This field is required.",
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords do not match.";
                  },
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={"Confirm Password"}
                  type={"password"}
                  error={!!error}
                  helperText={error ? error.message : null}
                  required
                  fullWidth
                />
              )}
            />
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button variant="contained" color="inherit" onClick={() => reset(defaultValues)}>
                Reset
              </Button>
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
        </form>
      </Paper>
    </Container>
  );
}

export default Register;

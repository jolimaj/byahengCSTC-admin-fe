import { React, useState, useEffect } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import BackroundIMG from "../../src/img/cover.jpg";
import Logo from "../../src/img/logo.png";
import Footer from "./Footer";
import axios from "../config/axios";

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/signin", { email, password });

      window.localStorage.setItem("session", JSON.stringify(res.data));
      window.location.href = "/admin/dashboard";
    } catch (error) {
      if (email === "" || password === "") {
        console.log("catch", error.response.data.error[0]);
        setErrorMsg(error.response.data.error[0]);
      } else {
        setErrorMsg(error.response.data.message);
      }
    }
  }
  function handleForgotPassword(e) {
    e.preventDefault();
    console.log(
      "🚀 ~ file: Login.js ~ line 50 ~ handleForgotPassword ~ handleForgotPassword"
    );
    window.location.replace("/signin/forgot-password");
  }
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("session")) !== null) {
      window.location.href = "/admin/dashboard";
    }
  }, []);
  return (
    <main>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackroundIMG})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={Logo} alt="Logo" />

            <Box component="form" noValidate sx={{ mt: 1 }}>
              {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    variant="body2"
                    component="button"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </main>
  );
}

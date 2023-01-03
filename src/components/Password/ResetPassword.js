import { React, useState } from "react";
import {
  Paper,
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
  Alert,
} from "@mui/material";
import BackroundIMG from "../../../src/img/cover.jpg";
import Logo from "../../../src/img/logo.png";
import Footer from "../Footer";
import axios from "../../config/axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [notsend, setnotsend] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/signin/forgot_password", { email });
      setnotsend(!notsend);
    } catch (error) {
      if (email === "") {
        setErrorMsg(error.response.data.error[0]);
      } else {
        setErrorMsg(error.response.data.message);
      }
    }
  }
  const handleChange = (e) => {
    setErrorMsg("");
    setEmail(e.target.value);
  };
  return (
    <Paper
      sx={{
        backgroundImage: `url(${BackroundIMG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "absolute",
        width: "100%",
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ marginY: 25 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: 5,
            boxShadow: 2,
          }}
        >
          <img src={Logo} alt="Logo" />
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            {errorMsg && (
              <Alert severity="error" style={{ textTransform: "capitalize" }}>
                {errorMsg}
              </Alert>
            )}

            {notsend ? (
              <Box>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  color="primary"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Forgot password
                </Typography>
                <Typography variant="body2" gutterBottom component="div">
                  You have successfully submitted your request to reset
                  password. Please check your email for instructions.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </Paper>
  );
}

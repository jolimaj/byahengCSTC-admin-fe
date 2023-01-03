import { React, useState } from "react";
import {
  Paper,
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Alert,
} from "@mui/material";
import BackroundIMG from "../../../src/img/cover.jpg";
import Logo from "../../../src/img/logo.png";
import Footer from "../Footer";
import axios from "../../config/axios";
import { useParams } from "react-router-dom";

export default function NewPassword() {
  let { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [notsend, setnotsend] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.put(`/signin/password-reset/${id}/${token}`, {
        password,
      });
      console.log(
        "🚀 ~ file: NewPassword.js ~ line 29 ~ handleSubmit ~ res",
        res
      );
      setnotsend(!notsend);
      window.location.href = "/";
    } catch (error) {
      if (password === "") {
        setErrorMsg(error.response.data.error[0]);
      } else {
        setErrorMsg(error.response.data.message);
      }
    }
  }
  const handleChange = (e) => {
    setPassword(e.target.value);
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {errorMsg && (
              <Alert severity="error" style={{ textTransform: "capitalize" }}>
                {errorMsg}
              </Alert>
            )}
            <Box>
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
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Paper>
  );
}

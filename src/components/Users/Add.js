import { React, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import axios from "../../config/axios";
import Snack from "../Snack";

export default function AddAdmin(props) {
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const req = await axios.post(`/admin/user/add`, {
        first_name,
        last_name,
        address,
        mobile,
        email,
      });
      setSuccess(req.data.message);
      window.location.reload(false);
    } catch (error) {
      if (
        first_name === "" ||
        last_name === "" ||
        address === "" ||
        email === "" ||
        mobile === ""
      ) {
        console.log("catch", error.response.data.error[0]);
        setErrorMsg(error.response.data.error[0]);
      } else {
        setErrorMsg(error.response.data.message);
      }
    }
  }
  const handleChange = (e) => {
    if (e.target.name === "first_name") {
      setFname(e.target.value);
    } else if (e.target.name === "last_name") {
      setLname(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setMobile(e.target.value);
    }
  };
  return (
    <main>
      <Typography
        variant="h6"
        color="primary"
        fontFamily="PoppinsBold"
        gutterBottom
      >
        Courses
      </Typography>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" gutterBottom>
            New Course
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {errorMsg && (
                <Alert severity="error" style={{ textTransform: "capitalize" }}>
                  {errorMsg}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="first_name"
                name="first_name"
                label="First Name"
                fullWidth
                autoComplete="given-course"
                variant="standard"
                value={first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="last_name"
                name="last_name"
                label="Last Name"
                fullWidth
                autoComplete="given-course-code"
                variant="standard"
                value={last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="given-course-code"
                variant="standard"
                value={address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                autoComplete="given-course-code"
                variant="standard"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="mobile"
                name="mobile"
                label="Mobile Number"
                fullWidth
                autoComplete="given-course-code"
                variant="standard"
                value={mobile}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button sx={{ mt: 3, ml: 1 }} onClick={props.cancelClick}>
              cancel
            </Button>

            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
      <Snack values={success} />
    </main>
  );
}

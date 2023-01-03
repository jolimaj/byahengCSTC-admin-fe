import { React, useState, useEffect } from "react";
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

export default function EditTrivia(props) {
  const records = props.data;
  const [name, setName] = useState(records.name);
  const [description, setDescription] = useState(records.description);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const req = await axios.put(`/trivia/${records.id}`, {
        name,
        description,
      });
      console.log("🚀 ~ file: Update.js ~ line 29 ~ handleSubmit ~ req", req);
      setSuccess(req.data.message);
      //window.location.reload(false);
    } catch (error) {
      if (name === "" || description === "") {
        setErrorMsg("Fields not allowed to be empty!");
      } else {
        setErrorMsg(error.response.data.message);
      }
    }
  }
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };
  const handleBack = () => {
    window.location.reload(false);
  };
  return (
    <main>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" gutterBottom>
            Edit Trivia
          </Typography>
          <Grid container spacing={3} component="form">
            <Grid item xs={12}>
              {errorMsg && (
                <Alert severity="error" style={{ textTransform: "capitalize" }}>
                  {errorMsg}
                </Alert>
              )}
              <TextField
                required
                id="name"
                name="name"
                label="Question"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Answer"
                fullWidth
                autoComplete="given-description"
                variant="standard"
                value={description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button sx={{ mt: 3, ml: 1 }} onClick={handleBack}>
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

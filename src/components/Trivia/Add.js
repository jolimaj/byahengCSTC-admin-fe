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

export default function AddTrivia(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(
      "🚀 ~ file: Add.js ~ line 24 ~ handleFileSelect ~ event.target.files[0]",
      event.target.files[0]
    );
  };
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("images", selectedFile);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const req = await axios.post(`/trivia`, formData);
      setSuccess(req.data.message);
      window.location.reload(false);
    } catch (error) {
      if (name === "" || description === "" || selectedFile === "") {
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
  return (
    <main>
      <Typography
        variant="h6"
        color="primary"
        fontFamily="PoppinsBold"
        gutterBottom
      >
        Trivia
      </Typography>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" gutterBottom>
            New Trivia
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
            <Grid item xs={12}>
              <input
                id="images"
                name="images"
                type="file"
                onChange={handleFileSelect}
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

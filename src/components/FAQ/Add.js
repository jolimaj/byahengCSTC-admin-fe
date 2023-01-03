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

export default function AddCampus(props) {
  const [question, setName] = useState("");
  const [answer, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const req = await axios.post(`/faq`, { question, answer });
      setSuccess(req.data.message);
      window.location.reload(false);
    } catch (error) {
      if (question === "" || answer === "") {
        console.log("catch", error.response.data.error[0]);
        setErrorMsg(error.response.data.error[0]);
      } else {
        setErrorMsg(error.response.data.message);
      }
    }
  }
  const handleChange = (e) => {
    if (e.target.name === "question") {
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
        Frequently Ask Question
      </Typography>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" gutterBottom>
            New Frequently Ask Question
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {errorMsg && (
                <Alert severity="error" style={{ textTransform: "capitalize" }}>
                  {errorMsg}
                </Alert>
              )}
              <TextField
                required
                id="question"
                name="question"
                label="Question"
                fullWidth
                autoComplete="given-question"
                variant="standard"
                value={question}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="answer"
                name="answer"
                label="Answer"
                fullWidth
                autoComplete="given-answer"
                variant="standard"
                value={answer}
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

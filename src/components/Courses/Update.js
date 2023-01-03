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

export default function EditCourse(props) {
  const records = props.data;
  const [name, setName] = useState(records.name);
  const [courseCode, setCourseCode] = useState(records.courseCode);
  const [slot, setSlot] = useState(records.slot);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const req = await axios.put(`/courses/${records.id}`, {
        name,
        courseCode,
        slot,
      });
      setSuccess(req.data.message);
      window.location.reload(false);
    } catch (error) {
      if (name === "" || slot === "" || courseCode === "") {
        console.log("catch", error.response.data.error[0]);
        setErrorMsg(error.response.data.error[0]);
      } else {
        setErrorMsg(error.response.data.message);
      }
    }
  }
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "code") {
      setCourseCode(e.target.value);
    } else {
      setSlot(e.target.value);
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
            Edit Course
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
                id="name"
                name="name"
                label="Course Name"
                fullWidth
                autoComplete="given-course"
                variant="standard"
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="courseCode"
                name="code"
                label="Course Code"
                fullWidth
                autoComplete="given-course-code"
                variant="standard"
                value={courseCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="slot"
                name="slot"
                label="Slot"
                fullWidth
                autoComplete="slot"
                variant="standard"
                value={slot}
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

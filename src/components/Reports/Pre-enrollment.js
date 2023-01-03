import { React, useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import axios from "../../config/axios";

export default function PreEnrollment() {
  const [count, setCount] = useState("");
  useEffect(() => {
    axios.get("/user/pre_enrollment/count").then((response) => {
      setCount(response.data);
    });
  }, []);
  return (
    <Box>
      <Typography
        variant="h6"
        color="primary"
        fontFamily="PoppinsBold"
        gutterBottom
      >
        Daily Pre-Enrollment
      </Typography>{" "}
      <Typography component="p" variant="h4">
        {count}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date().toDateString()}
      </Typography>
    </Box>
  );
}

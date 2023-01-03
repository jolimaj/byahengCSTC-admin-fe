import { React, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import axios from "../../config/axios";

export default function Survey() {
  const [survey, setSurvey] = useState([]);
  useEffect(() => {
    axios.get("/survey/counts").then((response) => {
      setSurvey(response.data);
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
        Survey Result
      </Typography>{" "}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Ratings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {survey.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {survey.length === 0 && (
        <Stack sx={{ textAlign: "center", padding: 5, width: "100%" }}>
          No record
        </Stack>
      )}
    </Box>
  );
}

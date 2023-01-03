import { React, useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import axios from "../../config/axios";

const columns = [
  { id: "name", label: "Name", minWidth: 200 },
  { id: "email", label: "Email Address", minWidth: 150 },
  { id: "role", label: "Role", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 150 },
  { id: "actions", label: "", minWidth: 200 },
];

export default function StickyHeadTable(props) {
  const [rows, setRows] = useState([]);
  console.log("🚀 ~ file: List.js ~ line 27 ~ StickyHeadTable ~ rows", rows);

  useEffect(() => {
    axios.get("/user").then((response) => {
      console.log(
        "🚀 ~ file: List.js ~ line 31 ~ axios.get ~ response",
        response
      );
      setRows(response.data);
    });
  }, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  async function handleAccept(e) {
    const req = await axios.put(`/admin/user/${e}`);
    window.location.reload(false);
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h6"
        color="primary"
        fontFamily="PoppinsBold"
        gutterBottom
      >
        User
      </Typography>
      <Button variant="contained" sx={{ my: 1 }} onClick={props.addClick}>
        Add Other Administrator
      </Button>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.email}
                    >
                      <TableCell align="left">{`${row.first_name} ${row.last_name}`}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">
                        {row.roleID === 1
                          ? "Admin"
                          : row.roleID > 2
                          ? "Visitor"
                          : "Student"}
                      </TableCell>
                      <TableCell align="left">
                        {row.status === 0 ? "Pending" : "Accepted"}
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="text"
                          color={row.status === 0 ? "primary" : "error"}
                          onClick={() => {
                            handleAccept(row.id);
                          }}
                        >
                          {row.status === 0 ? "Accept" : "Reject"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length === 0 && (
          <Stack spacing={2}>
            <Paper sx={{ textAlign: "center", padding: 5 }}>No record</Paper>
          </Stack>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

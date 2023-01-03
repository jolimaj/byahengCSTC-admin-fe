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
import DeleteModal from "../DeleteModal";
import Update from "./Update";
import axios from "../../config/axios";

const columns = [
  { id: "question", label: "Question", minWidth: 200 },
  { id: "answer", label: "Answer", minWidth: 150 },
  { id: "actions", label: "", minWidth: 200 },
];

export default function StickyHeadTable(props) {
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState(false);
  const [updateData, setupdateData] = useState("");
  const [id, setID] = useState("");
  useEffect(() => {
    axios.get("/trivia").then((response) => {
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

  const handleOpen = (value) => {
    setID(value);
    setModal(!modal);
  };
  const handleDelete = () => {
    axios.delete(`/trivia/${id}`);
    window.location.reload(false);
  };
  const closeDelete = () => {
    setModal(false);
  };
  const handleEdit = (value) => {
    setupdateData(value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h6"
        color="primary"
        fontFamily="PoppinsBold"
        gutterBottom
      >
        Trivia
      </Typography>
      {updateData === "" && (
        <Box>
          <Button variant="contained" sx={{ my: 1 }} onClick={props.addClick}>
            Add New Trivia
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
                          key={row.name}
                        >
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">
                            <img src={row.images} alt="Logo" width="100" />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="text"
                              onClick={() => handleEdit(row)}
                            >
                              Update
                            </Button>
                            <Button
                              variant="text"
                              color="error"
                              onClick={() => handleOpen(row.id)}
                            >
                              Delete
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
                <Paper sx={{ textAlign: "center", padding: 5 }}>
                  No record
                </Paper>
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
      )}
      <DeleteModal
        values={modal}
        openModal={closeDelete}
        deleteItem={handleDelete}
      />
      {updateData !== "" && <Update data={updateData} />}
    </Box>
  );
}

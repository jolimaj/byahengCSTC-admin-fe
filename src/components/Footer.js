import * as React from "react";
import { Box, Typography, Link, Container, CssBaseline } from "@mui/material";

export default function FixedBottomNavigation() {
  function Copyright() {
    return (
      <Typography variant="body2" color="secondary" align="center">
        {" © "}
        <Link
          color="secondary"
          underline="none"
          href="https://byaheng-cstc.herokuapp.com/"
        >
          CSTC COLLEGE OF SCIENCES, TECHNOLOGY AND COMMUNICATIONS, INC.
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <Box>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "primary.main",
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

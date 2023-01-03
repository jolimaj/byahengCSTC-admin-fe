import { React, useState, useEffect } from "react";
import List from "./List";
import Add from "./Add";
import { Box, Toolbar, Container, Grid } from "@mui/material";
import Footer from "../Footer";
import NavBar from "../NavBars";

export default function Course() {
  const [display, setDisplay] = useState("list");
  const handleAdd = async () => {
    setDisplay("add");
  };
  const handleCancel = async () => {
    setDisplay("list");
  };
  let [nav, setNav] = useState(0);
  const handleNav = (event, index) => {
    switch (index) {
      case 1:
        window.location.href = "/admin/courses";
        break;
      case 2:
        window.location.href = "/admin/campuses";
        break;
      case 3:
        window.location.href = "/admin/faqs";
        break;
      case 4:
        window.location.href = "/admin/trivias";
        break;
      case 5:
        window.location.href = "/admin/activities";
        break;
      case 6:
        window.location.href = "/admin/users";
        break;
      default:
        window.location.href = "/admin/dashboard";
    }
    setNav(index);
  };
  const session = JSON.parse(localStorage.getItem("session"));
  useEffect(() => {
    if (session === null) {
      window.location.href = "/signin";
    }
  }, []);
  return (
    <main>
      <Box sx={{ display: "flex" }}>
        <NavBar navClick={handleNav} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 50 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                {display == "list" && <List addClick={handleAdd} />}
                {display == "add" && <Add cancelClick={handleCancel} />}
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </Box>
      </Box>
    </main>
  );
}

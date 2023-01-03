import { React, useState } from "react";
import {
  Box,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Quiz,
  School,
  Dashboard,
  HistoryEdu,
  Celebration,
  People,
  Apartment,
} from "@mui/icons-material";
import Header from "./Header";
import axios from "../config/axios";
import { useLocation } from "react-router-dom";

const drawerWidth = 280;

export default function NavBar(props) {
  const location = useLocation();

  const sideBar = [
    { name: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
    { name: "Courses", icon: <School />, path: "/admin/courses" },
    { name: "Campuses", icon: <Apartment />, path: "/admin/campuses" },
    {
      name: "Frequently ask Question",
      icon: <Quiz />,
      path: "/admin/faqs",
    },
    { name: "Trivia", icon: <HistoryEdu />, path: "/admin/trivias" },
    { name: "Activity", icon: <Celebration />, path: "/admin/activities" },
    { name: "Users", icon: <People />, path: "/admin/users" },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <main>
      <CssBaseline />
      <Header />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {sideBar.map((value, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={location.pathname === value.path}
                  onClick={(event) => {
                    props.navClick(event, index);
                    setSelected(index);
                  }}
                >
                  <ListItemIcon color="primary">{value.icon}</ListItemIcon>
                  <ListItemText primary={value.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </main>
  );
}

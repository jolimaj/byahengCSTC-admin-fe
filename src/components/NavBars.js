import { React, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Quiz,
  School,
  Dashboard,
  HistoryEdu,
  Celebration,
  People,
  Apartment,
  ChevronLeft,
  AccountCircle,
  Logout,
  Person,
} from "@mui/icons-material";
import {
  CssBaseline,
  Box,
  Toolbar,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  ListItem,
  ListItemIcon,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Logo from "../../src/img/logo.png";
import axios from "../config/axios";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function NavBar(props) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const session = JSON.parse(localStorage.getItem("session"));
  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.put(`/signout/${session.data.id}`);
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.log("catch", error);
    }
  }
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{ mt: "45px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <ListItemButton>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {session.data.id > 1 ? session.data.first_name : "Byaheng CSTC"}
          </ListItemText>
        </ListItemButton>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItemButton>
      </MenuItem>
    </Menu>
  );
  return (
    <main>
      <CssBaseline />
      <AppBar position="absolute" open={open} color="secondary">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          ></Typography>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle color="primary" />
          </IconButton>
          {renderMenu}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          {" "}
          <Box
            component="img"
            src={Logo}
            alt="logo"
            sx={{
              display: { xs: "none", md: "flex" },
              width: 200,
            }}
          />
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft color="primary" />
          </IconButton>
        </Toolbar>
        <Divider />
        {sideBar.map((value, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={location.pathname === value.path}
              onClick={(event) => {
                props.navClick(event, index);
                setSelected(index);
              }}
              style={{
                fontFamily: "bold",
                color: location.pathname === value.path ? "#134611" : "#666",
              }}
            >
              <ListItemIcon>{value.icon}</ListItemIcon>
              <ListItemText>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily:
                      location.pathname === value.path
                        ? "PoppinsBold"
                        : "PoppinsRegular",
                  }}
                >
                  {value.name}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </Drawer>
    </main>
  );
}

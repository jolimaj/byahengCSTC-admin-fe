import { React, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/config/theme";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Course from "./components/Courses/Index";
import Campus from "./components/Campus/Index";
import FAQ from "./components/FAQ/Index";
import Trivia from "./components/Trivia/Index";
import Activity from "./components/Activity/Index";
import User from "./components/Users/Index";
import ResetPassword from "./components/Password/ResetPassword";
import NewPassword from "./components/Password/NewPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="admin/dashboard" element={<Dashboard />} />
          <Route exact path="admin/campuses" element={<Campus />} />
          <Route exact path="admin/courses" element={<Course />} />
          <Route exact path="admin/users" element={<User />} />
          <Route exact path="admin/faqs" element={<FAQ />} />
          <Route exact path="admin/activities" element={<Activity />} />
          <Route exact path="admin/trivias" element={<Trivia />} />
          <Route
            exact
            path="signin/forgot-password"
            element={<ResetPassword />}
          />
          <Route
            exact
            path={`signin/password-reset/:id/:token`}
            element={<NewPassword />}
          />
          <Route
            exact
            path={`signin/password-setup/:id/:token`}
            element={<NewPassword />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

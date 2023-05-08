import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home/Home";
import Navbar from "./components/ui/layout/Navbar";
import Login from "./Pages/Auth/Login";
import { createTheme, ThemeProvider } from "@mui/material";
import Register from "./Pages/Auth/Register";

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d3557",
      },
      secondary: {
        main: "#e63946",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main className="p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

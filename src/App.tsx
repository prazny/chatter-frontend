import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./Pages/Home/Home";
import Navbar from "./components/ui/layout/Navbar";
import Login from "./Pages/Auth/Login";
import { createTheme, ThemeProvider } from "@mui/material";
import Register from "./Pages/Auth/Register";
import UserProfile from "./Pages/User/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "./services/auth";
import { logout, setCredentials } from "./store/authSlice";
import ProtectedRoute from "./components/ui/layout/ProtectedRoute";

export default function App() {
  // @ts-ignore
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));

  }, [data, dispatch]);

  console.log(data);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main className="p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </main>
    </ThemeProvider>
  );
}

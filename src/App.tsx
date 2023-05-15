import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Home from "./Pages/Home/Home";
import Navbar from "./components/ui/layout/Navbar";
import Login from "./Pages/Auth/Login";
import {createTheme, ThemeProvider} from "@mui/material";
import Register from "./Pages/Auth/Register";
import UserProfile from "./Pages/User/Profile";
import {useDispatch, useSelector} from "react-redux";
import {useGetUserDetailsQuery} from "./services/auth";
import {logout, setCredentials} from "./store/authSlice";
import ProtectedRoute from "./components/ui/layout/ProtectedRoute";
import Box from "@mui/material/Box";
import Sidebar from "./components/ui/layout/Sidebar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/ui/layout/Layout";
import {ToastContainer} from "react-toastify";

export default function App() {
    // @ts-ignore

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
    const {data, isFetching} = useGetUserDetailsQuery("userDetails", {
        // perform a refetch every 15mins
        pollingInterval: 900000,
    });

    useEffect(() => {
        if (data) dispatch(setCredentials(data));
    }, [data, dispatch]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/user-profile" element={<UserProfile/>}/>
                    </Route>
                </Routes>
            </Layout>
        </ThemeProvider>
    );
}

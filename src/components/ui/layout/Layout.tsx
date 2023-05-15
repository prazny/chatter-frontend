import React from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Toolbar from "@mui/material/Toolbar";
import {useSelector} from "react-redux";
import GuestNavbar from "./GuestNavbar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Layout(props: { children: any; }) {
    // @ts-ignore
    const {userToken} = useSelector((state) => state.auth);

    const userNavbarSidebar = (
        <>
            <Navbar/>
            <Sidebar/>
        </>
    );

    const guestNavbarSidebar = (
        <>
            <GuestNavbar/>
        </>
    );

    return (
        <>
            <Box sx={{display: 'flex'}}>
                {(userToken && userNavbarSidebar) || guestNavbarSidebar}
                <Box component="main" sx={{flexGrow: 1, p: 0}}>
                    <Toolbar/>
                    {props.children}
                </Box>
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default Layout;
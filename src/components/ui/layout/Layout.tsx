import React from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Toolbar from "@mui/material/Toolbar";
import {useSelector} from "react-redux";
import GuestNavbar from "./GuestNavbar";

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
        <Box sx={{display: 'flex'}}>
            {(userToken  && userNavbarSidebar) || guestNavbarSidebar}
            <Box component="main" sx={{flexGrow: 1, p: 0}}>
                <Toolbar/>
                {props.children}
            </Box>
        </Box>
    );
}

export default Layout;
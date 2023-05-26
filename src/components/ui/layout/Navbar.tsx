import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
// @ts-ignore
import chatter from "./../../../assets/chatter.png";
// @ts-ignore
import logo from "./../../../assets/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../store/authSlice";
import GuestNavbar from "./GuestNavbar";
import { Link } from "react-router-dom";

const pages = [
    ["Sites", "/sites"],
    ["Chats", "/chats"],
    ["Stats", "/stats"]
];
const settings = ["Profile", "Logout"];

function Navbar() {
    const dispatch = useDispatch();
    const {userToken, userInfo} = useSelector(
        // @ts-ignore
        (state) => state.auth
    );
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutCl = () => {
        setAnchorElUser(null);
        // @ts-ignore
        dispatch(logout());
    };

    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Container maxWidth="xl">
                <Toolbar>
                    <img src={logo} width="30px" alt="Chatter logo"/>
                    <Box
                        sx={{
                            mr: 2,
                            display: {xs: "none", md: "flex"},
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <img src={chatter} width="100px" alt="Chatter text"/>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: "block", md: "none"},
                            }}
                        >
                            {userToken &&
                                pages.map((page) => (
                                    <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page[0]}</Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: "flex", md: "none"}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: "flex", md: "none"},
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <img src="./../../../assets/chatter.png" alt="Chatter text"/>
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                        {userToken &&
                            pages.map((page) => (
                                <Link to={page[1]}>
                                    <Button
                                        key={page[0]}
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: "white", display: "block"}}
                                    >
                                        {page[0]}
                                    </Button>
                                </Link>
                            ))}
                    </Box>

                    <Typography
                        sx={{
                            mr: 2,
                        }}
                    >
                        {userInfo && userInfo.firstName} {userInfo && userInfo.lastName}
                    </Typography>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: "45px"}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="logout" onClick={logoutCl}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;

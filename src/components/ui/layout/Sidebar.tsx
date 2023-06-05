import React from "react";
import Drawer from '@mui/material/Drawer';
import Toolbar from "@mui/material/Toolbar";
import ChatsManager from "../../../features/chatList/ChatsManager";

function Sidebar() {
    const drawerWidth = 800;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                zIndex: (theme) => theme.zIndex.drawer,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <ChatsManager />
        </Drawer>
    );
}

export default Sidebar;
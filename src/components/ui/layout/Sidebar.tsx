import React from "react";
import {styled} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function Sidebar() {
    const drawerWidth = 400;

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
            <Box sx={{overflow: 'auto'}}>
                <List>
                    {['Chats here', 'Chats here', 'Chats here'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['Chats here', 'Chats here', 'Chats here'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar;
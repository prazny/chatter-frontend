import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import React from "react";
import ChatsTable from "./ChatsTable";

export function ChatsManager() {
    return (
        <Box sx={{overflow: 'auto'}}>
            <ChatsTable />
            <Divider/>
        </Box>
    );
}
/*
<List>
                {['Chats here 1', 'Chats here 2', 'Chats here 3'].map((text, index) => (
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
 */

export default ChatsManager;
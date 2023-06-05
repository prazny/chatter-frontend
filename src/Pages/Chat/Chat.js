import React from "react";
import Grid from "@mui/material/Grid";
import womanChatting from "../../assets/backgrounds/woman-chatting.jpg";
import Box from "@mui/material/Box";
import RoundedBox from "../../components/ui/RoundedBox";
import Typography from "@mui/material/Typography";
import AddSite from "../Sites/parts/AddSite";
import SitesTable from "../Sites/parts/SitesTable";
import {useParams} from "react-router-dom";
import {useGetChatQuery} from "../../services/chats";
import {Conversation} from "../../features/conversation/Conversation";
import {Divider} from "@mui/material";

export default function Chat() {
    const {id} = useParams();
    const {data, errors, isLoading} = useGetChatQuery(id);
    console.log(data)

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} sx={{mt: 5}}>
                <Grid container spacing={2} sx={{ml: 2}}>
                    <Grid item>
                        <Typography variant="h6">
                            {isLoading && "Loading..."}
                            {!isLoading && "Chat with " + data.customerName}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{m: 1}}>
                <Box>
                    <Divider/>
                    {!isLoading && <Conversation nickname={data.customerName}/>}
                </Box>

            </Grid>
        </Grid>


    );

}
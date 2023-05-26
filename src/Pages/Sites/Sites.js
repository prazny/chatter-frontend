import Grid from "@mui/material/Grid";
import womanChatting from "../../assets/backgrounds/woman-chatting.jpg";
import Box from "@mui/material/Box";
import RoundedBox from "../../components/ui/RoundedBox";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React from "react";
import {useGetSitesQuery} from "../../services/sites";
import SitesTable from "./parts/SitesTable";
import AddSite from "./parts/AddSite";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

function Sites() {

    const {data, errors, isLoading} = useGetSitesQuery();

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}
                  sx={{
                      backgroundImage: `url(${womanChatting})`,
                      backgroundRepeat: "no-repeat",
                      backgroundColor: (t) =>
                          t.palette.mode === "light"
                              ? t.palette.grey[50]
                              : t.palette.grey[900],
                      height: "30vh",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                  }}>
                <Box>

                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{mt: -7}}>
                <RoundedBox>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="h6">
                                Your sites
                            </Typography>
                        </Grid>
                    </Grid>
                </RoundedBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{m: 4}}>
                <AddSite />
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{m: 4}}>
                <SitesTable/>
            </Grid>
        </Grid>


    );
}

export default Sites;
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

function UserProfile() {
  const { loading, userInfo, error, success } = useSelector(
    // @ts-ignore
    (state) => state.auth
  );


  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5}>

      </Grid>
    </Grid>
  );
}

export default UserProfile;

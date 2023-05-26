import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import womanChatting from "../../assets/backgrounds/woman-chatting.jpg";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RoundedBox from "../../components/ui/RoundedBox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { usePatchUserMutation } from "../../services/auth";
import { toast } from "react-toastify";
import ErrorSpan from "../../components/ui/ErrorSpan";

function UserProfile() {
  const { loading, userInfo, success } = useSelector(
    (state: any) => state.auth
  );
  const { register, handleSubmit, reset } = useForm();
  const [patchUser, { error }] = usePatchUserMutation();

  const submitForm = (data: any) => {
    console.log(data.password);
    patchUser({ password: data.password })
      .unwrap()
      .then((payload) => {
        toast.success("Password updated");
        reset();
      })
      .catch((e) => {
        toast.error("Errors occured");
      });
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
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
        }}
      >
        <Box></Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ mt: -7 }}>
        <RoundedBox>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: "#1d3557",
                }}
                variant="rounded"
              >
                {userInfo &&
                  userInfo.firstName &&
                  userInfo.firstName.slice(0, 2)}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {userInfo && userInfo.firstName} {userInfo && userInfo.lastName}
              </Typography>
              <Typography variant="overline">
                {userInfo && userInfo.email}
              </Typography>
            </Grid>
          </Grid>
        </RoundedBox>
      </Grid>
      <Grid item md={6}>
        <RoundedBox>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(submitForm)}
          >
            <Typography variant="overline" gutterBottom>
              Update password
            </Typography>
            <Typography>
              Passwords are used as a security measure to protect access to
              sensitive information or resources, and updating them regularly
              helps to reduce the risk of unauthorized access or data breaches.
            </Typography>
            <TextField
              error={
                error &&
                (error as any)?.data.errors.password &&
                (error as any)?.data.errors.password[0]
              }
              helperText={
                error &&
                (error as any)?.data.errors.password &&
                (error as any)?.data.errors.password[0]
              }
              type="password"
              margin="normal"
              required
              fullWidth
              id="password"
              label="New password"
              autoComplete="password"
              autoFocus
              {...register("password")}
            />
            <Button variant="contained" type="submit">
              Update
            </Button>
          </Box>
        </RoundedBox>
      </Grid>
    </Grid>
  );
}

export default UserProfile;

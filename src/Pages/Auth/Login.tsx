import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import womanChatting from "../../assets/backgrounds/woman-chatting.jpg";
import Copyright from "../../components/ui/layout/Copyright";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userLogin, userLoginOAuth } from "../../store/authActions";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {
  const { loading, userInfo, userToken, error } = useSelector(
    (state: any) => state.auth
  );
  let [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitForm = (data: any) => {
    // @ts-ignore
    dispatch(userLogin(data)).then(() => {
      navigate("/user-profile");
      window.location.reload();
    });
  };

  useEffect(() => {
    if (searchParams.get("t") !== null) {
      const data = { token: searchParams.get("t"), exp: searchParams.get("e") };
      // @ts-ignore
      userLoginOAuth(data);
      navigate("/user-profile");
      window.location.reload();
    }

    if (userToken || userToken) {
      navigate("/user-profile");
    }
  }, [navigate, userInfo]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${womanChatting})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(submitForm)}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                {/* <Link
                  href="http://localhost:8000/api/oauth2/authorization/google"
                  variant="body2"
                >
                  {"Login using google"}
                </Link> */}
              </Grid>
              <Button
                href="http://localhost:8000/api/oauth2/authorization/google"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login using google
              </Button>
            </Grid>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;

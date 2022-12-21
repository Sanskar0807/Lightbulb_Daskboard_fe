import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "./Signup.css";

// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Pathname } from "../../../Pathname";
import { useState } from "react";
import { Paper } from "@mui/material";
import { SignupAction } from "./Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [phone, setPhone] = useState("");
  const [CountryCode, setCountryCode] = useState({ Code: "", number: "" });
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  const  {loading} = useSelector((state)=>state.Signup)
  if(loading==="succeeded"){
    navigate(Pathname.LOGIN)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get("email"),
        lastName: data.get("lastName"),
        firstName: data.get("firstName"),
        password: data.get("password"),
        mobileNumber: CountryCode.number,
        countryCode:CountryCode.Code
      });
    dispatch(
      SignupAction({
        email: data.get("email"),
        lastName: data.get("lastName"),
        firstName: data.get("firstName"),
        password: data.get("password"),
        mobileNumber: CountryCode.number,
        countryCode:CountryCode.Code
      })
    );
  };
  const handleCountry = (value, data, event, formattedValue) => {
    console.log(data.dialCode);
    console.log(value.slice(data.dialCode.length));
    setCountryCode({
      ...CountryCode,
      Code: data.dialCode,
      number: value.slice(data.dialCode.length),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevated={4} sx={{ padding: "1rem", marginTop: "1rem" }}>
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}

            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    country={"in"}
                    enableSearch={true}
                    value={phone}
                    onChange={handleCountry}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
              <Grid item xs>
                  <Link href={Pathname.RESETPASSWORD} variant="body2">
                    Reset Password
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={Pathname.LOGIN} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>

        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

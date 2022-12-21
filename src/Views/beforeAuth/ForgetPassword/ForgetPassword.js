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
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Pathname } from "../../../Pathname";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OTP from "../../../Components/OTP/OTP";
import {
  forgetAction,
  OtpGenerateAction,
  verifyOtpAction,
} from "./Redux/reducer";

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

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { generateOtploading, verifyOtploading } = useSelector(
    (state) => state.forget
  );
  const [forget_credential, setforget_credential] = React.useState({
    email: "",
  });

  const [closeModal, setcloseModal] = React.useState(false);
  const [UserforgerSteps, setUserforgerSteps] = React.useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    setforget_credential({ email: data.get("email") });
    
    if (UserforgerSteps === 1) {
      
      setcloseModal(true);
      dispatch(OtpGenerateAction({ email: data.get("email") }));
      setUserforgerSteps(2)
      
    }
    if (UserforgerSteps === 3) {
      
      dispatch(OtpGenerateAction({
        email: data.get("email"),
        password: data.get("password"),
      }));

      navigate(Pathname.LOGIN)


    }
  };

  const handleVerifyOtp = (otp) => {
    console.log("handleVerifyOtp", otp);
    
    

    if (UserforgerSteps === 2) {
      console.log("handleVerifyOtp", { email: forget_credential.email, otp: parseInt(otp) });
      setUserforgerSteps(3)
      dispatch(
        verifyOtpAction({ email: forget_credential.email, otp: parseInt(otp) })
      );
      setcloseModal(false);
      
      
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={4} sx={{ padding: "1rem", marginTop: "4rem" }}>
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <>
              {closeModal && (
                <OTP
                  handleVerifyOtp={handleVerifyOtp}
                  closeModal={closeModal}
                />
              )}
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                forget Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                {(UserforgerSteps === 3) && (
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Forget Password
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href={Pathname.LOGIN} variant="body2">
                      Login
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href={Pathname.SIGNUP} variant="body2">
                      {" Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </>
          </Box>
        </Paper>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

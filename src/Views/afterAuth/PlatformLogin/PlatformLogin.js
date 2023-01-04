import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import GeneralLayout from "../../../Layout/GeneralLayout";
import Googledemo from "../../../Components/GoogleSignup/Googledemo";
import Box from "@mui/material/Box";
import { isMobileOnly } from "react-device-detect";
import {
  FinalCalendarData,
  FinalCalendarDataAction,
  Get_Url,
  Get_UrlOutlook,
  set_GoogleCode,
  set_OutlookCode,
} from "./Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pathname } from "../../../Pathname";

const PlatformLogin = () => {
  const [searchParams] = useSearchParams();
  const {
    Get_GoogleCodeResponse,
    Get_UrlLink,
    Get_UrlCode,
    Get_UrlOutlookCode,
    Get_UrlOutlookLink,
  } = useSelector((state) => state.platform);
  const navigate = useNavigate();
  const [IntergationClick, setIntergationClick] = useState(1);
  const [ParamsCode, setParamsCode] = useState("");
  const dispatch = useDispatch();
  const [FlagMeeting, setFlagMeeting] = useState("");
  console.log("dekh bhai", FlagMeeting);

  useEffect(() => {
    if (!Get_UrlCode) {
      dispatch(Get_Url());
    }
    if (!Get_UrlOutlookCode) {
      dispatch(Get_UrlOutlook());
    }
    setParamsCode(searchParams.get("code"));
    
    if (searchParams.get("state")=="outlook") {
      console.log("chALA ME");
      let temp = true;
      if (temp) {
        // alert("chal bhai");
        dispatch(set_OutlookCode(searchParams.get("code")));

        temp = false;
      }
    }else{
      if (searchParams.get("code")) {
        let temp = true;
        if (temp) {
          // alert("chal bhai");
          dispatch(set_GoogleCode(searchParams.get("code")));
          temp = false;
        }
      }
    }
  }, []);

  // useEffect(() => {
  //   if (!isUserFirstTime) {
  //     navigate(Pathname.ZOOM);
  //   }
  // }, [isUserFirstTime]);

  useEffect(() => {
    if (Get_GoogleCodeResponse) {
      dispatch(FinalCalendarDataAction());
    }
  }, [Get_GoogleCodeResponse]);

  const handleSignupWithGoogle = () => {
    window.open(Get_UrlLink, "_self");
    setFlagMeeting("google");
  };
  const handleSignupWithOutlook = () => {
    window.open(Get_UrlOutlookLink, "_self");
    setFlagMeeting("outlook");
  };
  const tempClick = () => {
    dispatch(set_OutlookCode("M.R3_BAY.e7459a02-bf97-beb2-d908-ce9500aaca9d"));
  };

  return (
    <GeneralLayout
      IntergationClick={IntergationClick}
      setIntergationClick={setIntergationClick}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Box
              sx={{
                height: "80vh",
                textAlign: "center",
                marginLeft: "5rem",
                position: "absolute",
                top: "30%",
              }}
            >
              <Grid item xs={12} md={12}>
                <h1 onClick={tempClick}>Login With Google Account</h1>
                {/* <Googledemo /> */}
                {/* </Button> */}
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  sx={{ margin: "2rem" }}
                  onClick={handleSignupWithGoogle}
                >
                  Sign in With google
                </Button>
                <Button
                  variant="contained"
                  sx={{ margin: "2rem" }}
                  onClick={handleSignupWithOutlook}
                >
                  Sign in With Outlook
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          {!isMobileOnly && (
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=2000"
              style={{ height: "80vh" }}
            />
          )}
        </Grid>
      </Grid>
    </GeneralLayout>
  );
};

export default PlatformLogin;

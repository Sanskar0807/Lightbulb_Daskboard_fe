import { Button, Grid } from "@mui/material";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import { Pathname } from "../Pathname";
import "./GeneralLayout.scss";

const GeneralLayout = ({ children,}) => {
  
  const navigate = useNavigate()
  const handleIntegrationClick =()=>{
    navigate(Pathname.DASHBOARD)

  }
  const handleMeetingClick=()=>{
    navigate(Pathname.ZOOM)
  }
  const handleMeetingVideo =()=>{
    navigate(Pathname.VIDEOS)
  }
  console.log(window.location.pathname);
  return (
    <div className="generalLayout">
      <div className="generalLayout--header">
        <Header />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <div className="generalLayout--SideBar">
            {/* <SideBar/> */}
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button sx={{width:"100%",backgroundColor:`${window.location.pathname=='/dashboard'?'black':'rgb(40, 40, 40)'}`,color:"white",}}  onClick={handleIntegrationClick}>Integration</Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button  sx={{width:"100%",backgroundColor:`${window.location.pathname=='/zoom'?'black':'rgb(40, 40, 40)'}`,color:"white"}} onClick={handleMeetingClick} >Meetings</Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button  sx={{width:"100%",backgroundColor:`${window.location.pathname=='/video'?'black':'rgb(40, 40, 40)'}`,color:"white"}} onClick={handleMeetingVideo} >Passed Meetings</Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="generalLayout--contain">{children}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default GeneralLayout;

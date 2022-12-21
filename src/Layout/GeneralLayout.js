import { Button, Grid } from "@mui/material";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import { Pathname } from "../Pathname";
import "./GeneralLayout.scss";

const GeneralLayout = ({ children,IntergationClick,setIntergationClick }) => {
  
  const navigate = useNavigate()
  const handleIntegrationClick =()=>{
    navigate(Pathname.DASHBOARD)

    setIntergationClick(2)
  }
  const handleMeetingClick=()=>{
    navigate("/zoom")
  }
  
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
                <Button variant="contained" sx={{width:"100%"}} onClick={handleIntegrationClick}>Integration</Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant="contained" sx={{width:"100%"}} onClick={handleMeetingClick} >Meetings</Button>
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

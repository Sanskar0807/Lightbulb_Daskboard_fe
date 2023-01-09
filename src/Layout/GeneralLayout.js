import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import { Pathname } from "../Pathname";
import "./GeneralLayout.scss";

const GeneralLayout = ({ children }) => {
  const navigate = useNavigate();
  const handleIntegrationClick = () => {
    navigate(Pathname.DASHBOARD);
  };
  const handleMeetingClick = () => {
    navigate(Pathname.ZOOM);
  };
  const handleMeetingVideo = () => {
    navigate(Pathname.VIDEOS);
  };
  return (
    <div className="generalLayout">
      <div className="generalLayout--header">
        <Header />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={4} md={2} sm={2}>
          <div className="generalLayout--SideBar">
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent:"left" }}
              ></Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent:"left" }}
              >
                <Button
                  sx={{
                    width: "100%",
                    backgroundColor: `${
                      window.location.pathname == Pathname.DASHBOARD
                        ? "black"
                        : "rgb(40, 40, 40)"
                    }`,
                    color: "white",
                    justifyContent:"left",
                  }}
                  onClick={handleIntegrationClick}
                >
                  Integration
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent:"left" }}
              >
                <Button
                  sx={{
                    width: "100%",
                    backgroundColor: `${
                      window.location.pathname == Pathname.ZOOM
                        ? "black"
                        : "rgb(40, 40, 40)"
                    }`,
                    color: "white",
                    justifyContent:"left",
                  }}
                  onClick={handleMeetingClick}
                >
                  Meetings
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent:"left" }}
              >
                <Button
                  sx={{
                    width: "100%",
                    backgroundColor: `${
                      window.location.pathname == Pathname.VIDEOS
                        ? "black"
                        : "rgb(40, 40, 40)"
                    }`,
                    color: "white",
                    justifyContent:"left",
                  }}
                  onClick={handleMeetingVideo}
                >
                  Past Meetings
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={8} md={10} sm={10}>
          <div className="generalLayout--contain">{children}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default GeneralLayout;

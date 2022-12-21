import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./ZoomEvent.scss";
import GeneralLayout from "../../Layout/GeneralLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  filterMeetingData,
  GetCalendarData,
} from "../../Views/afterAuth/PlatformLogin/Redux/reducer";
import { formateData } from "../../utils/Helper";
// import { useDemoData } from '@mui/x-data-grid-generator';

const columns = [
  { field: "id", headerName: "MEETING ID", width: 250 },
  {
    field: "organizer",
    headerName: "ORGANIZER",
    width: 250,
    editable: true,
  },
  {
    field: "meetingUrl",
    headerName: "MEETING URL",
    width: 250,
    editable: true,
  },
  {
    field: "plateform",
    headerName: "PLATEFORM",
    width: 250,
    editable: true,
  },
  {
    field: "startTime",
    headerName: "START TIME",
    width: 250,
    editable: true,
  },
  {
    field: "endTime",
    headerName: "END TIME",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
  },
];
const newRow = [
  {
    meetingId: "6be3kt4arthrvv32o8kag1glbu",
    organizer: "sumit.kumar.antino@gmail.com",
    timeZone: "Asia/Kolkata",

    startTime: "2022-12-21T01:30:00+05:30",
    endTime: "2022-12-21T02:30:00+05:30",
    totalAttendees: [
      {
        email: "sanskar.p@antino.io",
        self: true,
        responseStatus: "needsAction",
      },
      {
        email: "sumit.kumar.antino@gmail.com",
        organizer: true,
        responseStatus: "accepted",
      },
    ],
  },
];

const rows = [
  {
    id: 1,
    meetingId: "o9breh0o57k66tqvhiqi6l2808",
    organizer: "sumit.kumar.antino@gmail.com",
    startTime: "2022-12-10T21:30:00+05:30",
    endTime: "2022-12-11T06:30:00+05:30",
    meetingLink: "https://meet.google.com/pav-vgjk-xaf",
  },
  {
    id: 2,
    meetingId: "31u0b6vhmiscot2rlm9thee8oc",
    organizer: "rohan.antino@gmail.com",
    startTime: "2022-12-10T21:30:00+05:30",
    endTime: "2022-12-11T06:30:00+05:30",
    meetingLink: "https://meet.google.com/pav-vgjk-xaf",
  },
  {
    id: 3,
    meetingId: "723fn06381pfoe0seiftkc4ebn",
    organizer: "pram.antino@gmail.com",
    startTime: "2022-12-10T21:30:00+05:30",
    endTime: "2022-12-11T06:30:00+05:30",
    meetingLink: "https://meet.google.com/pav-vgjk-xaf",
  },
  {
    id: 4,
    meetingId: "50lmq1se43hrqnehuobsuo6ucd",
    organizer: "piyush.antino@gmail.com",
    startTime: "2022-12-10T21:30:00+05:30",
    endTime: "2022-12-11T06:30:00+05:30",
    meetingLink: "https://meet.google.com/pav-vgjk-xaf",
  },
  // { id: 5, meetingId: "Targaryen", organizer: "Daenerys", startTime: null },
  // { id: 6, meetingId: "Melisandre", organizer: null, startTime: 150 },
  // { id: 7, meetingId: "Clifford", organizer: "Ferrara", startTime: 44 },
  // { id: 8, meetingId: "Frances", organizer: "Rossini", startTime: 36 },
  // { id: 9, meetingId: "Roxie", organizer: "Harvey", startTime: 65 },
];

const ZoomEvent = () => {
  const dispatch = useDispatch();
  const { calendarData, googleTokenloading, filterData, FinalCalendarData } =
    useSelector((state) => state.platform);
  const [SelectedData, setSelectedData] = useState([]);
  const [GoogleorganizeData, setGoogleorganizeData] = useState([]);
  const [zoomData, setZoomData] = useState([
    {
      meetingId: "o9breh0o57k66tqvhiqi6l2808",
      organizer: "sumit.kumar.antino@gmail.com",
      timeZone: "America/Los_Angeles",
      startTime: "2022-12-10T21:30:00+05:30",
      endTime: "2022-12-11T06:30:00+05:30",
    },
    {
      meetingId: "31u0b6vhmiscot2rlm9thee8oc",
      organizer: "sumit.kumar.antino@gmail.com",
      timeZone: "America/Los_Angeles",
      startTime: "2022-12-10T21:30:00+05:30",
      endTime: "2022-12-11T06:30:00+05:30",
    },
    {
      meetingId: "723fn06381pfoe0seiftkc4ebn",
      organizer: "sumit.kumar.antino@gmail.com",
      timeZone: "Asia/Kolkata",
      startTime: "2022-12-12T13:15:00+05:30",
      endTime: "2022-12-12T14:15:00+05:30",
      plateform: "Google Meet",
      meetingUrl: "https://meet.google.com/pav-vgjk-xaf",
    },
    {
      meetingId: "50lmq1se43hrqnehuobsuo6ucd",
      organizer: "sumit.kumar.antino@gmail.com",
      plateform: "Google Meet",
      meetingUrl: "https://meet.google.com/pmr-unvj-mqs",
    },
  ]);

  const handleSelectedRow = (row) => {
    console.log(row, FinalCalendarData);
    let temp = [];
    for (let i = 0; i < FinalCalendarData.length; i++) {
      for (let j = 0; j < row.length; j++) {
        if (FinalCalendarData[i].meetingId == row[j]) {
          // setSelectedData([...SelectedData, temp[i]]);
          temp.push(FinalCalendarData[i]);
        }
      }
    }

    if (temp.length > 0) {
      dispatch(filterMeetingData(temp));
    }
  };

  return (
    <GeneralLayout>
      <div className="ZoomUI">
        <h1 className="ZoomUI--Header">Google Meet data Calendar</h1>
        {/* <Button variant="contained" onClick={(e)=>{handleSync(e)}}>
          Sync
        </Button> */}
        <Box sx={{ height: 500, width: "100%" }}>
          {false ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              rows={formateData(FinalCalendarData)}
              columns={columns}
              pstartTimeSize={5}
              rowsPerPstartTimeOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              onSelectionModelChange={handleSelectedRow}
              
            />
          )}
        </Box>
      </div>
    </GeneralLayout>
  );
};

export default ZoomEvent;

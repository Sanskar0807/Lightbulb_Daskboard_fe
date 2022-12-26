import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import GeneralLayout from "../../../Layout/GeneralLayout";
import editIcon from "../../../Assets/images/edit.png";
import deleteIcon from "../../../Assets/images/waste.png";
import { width } from "@mui/system";
import EditMeeting from "../EditMeeting/EditMeeting";

const MeetingURl = () => {
  const columns = [
    {
      field: "id",
      headerName: "ROW",
      width: 100,
    },
    {
      field: "organizer",
      headerName: "ORGANIZER",
      width: 200,
    },
    {
      field: "videoUrl",
      headerName: "VIDEOS URL",
      width: 400,
      editable: true,
      valueGetter: handleOpenVideo,
      renderCell: () => (
        <strong>
          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={handleOpenVideo}
          >
            Open Video
          </Button>
        </strong>
      ),
    },
    {
      field: "update",
      headerName: " ",
      width: 100,
      // valueGetter: handleOpenVideo,
      renderCell: () => (
        <>
          <img
            src={editIcon}
            style={{ width: "30px", marginRight: "4px", cursor: "pointer" }}
            onClick={handleEditClick}
          />
          <img
            src={deleteIcon}
            style={{ width: "30px", cursor: "pointer" }}
            onClick={handleDeleteClick}
          />
        </>
      ),
    },
  ];
  const rows = [
    {
      id: 1,
      meetingId: "o9breh0o57k66tqvhiqi6l2808",
      organizer: "sumit.kumar.antino@gmail.com",
      startTime: "2022-12-10T21:30:00+05:30",
      endTime: "2022-12-11T06:30:00+05:30",
      videoUrl: "https://meet.google.com/pav-vgjk-xaf",
    },
    {
      id: 2,
      meetingId: "31u0b6vhmiscot2rlm9thee8oc",
      organizer: "rohan.antino@gmail.com",
      startTime: "2022-12-10T21:30:00+05:30",
      endTime: "2022-12-11T06:30:00+05:30",
      videoUrl: "https://meet.google.com/pav-vgjk-xaf",
    },
    {
      id: 3,
      meetingId: "723fn06381pfoe0seiftkc4ebn",
      organizer: "pram.antino@gmail.com",
      startTime: "2022-12-10T21:30:00+05:30",
      endTime: "2022-12-11T06:30:00+05:30",
      videoUrl: "https://meet.google.com/pav-vgjk-xaf",
    },
    {
      id: 4,
      meetingId: "50lmq1se43hrqnehuobsuo6ucd",
      organizer: "piyush.antino@gmail.com",
      startTime: "2022-12-10T21:30:00+05:30",
      endTime: "2022-12-11T06:30:00+05:30",
      videoUrl: "https://meet.google.com/pav-vgjk-xaf",
    },
  ];

const [modalToggle, setModalToggle] = useState(false)
  const handleEditClick = () => {
    setModalToggle(true)
  };
  const handleDeleteClick = () => {};
  const handleOpenVideo = (row) => {
    console.log(row);
  };
  return (
    <div className="MeetingURl">
      <GeneralLayout>
        <div className="ZoomUI">
          <h1 className="ZoomUI--Header">Videos Link</h1>
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
                // rows={formateData(FinalCalendarData)}
                rows={rows}
                columns={columns}
                pstartTimeSize={5}
                rowsPerPstartTimeOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            )}
          </Box>
        </div>
        {/* <video width="100%" height="500" controls>
          <source
            src="https://aws-test-bucket-dec.s3.ap-south-1.amazonaws.com/2test"
            type="video/mp4"
          />
        </video> */}
      </GeneralLayout>
      <Modal
        open={modalToggle}
        onClose={modalToggle}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{display:"flex",justifyContent:"center",alignItems:"center"}}
      >
        <EditMeeting setModalToggle={setModalToggle}/>
      </Modal>
    </div>
  );
};

export default MeetingURl;

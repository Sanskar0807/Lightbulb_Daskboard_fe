import { Box, Button, CircularProgress, Link, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import GeneralLayout from "../../../Layout/GeneralLayout";
import editIcon from "../../../Assets/images/edit.png";
import deleteIcon from "../../../Assets/images/waste.png";
import { width } from "@mui/system";
import EditMeeting from "../EditMeeting/EditMeeting";
import crossIcon from "../../../Assets/images/crossIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { formateData } from "../../../utils/Helper";
import { FinalCalendarDataAction } from "../PlatformLogin/Redux/reducer";

const MeetingURl = () => {
  const columns = [
    {
      field: "id",
      headerName: "ROW",
      width: 100,
    },
    { field: "meetingTitle", headerName: "MEETING TITLE", width: 150 },
    {
      field: "organizer",
      headerName: "ORGANIZER",
      width: 200,
      editable: true,
    },
    {
      field: "videoUrl",
      headerName: "VIDEOS URL",
      width: 400,
      editable: true,
      valueGetter: handleOpenVideo,
      renderCell: () => (
        <>
          <Modal
            open={modalToggle}
            onClose={modalToggle}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={crossIcon}
                style={{
                  width: "25px",
                  position: "absolute",
                  right: "10px",
                  top: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setModalToggle(false);
                }}
              />
              <video width="50%" height="500" controls>
                <source
                  src="https://aws-test-bucket-dec.s3.ap-south-1.amazonaws.com/2test"
                  type="video/mp4"
                />
              </video>
            </div>
          </Modal>
          <strong>
            <Button
              variant="contained"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={handleModalOpen}
            >
              Play Video
            </Button>
          </strong>
        </>
      ),
    },
  ];
  const Newcolumns = [
    { field: "meetingTitle", headerName: "Meeting Title", width: 150 },
    {
      field: "organizer",
      headerName: "Organizer",
      width: 200,
      editable: true,
    },
    {
      field: "id",
      headerName: "Videos Url",
      width: 200,
      renderCell: () => (
        <>
          <Modal
            open={modalToggle}
            onClose={modalToggle}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={crossIcon}
                style={{
                  width: "25px",
                  position: "absolute",
                  right: "10px",
                  top: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setModalToggle(false);
                }}
              />
              <video width="50%" height="500" controls>
                <source
                  src="https://aws-test-bucket-dec.s3.ap-south-1.amazonaws.com/2test"
                  type="video/mp4"
                />
              </video>
            </div>
          </Modal>
          <strong>
            <Button
              variant="contained"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={handleModalOpen}
            >
              Play Video
            </Button>
          </strong>
        </>
      ),
    },
    {
      field: "plateform",
      headerName: "Plateform",
      width: 200,
      editable: true,
    },
    {
      field: "meetingStatus",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ width: "7rem", fontSize: "11px", padding: "4px" }}
          color={`${
            params?.value == "cancelled"
              ? "error"
              : params?.value == "upComing"
              ? "warning"
              : "success"
          }`}
        >
          {params?.value == "cancelled"
            ? "cancelled"
            : params?.value == "upComing"
            ? "upComing"
            : params?.value == "updated"
            ? "Rescheduled"
            : "pending"}
        </Button>
      ),
    },
    {
      field: "botStatus",
      headerName: "Bot Status",
      width: 200,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          sx={{ width: "7rem", fontSize: "11px", padding: "4px" }}
          color={`success`}
        >
          {row.botStatus ? "Bot Join" : "Manual"}
        </Button>
      ),
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 250,
      editable: true,
    },
    {
      field: "endTime",
      headerName: "End Time",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
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
  const {
    FinalCalendarData
  } = useSelector((state) => state.platform);
  const dispatch = useDispatch();



  const [modalToggle, setModalToggle] = useState(false);
  const handleModalOpen = () => {
    setModalToggle(true);
  };
  const handleDeleteClick = () => {};
  const handleOpenVideo = (row) => {
    console.log(row);
  };
  useEffect(() => {
    dispatch(FinalCalendarDataAction());
  }, [dispatch]);
  return (
    <div className="MeetingURl">
      <GeneralLayout>
        <div className="ZoomUI">
          <h1 className="ZoomUI--Header">Videos Link</h1>
          {/* <Button variant="contained" onClick={(e)=>{handleSync(e)}}>
          Sync
        </Button> */}
          <Box sx={{ height: 500, width: "100%" }}>
          {FinalCalendarData?.length <= 0 &&
          FinalCalendarData != [] &&
          FinalCalendarData != "" ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              rows={formateData(FinalCalendarData)}
              // rows={rows}
              columns={Newcolumns}
              pstartTimeSize={5}
              rowsPerPstartTimeOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              // onSelectionModelChange={handleSelectedRow}
              

              // onRowClick={(data) => {
              //   handleMeetingUrl(data);
              // }}
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
    </div>
  );
};

export default MeetingURl;

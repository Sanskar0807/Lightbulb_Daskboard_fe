import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Link, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./ZoomEvent.scss";
import GeneralLayout from "../../Layout/GeneralLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  filterMeetingData,
  FinalCalendarDataAction,
  GetCalendarData,
} from "../../Views/afterAuth/PlatformLogin/Redux/reducer";
import { formateData } from "../../utils/Helper";
import editIcon from "../../Assets/images/edit.png";
import crossIcon from "../../Assets/images/crossIcon.png";
import EditMeeting from "../../Views/afterAuth/EditMeeting/EditMeeting";
import CreateMeeting from "../../Views/afterAuth/CreateMeeting/CreateMeeting";
import { deleteMeetingAction } from "../../Views/afterAuth/EditMeeting/Redux/reducer";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
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
    meetingUrl: "https://meet.google.com/pav-vgjk-xaf",
  },
  {
    id: 2,
    meetingId: "31u0b6vhmiscot2rlm9thee8oc",
    organizer: "rohan.antino@gmail.com",
    startTime: "2022-12-10T21:30:00+05:30",
    endTime: "2022-12-11T06:30:00+05:30",
    meetingUrl: "https://meet.google.com/pav-vgjk-xaf",
  },
  {
    id: 3,
    meetingId: "723fn06381pfoe0seiftkc4ebn",
    organizer: "pram.antino@gmail.com",
    startTime: "2022-12-10T21:30:00+05:30",
    endTime: "2022-12-11T06:30:00+05:30",
    meetingUrl: "https://meet.google.com/pav-vgjk-xaf",
  },
  {
    id: 4,
    meetingId: "50lmq1se43hrqnehuobsuo6ucd",
    organizer: "piyush.antino@gmail.com",
    startTime: "2022-12-10T21:30:00+05:30",
    endTime: "2022-12-11T06:30:00+05:30",
    meetingUrl: "https://meet.google.com/pav-vgjk-xaf",
  },
];

const ZoomEvent = () => {
  const columns = [
    { field: "meetingTitle", headerName: "MEETING TITLE", width: 150 },
    {
      field: "organizer",
      headerName: "ORGANIZER",
      width: 200,
      editable: true,
    },
    {
      field: "id",
      headerName: "MEETING URL",
      width: 300,
      renderCell: (params) => (
        <>
          {(params.row.meetingStatus == "cancelled") || (params.row.botStatus )  ? (
            <p /* style={{textDecoration: "line-through" }} */>{params?.value}</p>
          ) : (
            <Link
              to={`/form/${params.value}`}
              onClick={() => window.open(params.value)}
              style={{ cursor: "pointer" }}
            >
              {params?.value}
            </Link>
          )}
        </>
      ),
    },
    {
      field: "plateform",
      headerName: "PLATEFORM",
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
          {row.botStatus?"Bot Join":"Manual"}
        </Button>
      ),
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
    {
      field: "update",
      headerName: " ",
      width: 100,
      // valueGetter: handleOpenVideo,
      renderCell: ({ row }) => (
        <>
          {row.meetingStatus == "cancelled" ? (
            ""
          ) : (
            <>
              <img
                src={editIcon}
                style={{ width: "25px", marginRight: "4px", cursor: "pointer" }}
                onClick={() => {
                  handleEditClick(row);
                }}
              />
              <ConfirmationPopup
                message={`Do you really want to cancel meeting?`}
                handleConfirmation={() => handleDeleteClick(row)}
                render={(handlePopupOpen) => (
                  <img
                    src={crossIcon}
                    style={{ width: "25px", cursor: "pointer" }}
                    onClick={handlePopupOpen}
                  />
                )}
              />
            </>
          )}
        </>
      ),
    },
  ];
  const dispatch = useDispatch();
  const {
    calendarData,
    googleTokenloading,
    filterData,
    FinalCalendarData,
    Get_GoogleCodeResponse,
    meetingStatus,
  } = useSelector((state) => state.platform);
  const [SelectedData, setSelectedData] = useState([]);
  const [GoogleorganizeData, setGoogleorganizeData] = useState([]);
  const [RowData, setRowData] = useState("");
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
  const [modalToggle, setModalToggle] = useState(false);
  const [CreateMeetingModal, setCreateMeetingModal] = useState(false);
  const [tempSelectedRow, setTempSelectedRow] = useState([]);

  const handleEditClick = (row) => {
    // console.log(RowData);
    setModalToggle(true);
    setRowData(row);
  };
  const handleDeleteClick = (row) => {
    FinalCalendarData?.map((data) => {
      if (data.meetingUrl == row.id) {
        console.log("Row ID", data);

        dispatch(deleteMeetingAction({ eventId: data.meetingId }));
      }
    });
  };

  useEffect(() => {
    dispatch(FinalCalendarDataAction());
  }, [dispatch]);
  console.log(tempSelectedRow);

  const handleSelectedRow = (row) => {
    for (let i = 0; i < FinalCalendarData.length; i++) {
      for (let j = 0; j < row.length; j++) {
        if (FinalCalendarData[i].meetingUrl == row[j]) {
          setTempSelectedRow([
            ...tempSelectedRow,
            FinalCalendarData[i].meetingId,
          ]);
        }
      }
    }

    // for (let t = 0; t < array.tempSelectedRow; t++) {
    //   const element = array[t];

    // }

    if (tempSelectedRow.length > 0) {
      // dispatch(filterMeetingData(temp));
    }
  };

  const handleMeetingUrl = (row) => {
    setRowData(row.row);
    // if (row.row.id) {
    //   window.open(row.row.id)
    // }
  };
  const handleCreateMeeting = () => {
    setCreateMeetingModal(true);
  };

  const handleBotMeetingJoin = () => {
    if (tempSelectedRow.length > 0) {
      dispatch(filterMeetingData(tempSelectedRow));
    }
  };

  return (
    <GeneralLayout>
      <div className="ZoomUI">
        {/* <h1 className="ZoomUI--Header">Calendar Data </h1> */}
        <div className="ZoomUI--BtnBox">
          <Button
            variant="contained"
            onClick={(e) => {
              handleBotMeetingJoin(e);
            }}
            sx={{ marginBottom: "10px" }}
            disabled={tempSelectedRow.length <= 0}
          >
            Submit Bot meeting
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              handleCreateMeeting(e);
            }}
            sx={{ marginBottom: "10px" }}
          >
            Create Meeting
          </Button>
        </div>
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
              columns={columns}
              pstartTimeSize={5}
              rowsPerPstartTimeOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              onSelectionModelChange={handleSelectedRow}
              isRowSelectable={(params) =>
                params.row.meetingStatus !== "cancelled" && !params.row.botStatus  
              }
              checkboxSelection

              // onRowClick={(data) => {
              //   handleMeetingUrl(data);
              // }}
            />
          )}
        </Box>
      </div>
      {/* update meeting modal */}
      <Modal
        open={modalToggle}
        onClose={modalToggle}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <EditMeeting setModalToggle={setModalToggle} RowData={RowData} />
      </Modal>
      {/* Create meeting */}
      <Modal
        open={CreateMeetingModal}
        onClose={CreateMeetingModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CreateMeeting setCreateMeetingModal={setCreateMeetingModal} />
      </Modal>
    </GeneralLayout>
  );
};

export default ZoomEvent;

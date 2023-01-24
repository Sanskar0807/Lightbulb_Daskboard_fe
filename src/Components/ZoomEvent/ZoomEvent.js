import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./ZoomEvent.scss";
import GeneralLayout from "../../Layout/GeneralLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  filterMeetingData,
  FinalCalendarDataAction,
  GetCalendarData,
} from "../../Views/afterAuth/PlatformLogin/Redux/reducer";
import { formateData, get_DiffTimeDuration } from "../../utils/Helper";
import editIcon from "../../Assets/images/edit.png";
import crossIcon from "../../Assets/images/crossIcon.png";
import EditMeeting from "../../Views/afterAuth/EditMeeting/EditMeeting";
import CreateMeeting from "../../Views/afterAuth/CreateMeeting/CreateMeeting";
import {
  clearDeleteState,
  clearEditState,
  deleteMeetingAction,
} from "../../Views/afterAuth/EditMeeting/Redux/reducer";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { toast } from "react-toastify";
import ToastifyMsg from "../ToastifyMsg/ToastifyMsg";
import { clearError } from "../../Views/afterAuth/CreateMeeting/Redux/reducer";
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
    // { field: "id", headerName: "MEETING TITLEs", width: 1 },
    { field: "meetingTitle", headerName: "TITLE", width: 150 },
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
          {params.row.meetingStatus == "cancelled" || params.row.botStatus ? (
            <p /* style={{textDecoration: "line-through" }} */>
              {params?.value}
            </p>
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
      headerName: "PLATFORM",
      width: 200,
      editable: true,
    },
    {
      field: "meetingStatus",
      headerName: "STATUS",
      width: 150,
      renderCell: (params) => (
        <Typography
          variant="contained"
          // sx={{ width: "7rem", fontSize: "16px", padding: "4px" }}
          color={`${
            params?.value == "cancelled"
              ? "error"
              : params?.value == "upComing"
              ? "orange"
              : "green"
          }`}
        >
          {params?.value == "cancelled"
            ? "Cancelled"
            : params?.value == "upComing"
            ? "Upcoming"
            : params?.value == "updated"
            ? "Rescheduled"
            : "Pending"}
        </Typography>
      ),
    },
    {
      field: "botStatus",
      headerName: "BOT STATUS",
      width: 150,
      renderCell: ({ row }) => (
        <Typography
          variant="contained"
          // sx={{ width: "7rem", fontSize: "16px", padding: "4px" }}
          color={`green`}
        >
          {row.botStatus ? "Bot Join" : "Manual"}
        </Typography>
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
      field: "duration",
      headerName: "DURATION",
      width: 150,
      renderCell: ({ row }) => (
        <Typography
          variant="contained"
          // sx={{ width: "7rem", fontSize: "16px", padding: "4px" }}
          color={`black`}
        >
          {row.botStatus
            ? get_DiffTimeDuration(row.startTime, row.endTime)
            : get_DiffTimeDuration(row.startTime, row.endTime)}
        </Typography>
      ),
    },
    {
      field: "update",
      headerName: "ACTION",
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
    FinalCalendarLoading,
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
  const { createMeetingLoading, createMeetingMsg } = useSelector(
    (state) => state.createMeeting
  );
  const { deleteMeetingMsg, DeleteMeetingLoading } = useSelector(
    (state) => state.editMeeting
  );

  if (createMeetingLoading === "succeeded") {
    // toast.success("Meeting Created Successfully", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
    setTimeout(() => {
      dispatch(clearError());
    }, 3000);
  } else if (createMeetingLoading === "fail") {
    // toast.error(createMeetingMsg, { position: toast.POSITION.TOP_RIGHT });
  } else if (DeleteMeetingLoading === "succeeded") {
    // toast.success(deleteMeetingMsg, { position: toast.POSITION.TOP_RIGHT });
    setTimeout(() => {
      dispatch(clearDeleteState());
    }, 3000);
  }

  const handleEditClick = (row) => {
    // console.log(RowData);
    setModalToggle(true);
    setRowData(row);
  };
  const handleDeleteClick = (row) => {
    console.log("Row Data", row);

    FinalCalendarData?.map((data) => {
      if (data.meetingUrl == row.id) {
        console.log("Meeting Found", data.meetingId);

        dispatch(
          deleteMeetingAction({
            meetingId: data.meetingId,
          })
        );
      }
    });
  };

  useEffect(() => {
    dispatch(FinalCalendarDataAction());
  }, [dispatch]);

  const checkDuplicateEventId = (data) => {
    let newSelectedArray = data.filter((e, i, a) => a.indexOf(e) === i);
    // console.log("dekh formate data", newSelectedArray);
    return newSelectedArray;
  };

  const handleSelectedRow = (row) => {
    for (let i = 0; i < FinalCalendarData.length; i++) {
      for (let j = 0; j < row.length; j++) {
        if (FinalCalendarData[i].meetingUrl == row[j]) {
          setTempSelectedRow([
            ...tempSelectedRow,
            FinalCalendarData[i].meetingId,
          ]);
        } else {
        }
      }
    }
    if (tempSelectedRow.length > 0) {
      // dispatch(filterMeetingData(temp));
    }
  };

  const handleCreateMeeting = () => {
    setCreateMeetingModal(true);
  };

  const handleBotMeetingJoin = () => {
    if (tempSelectedRow.length > 0) {
      dispatch(filterMeetingData(checkDuplicateEventId(tempSelectedRow)));

      setTempSelectedRow([]);
    }
  };
  const { EditMeetingLoading } = useSelector((state) => state.editMeeting);
  if (EditMeetingLoading === "succeeded") {
    setTimeout(() => {
      dispatch(clearEditState());
    }, 3000);
  }

  return (
    <GeneralLayout>
      <Snackbar
        open={createMeetingLoading === "succeeded"}
        message={createMeetingMsg}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <Snackbar
        open={DeleteMeetingLoading === "succeeded"}
        message={"Meeting Delete successfully"}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <Snackbar
        open={EditMeetingLoading === "succeeded"}
        message={"Meeting Reschedule successfully"}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
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
              // rows={FinalCalendarData}
              columns={columns}
              pstartTimeSize={5}
              rowsPerPstartTimeOptions={[5]}
              loading={FinalCalendarLoading === "pending"}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              onSelectionModelChange={handleSelectedRow}
              isRowSelectable={(params) =>
                params.row.meetingStatus !== "cancelled" &&
                !params.row.botStatus
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

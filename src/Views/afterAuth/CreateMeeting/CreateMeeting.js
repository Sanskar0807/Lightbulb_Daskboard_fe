import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import crossIcon from "../../../Assets/images/crossIcon.png";
import "./CreateMeeting.scss";
import MultiEmailInput from "../../../Components/MultiEmailInput/MultiEmailInput";
import { get_UTCFormateDate } from "../../../utils/Helper";
import { createMeetingAction } from "./Redux/reducer";
import { useDispatch } from "react-redux";

const CreateMeeting = ({ setCreateMeetingModal }) => {
  const dispatch = useDispatch();
  const [CreateMeetingData, setCreateMeetingData] = useState({
    meetingTitle: "",
    location: "",
    description: "",
    startTime: "",
    endTime: "",
    participents: "",
  });
  const [emailList, setEmailList] = useState([]);
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectPlatform, setSelectPlatform] = useState("");

  const handlePlatformChange = (event) => {
    setSelectPlatform(event.target.value);
  };
  const handleEditClick = () => {
    setCreateMeetingModal(true);
  };
  const handleDeleteClick = () => {};
  const handleUserUpdate = (event) => {
    const {
      target: { name, value },
    } = event;
    setCreateMeetingData({ ...CreateMeetingData, [name]: value });
  };
  const handleSubmit = (event) => {
    // setCreateMeetingModal(false);
    event.preventDefault();

    console.log(CreateMeetingData);
    let tempEmailList = emailList.map((dta) => {
      return {
        email: dta,
      };
    });
    console.log({
      ...CreateMeetingData,
      platForm: selectPlatform,
      startTime: get_UTCFormateDate(startDate),
      endTime: get_UTCFormateDate(endDate),
      participents: tempEmailList,
    });

    setCreateMeetingData({
      ...CreateMeetingData,
      platForm: selectPlatform,
      startTime: get_UTCFormateDate(startDate),
      endTime: get_UTCFormateDate(endDate),
      participents: tempEmailList,
    });
    dispatch(
      createMeetingAction({
        ...CreateMeetingData,
        platForm:selectPlatform,
        startTime: get_UTCFormateDate(startDate),
        endTime: get_UTCFormateDate(endDate),
        participents: tempEmailList,
      })
    );
    setCreateMeetingModal(false);
  };

  function handleSelecetedTags(items) {
    console.log(items);
  }

  return (
    <div className="CreateMeeting--container">
      <img
        src={crossIcon}
        onClick={() => {
          setCreateMeetingModal(false);
        }}
        alt="cross"
        style={{
          width: "20px",
          position: "absolute",
          top: "15px",
          right: "20px",
          cursor: "pointer",
        }}
      />
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Meeting
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="meetingTitle"
                required
                fullWidth
                id="meetingTitle"
                label="Meeting Title"
                autoFocus
                value={CreateMeetingData.meetingTitle}
                onChange={handleUserUpdate}
                error={false}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="location"
                label="location"
                name="location"
                autoComplete="family-name"
                value={CreateMeetingData.location}
                onChange={handleUserUpdate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="family-name"
                value={CreateMeetingData.description}
                onChange={handleUserUpdate}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Account
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectPlatform}
                  label="Select Platform"
                  onChange={handlePlatformChange}
                >
                  <MenuItem value={"Google"}>Google</MenuItem>
                  <MenuItem value={"Outlook"}>Outlook</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MultiEmailInput
                setEmailList={setEmailList}
                emailList={emailList}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="datetime-local"
                label="Start Date"
                type="datetime-local"
                defaultValue={startDate}
                sx={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setstartDate(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="datetime-local"
                label="End Date"
                type="datetime-local"
                defaultValue={endDate}
                sx={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default CreateMeeting;

import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GeneralLayout from "../../../Layout/GeneralLayout";
import { Pathname } from "../../../Pathname";
import "./EditMeeting.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editMeetingAction,
  getUserDataAction,
  updateUserAction,
} from "./Redux/reducer";
import { toast } from "react-toastify";
import crossIcon from "../../../Assets/images/crossIcon.png";
import { get_FormatDate, get_UTCFormateDate } from "../../../utils/Helper";
import SelectDropdown from "../../../Components/SelectDropdown/SelectDropdown";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
// import DatePicker from "../../../Components/DatePicker/DatePicker"
import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_green.css";
import '../../../../node_modules/flatpickr/dist/flatpickr.min.css';

const EditMeeting = ({ setModalToggle, RowData }) => {
  const navigate = useNavigate();
  const { FinalCalendarData, updateProfileMsg } = useSelector(
    (state) => state.platform
  );
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [UpdateProfileData, setUpdateProfileData] = useState({
    meetingTitle: RowData.meetingTitle,
    meetingId: "",
  });
  const [selectPlateForm, setSelectPlateForm] = useState("");
  console.log(RowData);
  const [TempCountryCode, setTempCountryCode] = useState({
    Code: "",
    number: "",
  });
  const [TempDate, setTempDate] = useState("2023-01-05T11:15:00.000Z");
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUserDataAction());

    if (updateProfileMsg) {
      toast.success(updateProfileMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [updateProfileMsg]);
  useEffect(() => {
    if (FinalCalendarData) {
      FinalCalendarData?.map((row) => {
        if (row.meetingUrl == RowData.id) {
          setUpdateProfileData({
            ...UpdateProfileData,
            meetingId: row.meetingId,
          });
          setstartDate(row.startTime);
          setEndDate(row.endTime);
          setTempDate(row.startTime)
          setSelectPlateForm(
            row.plateform == "Zoom Meeting" ? "Google" : "Outlook"
          );
          console.log("row", row);
        }
      });
    }
  }, [FinalCalendarData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      ...UpdateProfileData,
      PlatForm: selectPlateForm,
      startTime: get_UTCFormateDate(startDate),
      endTime: get_UTCFormateDate(endDate),
    });
    dispatch(
      editMeetingAction({
        ...UpdateProfileData,
        platForm: selectPlateForm,
        startTime: get_UTCFormateDate(startDate),
        endTime: get_UTCFormateDate(endDate),
      })
    );
    // console.log("final data",UpdateProfileData,startDate,endDate);
    setModalToggle(false);
  };
  const handleSelect = (event) => {
    setSelectPlateForm(event.target.value);
  };

  const handleCountry = (value, data, event, formattedValue) => {
    console.log(data.dialCode);
    console.log(value.slice(data.dialCode.length));
    setTempCountryCode({
      ...TempCountryCode,
      Code: data.dialCode,
      number: value.slice(data.dialCode.length),
    });

    setUpdateProfileData({
      ...UpdateProfileData,
      TempCountryCode: data.dialCode,
      CountryNumber: value.slice(data.dialCode.length),
    });
  };

  const handleUserUpdate = (event) => {
    const {
      target: { name, value },
    } = event;
    setUpdateProfileData({ ...UpdateProfileData, [name]: value });
  };
  return (
    <>
      <div className="EditMeeting--conainer">
        <img
          src={crossIcon}
          onClick={() => {
            setModalToggle(false);
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
            Edit Meeting
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
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
                  value={UpdateProfileData.meetingTitle}
                  onChange={handleUserUpdate}
                  error={false}
                />
              </Grid>
              
              {/* <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="location"
                  name="location"
                  autoComplete="family-name"
                  value={UpdateProfileData.location}
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
                  autoComplete="description"
                  error={false}
                  value={UpdateProfileData.description}
                  onChange={handleUserUpdate}
                />
              </Grid> */}
              <Grid item xs={12}>
                <SelectDropdown
                  dropdownData={["Google", "Outlook"]}
                  handleSelect={handleSelect}
                  selectState={selectPlateForm}
                  label={"Select Platform"}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="datetime-local"
                  label="Start Date"
                  type="datetime-local"
                  defaultValue={startDate}
                  value={startDate}
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
                  value={endDate}
                  sx={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Flatpickr
                  data-enable-time
                  value={TempDate}
                  options={{ allowInput: true }}
                  position ={"right"}
                  onChange={(date) => {
                    setTempDate(date);
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
              Update
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default EditMeeting;

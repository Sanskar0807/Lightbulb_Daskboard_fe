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
import "./UpdateProfile.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAction, updateUserAction } from "./Redux/reducer";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { firstName, email, lastName, CountryNumber, CountryCode,updateProfileMsg } =
    useSelector((state) => state.userUpdate);
  const [UpdateProfileData, setUpdateProfileData] = useState({
    email: email,
    firstName: firstName,
    lastName: lastName,
    CountryCode: CountryCode,
    CountryNumber: CountryNumber,
  });
  const [phone, setPhone] = useState("");
  const [TempCountryCode, setTempCountryCode] = useState({
    Code: "",
    number: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDataAction());

    if (updateProfileMsg) {
      toast.success(updateProfileMsg, {
            position: toast.POSITION.TOP_RIGHT,
          })
    }
  }, [updateProfileMsg]);
  useEffect(() => {
    if (firstName && email && lastName && CountryNumber && CountryCode) {
      setUpdateProfileData({
        ...UpdateProfileData,
        firstName: firstName,
        lastName: lastName,
        email: email,
        CountryCode: CountryCode,
        CountryNumber: CountryNumber,
      });
      setTempCountryCode({
        ...TempCountryCode,
        Code: CountryCode,
        number: CountryNumber.toString(),
      });
      setPhone(...phone,CountryCode+CountryNumber.toString())
    }
  }, [firstName, email, lastName, CountryNumber, CountryCode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserAction(UpdateProfileData));
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

    // setUpdateProfileData({ ...UpdateProfileData,email:`${data2==="email"?data1:""}`});
  };
  return (
    <GeneralLayout>
      <div className="UpdateProfile--conainer">
        {/* <Grid container spacing={1}> */}

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
            Update Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={UpdateProfileData.firstName}
                  onChange={handleUserUpdate}
                  error={false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={UpdateProfileData.lastName}
                  onChange={handleUserUpdate}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={false}
                  value={UpdateProfileData.email}
                  onChange={handleUserUpdate}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput
                  country={"in"}
                  enableSearch={true}
                  value={phone}
                  onChange={handleCountry}
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
        {/* </Grid> */}
      </div>
    </GeneralLayout>
  );
};

export default UpdateProfile;

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import services from "../../../../Common/services";
import { get_Token } from "../../../../utils/Helper";

const initialState = {
  googleTokenloading: "idle", //"idle", "pending", "succeeded", "fail"
  googleSignupLoading: "idle", //"idle", "pending", "succeeded", "fail"
  filterMeetingLoading: "idle", //"idle", "pending", "succeeded", "fail"
  Get_UrlLoading: "idle", //"idle", "pending", "succeeded", "fail"
  set_CodeLoading: "idle", //"idle", "pending", "succeeded", "fail"
  FinalCalendarLoading: "idle", //"idle", "pending", "succeeded", "fail"

  error: "",
  success: false,
  isUserFirstTime:true,
  google_token: "",
  calendarData: "",
  filterData: [],
  Get_UrlLink: "",
  Get_UrlCode: "",
  Get_GoogleCodeResponse: "",
  FinalCalendarData: [],
};

//SIGNUP

export const GetCalendarData = createAsyncThunk(
  "/google_token",
  async (payload, thunkAPI) => {
    console.log("sanskar", payload);
    const response = await axios.get(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      }
    );
    return response?.data;
  }
);

export const signupWithGoogle = createAsyncThunk(
  "/google_signin",
  async (payload) => {
    try {
      console.log("signupWithGoogle ACTION", payload);

      return payload;
    } catch (error) {
      console.log("signupWithGoogle", error);
    }
  }
);
//set data to our db
export const filterMeetingData = createAsyncThunk(
  `filter_meeting`,
  async (payload, thunkAPI) => {
    try {
      let t_id = localStorage.getItem("t_id");
      console.log("filter_meeting ACTION with t_id", payload, t_id);
      const response = await services.post(
        "/meeting/save_meeting",
        { meetingDetails: payload },
        {
          headers: {
            Authorization: `Bearer ${t_id}`,
          },
        }
      );
      console.log(
        "filter_meeting Api response",
        response?.data?.data?.response?.data
      );

      return response?.data?.data?.response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//get_url
export const Get_Url = createAsyncThunk("/get_url", async (_, thunkAPI) => {
  try {
    const { data } = await services.get(
      "meeting/get_url",
      {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${get_Token()}`,
        },
      }
    );
    console.log(data?.data?.response);
    return data?.data?.response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// after comming code from google Consent
export const set_GoogleCode = createAsyncThunk(
  "/set_code",
  async (payload, thunkAPI) => {
    try {
      console.log("set_code Action", payload);

      const { data } = await services.post(
        "meeting/afterConsent",
        { code: payload },
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${get_Token()}`,
          },
        }
      );
      // console.log("set_code api result", data?.data?.response);

      return data?.data?.response?.status;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// CalendarData
export const FinalCalendarData = createAsyncThunk(
  "/CalendarData",
  async (_, thunkAPI) => {
    try {
      console.log(" final CalendarData Action");
      const { data } = await services.get(
        "meeting/get_calendar",
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${get_Token()}`,
          },
        }
      );
      return data?.data?.response?.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const PlatformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCalendarData.pending, (state) => {
      state.googleTokenloading = "pending";
    });
    builder.addCase(GetCalendarData.fulfilled, (state, action) => {
      state.googleTokenloading = "succeeded";
      state.calendarData = action.payload;
      console.log("Fullfilled", action?.payload);
      state.error = "";
    });
    builder.addCase(GetCalendarData.rejected, (state, action) => {
      state.googleTokenloading = "fail";
      state.error = action.payload;
      // toast.error("Google Get Calendar Data Api is not Working", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    });
    builder.addCase(signupWithGoogle.pending, (state) => {
      state.googleSignupLoading = "pending";
    });
    builder.addCase(signupWithGoogle.fulfilled, (state, action) => {
      console.log("hero ho tum", action);
      state.googleSignupLoading = "succeeded";
      state.google_token = action;
      // toast.success("Success fetch from calendar",{position:toast.POSITION.TOP_RIGHT})

      // state.error = "";
    });
    builder.addCase(signupWithGoogle.rejected, (state, action) => {
      state.googleSignupLoading = "fail";
      // state.error = action.payload;
    });

    builder.addCase(filterMeetingData.pending, (state) => {
      state.filterMeetingLoading = "pending";
    });
    builder.addCase(filterMeetingData.fulfilled, (state, action) => {
      state.filterMeetingLoading = "succeeded";
      // toast.success("Success fetch from calendar",{position:toast.POSITION.TOP_RIGHT})

      state.filterData = action.payload;
    });
    builder.addCase(filterMeetingData.rejected, (state, action) => {
      state.filterMeetingLoading = "fail";
      // state.error = action.payload;
      // toast.error("Unable to get data from backend", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    });

    // Get_Url
    builder.addCase(Get_Url.pending, (state) => {
      state.Get_UrlLoading = "pending";
    });
    builder.addCase(Get_Url.fulfilled, (state, action) => {
      console.log("action",action);
      state.Get_UrlLoading = "succeeded";
      state.Get_UrlLink = action.payload?.data;
      state.isUserFirstTime = action.payload?.isUserFirstTime
    });
    builder.addCase(Get_Url.rejected, (state, action) => {
      state.Get_UrlLoading = "fail";
    });

    // set_GoogleCode
    builder.addCase(set_GoogleCode.pending, (state) => {
      state.set_CodeLoading = "pending";
    });
    builder.addCase(set_GoogleCode.fulfilled, (state, action) => {
      state.set_CodeLoading = "succeeded";
      state.Get_GoogleCodeResponse = action.payload;
    });
    builder.addCase(set_GoogleCode.rejected, (state, action) => {
      state.set_CodeLoading = "fail";
    });

    //FinalCalendarData
    builder.addCase(FinalCalendarData.pending, (state) => {
      state.FinalCalendarLoading = "pending";
    });
    builder.addCase(FinalCalendarData.fulfilled, (state, action) => {
      state.FinalCalendarLoading = "succeeded";
      state.FinalCalendarData = action.payload;
    });
    builder.addCase(FinalCalendarData.rejected, (state, action) => {
      state.FinalCalendarLoading = "fail";
    });
  },
});

export default PlatformSlice.reducer;
import { mergeStateWithSortModel } from "@mui/x-data-grid/hooks/features/sorting/gridSortingUtils";
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
  Get_UrlOutlookLoading: "idle", //"idle", "pending", "succeeded", "fail"
  set_CodeOutLookLoading: "idle", //"idle", "pending", "succeeded", "fail"
  FinalCalendarLoading: "idle", //"idle", "pending", "succeeded", "fail"

  error: "",
  success: false,
  isUserFirstTime: true,
  google_token: "",
  calendarData: "",
  filterData: [],
  Get_UrlLink: "",
  Get_UrlCode: "",
  Get_UrlOutlookLink: "",
  Get_UrlOutlookCode: "",
  Get_GoogleCodeResponse: "",
  FinalCalendarData: [],
};

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
        "/meeting/botJoin-meeting",
        { meetingDetails: payload },
        {
          headers: {
            Authorization: `Bearer ${get_Token()}`,
          },
        }
      );
      console.log(
        "filter_meeting Api response",
        response?.data?.data?.response?.data
      );
      thunkAPI.dispatch(FinalCalendarDataAction());

      return response?.data?.data?.response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//get_url by google
export const Get_Url = createAsyncThunk("/get_url", async (_, thunkAPI) => {
  try {
    console.log("GET Request for URL");
    const config = {
      headers: {
        environment: "Dev",
      },
    };
    const { data } = await services.get("meeting/get-url", config);
    // const data = [
    //   {
    //     googleAuthUrl:
    //       "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&prompt=consent&include_granted_scopes=true&response_type=code&client_id=342561089138-mt6uoo35i445kpsvo7jov3o1mcqh2j4i.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5003%2Fdashboard",
    //     outlookAuthUrl:
    //       "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=cf13d6db-00b6-40f8-92d8-4b14fc3746d9&response_type=code&redirect_uri=http://localhost:5003/dashboard&response_mode=query&scope=offline_access Calendars.ReadWrite User.ReadWrite&state=outlook",
    //   },
    // ];
    console.log("GET URL CALL", data);

    return data?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// after comming code from google Consent
export const set_GoogleCode = createAsyncThunk(
  "/set_code",
  async (payload, thunkAPI) => {
    try {
      console.log("afterConsent Action", payload);

      const { data } = await services.get(
        `meeting/google/get-auth-code?code=${payload}`,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${get_Token()}`,
          },
        }
      );
      console.log("afterConsent api result", data?.data[0].encryptedJwtToken);

      return data?.data[0].encryptedJwtToken;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//get_url by google
export const Get_UrlOutlook = createAsyncThunk(
  "/get_urlOutlook",
  async (_, thunkAPI) => {
    try {
      const { data } = await services.get("authReq", {
        // const { data } = await axios.get("https://147d-49-249-44-114.in.ngrok.io//authReq", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${get_Token()}`,
        },
      });
      console.log("Get_UrlOutlook", data);
      return data?.Data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// after comming code from google Consent
export const set_OutlookCode = createAsyncThunk(
  "/set_codeOutlook",
  async (payload, thunkAPI) => {
    try {
      const { data } = await services.post(
        "meeting/outlook/get-auth-code",
        { code: payload },
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${get_Token()}`,
          },
        }
      );

      return data?.data?.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Get all Outlook + Calendar Data
export const FinalCalendarDataAction = createAsyncThunk(
  "/CalendarData",
  async (_, thunkAPI) => {
    try {
      // const { data } = await axios.get("https://80b4-49-249-44-114.in.ngrok.io/api/v1/meeting/get_calendar", {
      const { data } = await services.get("meeting/calendar", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${get_Token()}`,
        },
      });
      console.log(data?.data);
      return data?.data;
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
    builder.addCase(signupWithGoogle.pending, (state) => {
      state.googleSignupLoading = "pending";
    });
    builder.addCase(signupWithGoogle.fulfilled, (state, action) => {
      console.log("hero ho tum", action);
      state.googleSignupLoading = "succeeded";
      state.google_token = action;
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
      console.log("action get url", action.payload);
      state.Get_UrlLoading = "succeeded";
      console.log("PLateform Builder", action.payload);
      state.Get_UrlLink = action.payload[0]?.googleAuthUrl;
      state.Get_UrlOutlookLink = action.payload[1]?.outlookAuthUrl;
      state.isUserFirstTime = action.payload?.isUserFirstTime;
    });
    builder.addCase(Get_Url.rejected, (state, action) => {
      state.Get_UrlLoading = "fail";
    });
    //get_UrlOutlook
    builder.addCase(Get_UrlOutlook.pending, (state) => {
      state.Get_UrlOutlookLoading = "pending";
    });
    builder.addCase(Get_UrlOutlook.fulfilled, (state, action) => {
      console.log("action", action);
      state.Get_UrlOutlookLink = action.payload;
      state.Get_UrlOutlookLoading = "succeeded";
    });
    builder.addCase(Get_UrlOutlook.rejected, (state, action) => {
      state.Get_UrlOutlookLoading = "fail";
    });
    //set Google Code

    builder.addCase(set_GoogleCode.pending, (state) => {
      state.set_CodeOutLookLoading = "pending";
    });
    builder.addCase(set_GoogleCode.fulfilled, (state, action) => {
      state.set_CodeOutLookLoading = "succeeded";
      console.log("Token in fullfileed", action.payload);
      window.localStorage.setItem("encryptedJwtToken", action.payload);
    });
    builder.addCase(set_GoogleCode.rejected, (state, action) => {
      state.set_CodeOutLookLoading = "fail";
    });
    // set_OutlookCode
    builder.addCase(set_OutlookCode.pending, (state) => {
      state.set_CodeOutLookLoading = "pending";
    });
    builder.addCase(set_OutlookCode.fulfilled, (state, action) => {
      state.set_CodeOutLookLoading = "succeeded";
    });
    builder.addCase(set_OutlookCode.rejected, (state, action) => {
      state.set_CodeOutLookLoading = "fail";
    });

    //FinalCalendarData
    builder.addCase(FinalCalendarDataAction.pending, (state) => {
      state.FinalCalendarLoading = "pending";
      state.FinalCalendarData = [];
    });
    builder.addCase(FinalCalendarDataAction.fulfilled, (state, action) => {
      state.FinalCalendarLoading = "succeeded";
      if (action.payload == null || action.payload == "") {
        state.FinalCalendarData = [];
      } else {
        console.log("Fina Response of Action Caledar");
        state.FinalCalendarData = action.payload;
      }
    });
    builder.addCase(FinalCalendarDataAction.rejected, (state, action) => {
      state.FinalCalendarData = [];
      state.FinalCalendarLoading = "fail";
    });
  },
});

export default PlatformSlice.reducer;

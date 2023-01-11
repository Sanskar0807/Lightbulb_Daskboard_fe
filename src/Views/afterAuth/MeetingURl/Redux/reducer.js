import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import services from "../../../../Common/services";
import { get_Token } from "../../../../utils/Helper";

const initialState = {
  getVideoloading: "idle", //"idle", "pending", "succeeded", "fail"
  getVideoMeeting: [],
  error: "",
};

// get video
export const getVideoAction = createAsyncThunk(
  "/getVideoLink",
  async (_, thunkAPI) => {
    try {
      //////////////////////////////////console.log(" getVideoLink Action");
      const { data } = await services.get("meeting/get-recorded-meeting", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${get_Token()}`,
        },
      });
      //////////////////////////////////console.log(data?.data?.response?.data);
      return data?.data?.response?.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const VideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVideoAction.pending, (state) => {
      state.getVideoloading = "pending";
    });
    builder.addCase(getVideoAction.fulfilled, (state, action) => {
      state.getVideoloading = "succeeded";
      if (action.payload == null || action.payload == "") {
        state.getVideoMeeting = [];
      } else {
        state.getVideoMeeting = action.payload;
      }
      state.error = "";
    });
    builder.addCase(getVideoAction.rejected, (state, action) => {
      state.getVideoloading = "fail";
      state.getVideoMeeting = [];
      state.error = action.payload;
    });
  },
});

//console.log(VideoSlice);
export default VideoSlice.reducer;

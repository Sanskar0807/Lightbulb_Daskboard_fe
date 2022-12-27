import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import services from "../../../../Common/services";
import { get_Token } from "../../../../utils/Helper";

const initialState = {
  getVideoloading: "idle", //"idle", "pending", "succeeded", "fail"
  videoLink:"",
  error:"",
  
};

// get video 
export const getVideoAction = createAsyncThunk(
  "/getVideoLink",
  async (_, thunkAPI) => {
    try {
      console.log(" getVideoLink Action");
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
      state.videoLink = action.payload;
      state.error = "";
    });
    builder.addCase(getVideoAction.rejected, (state, action) => {
      state.getVideoloading = "fail";
      state.error = action.payload;
    });
  },
});

console.log(VideoSlice);
export default VideoSlice.reducer;

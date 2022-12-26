import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import services from "../../../../Common/services";
import { get_Token } from "../../../../utils/Helper";
import { FinalCalendarDataAction } from "../../PlatformLogin/Redux/reducer";

const initialState = {
  createMeetingLoading: "idle", //"idle", "pending", "succeeded", "fail"
  error: "",
  success: false,
  createMeetingMsg: "",
};

export const createMeetingAction = createAsyncThunk(
  "/createMeeting",
  async (payload, thunkAPI) => {
    try {
      console.log("createMeetingAction action call", payload, get_Token());

      const { data } = await services.post(
        "meeting/create_zoom_meeting",
        payload,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${get_Token()}`,
          },
        }
      );
      console.log("createMeetingAction reponse", data);
      thunkAPI.dispatch(FinalCalendarDataAction());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createMeetingSlice = createSlice({
  name: "createMeeting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMeetingAction.pending, (state) => {
      state.createMeetingLoading = "pending";
    });
    builder.addCase(createMeetingAction.fulfilled, (state, action) => {
      state.createMeetingLoading = "succeeded";
      state.createMeetingMsg = action.payload;
      state.error = "";
    });
    builder.addCase(createMeetingAction.rejected, (state, action) => {
      state.createMeetingLoading = "fail";
      state.error = action.payload;
    });
  },
});

console.log("reducer createMeetingSlice", createMeetingSlice);

export default createMeetingSlice.reducer;

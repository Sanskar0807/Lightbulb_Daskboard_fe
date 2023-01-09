import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import services from "../../../../Common/services";
import { get_Token } from "../../../../utils/Helper";
import { FinalCalendarDataAction } from "../../PlatformLogin/Redux/reducer";

const initialState = {
  EditMeetingLoading: "idle", //"idle", "pending", "succeeded", "fail"
  DeleteMeetingLoading: "idle", //"idle", "pending", "succeeded", "fail"
  error: "",
  success: false,
  updateProfileMsg: "",
  editMeetingStatus: "",
  deleteMeetingMsg:"",
};

//updateUser

export const editMeetingAction = createAsyncThunk(
  "/editMeeting",
  async (payload, thunkAPI) => {
    try {
      console.log("editMeetingAction action call", payload);

      const { data } = await services.put(
        "meeting/reschedule_meeting",
        payload,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${get_Token()}`,
          },
        }
      );
      console.log("editMeetingAction reponse", data);
      thunkAPI.dispatch(FinalCalendarDataAction())


      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteMeetingAction = createAsyncThunk(
  "/deleteMeeting",
  async (payload, thunkAPI) => {
    try {
      console.log("deleteMeetingAction action call", payload,get_Token());

      const { data } = await services.post("meeting/delete_meeting",
      // const { data } = await axios.post("https://80b4-49-249-44-114.in.ngrok.io/api/v1/meeting/delete_meeting",
        payload,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${get_Token()}`,
          },
        }
      );
      console.log("deleteMeetingAction reponse", data?.response?.message);
      thunkAPI.dispatch(FinalCalendarDataAction())
      return data?.response?.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const editMeetingSlice = createSlice({
  name: "editMeeting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editMeetingAction.pending, (state) => {
      state.EditMeetingLoading = "pending";
    });
    builder.addCase(editMeetingAction.fulfilled, (state, action) => {
      state.EditMeetingLoading = "succeeded";
      state.editMeetingStatus = action.payload;
      state.error = "";
    });
    builder.addCase(editMeetingAction.rejected, (state, action) => {
      state.EditMeetingLoading = "fail";
      state.error = action.payload;
    });
    //delete meeting
    builder.addCase(deleteMeetingAction.pending, (state) => {
      state.DeleteMeetingLoading = "pending";
    });
    builder.addCase(deleteMeetingAction.fulfilled, (state, action) => {
      state.DeleteMeetingLoading = "succeeded";
      state.deleteMeetingMsg = action.payload;
      state.error = "";
    });
    builder.addCase(deleteMeetingAction.rejected, (state, action) => {
      state.DeleteMeetingLoading = "fail";
      state.error = action.payload;
    });
  },
});

console.log("reducer editMeetingSlice", editMeetingSlice);

export default editMeetingSlice.reducer;

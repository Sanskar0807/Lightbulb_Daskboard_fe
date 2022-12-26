import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
  deleteMeetingStatus:"",
};

//updateUser

export const editMeetingAction = createAsyncThunk(
  "/editMeeting",
  async (payload, thunkAPI) => {
    try {
      console.log("editMeetingAction action call", data);

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

      const { data } = await services.post(
        "meeting/delete_meeting",
        payload,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${get_Token()}`,
          },
        }
      );
      console.log("deleteMeetingAction reponse", data);
      thunkAPI.dispatch(FinalCalendarDataAction())
      return data;
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
      state.deleteMeetingStatus = action.payload;
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
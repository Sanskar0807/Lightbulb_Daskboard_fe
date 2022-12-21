import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import services from "../../../../Common/services";

const initialState = {
  resetloading: "idle", //"idle", "pending", "succeeded", "fail"
  error: "",
  success: false,
  message:""
};

//reset

export const resetAction = createAsyncThunk("/reset_password", async (payload,thunkAPI) => {
  try {
    console.log("reset ACTION", payload);
    const response = await services.post("user/reset_password", payload);
    console.log("reset response", response);
    
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
});


export const resetSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetAction.pending, (state) => {
      state.resetloading = "pending";
    });
    builder.addCase(resetAction.fulfilled, (state, action) => {
      state.resetloading = "succeeded";
      console.log("reset succeeded",action.payload);
      // toast.success("reset Password successfully",{position:toast.POSITION.TOP_RIGHT})
      state.resetloading = "idle";
      state.error = "";
    });
    builder.addCase(resetAction.rejected, (state, action) => {
      state.resetloading = "fail";
      state.error = action.payload?.message;
      // toast.error(action.payload?.message,{position:toast.POSITION.TOP_RIGHT})
    });
  },
});

console.log("reducer resetSlice", resetSlice);

export default resetSlice.reducer;

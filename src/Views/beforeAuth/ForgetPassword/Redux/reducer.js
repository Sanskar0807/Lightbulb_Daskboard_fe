import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import services from "../../../../Common/services";

const initialState = {
  forgetloading: "idle", //"idle", "pending", "succeeded", "fail"
  verifyOtploading: "idle", //"idle", "pending", "succeeded", "fail"
  generateOtploading: "idle", //"idle", "pending", "succeeded", "fail"
  error: "",
  success: false,
  userResetMail: "",
};

//Forget Api After verify otp

export const forgetAction = createAsyncThunk(
  "/forget_Userpassword",
  async (payload, thunkAPI) => {
    try {
      console.log("forget ACTION", payload);
      const response = await services.post("user/forgot_password", payload);
      console.log("forget response", response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Generate Otp from only gmail
export const OtpGenerateAction = createAsyncThunk(
  "/Generate_otp",
  async (payload, thunkAPI) => {
    try {
      console.log("forgetOtpGenerateAction ACTION", payload);
      const response = await services.post("user/send_opt", payload);
      console.log("forgetOtpGenerateAction response", response);

      return response.data?.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//   verify otp after mail get otp succeess

export const verifyOtpAction = createAsyncThunk(
  "/verify_Otp",
  async (payload, thunkAPI) => {
    try {
      console.log("verifyOtpAction ACTION", payload);
      const response = await services.post("user/verify_opt", payload);
      console.log("verifyOtpAction response", response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ForgetSlice = createSlice({
  name: "forget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // generate Otp from mail
    builder.addCase(OtpGenerateAction.pending, (state) => {
      state.generateOtploading = "pending";
    });
    builder.addCase(OtpGenerateAction.fulfilled, (state, action) => {
      state.generateOtploading = "succeeded";
    //   toast.success(action.payload, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    });
    builder.addCase(OtpGenerateAction.rejected, (state, action) => {
      state.generateOtploading = "fail";
    //   toast.error(action.payload, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    });
    // verify otp from mail
    builder.addCase(verifyOtpAction.pending, (state) => {
      state.verifyOtploading = "pending";
    });
    builder.addCase(verifyOtpAction.fulfilled, (state, action) => {
      state.verifyOtploading = "succeeded";
    //   toast.success(action.payload, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    });
    builder.addCase(verifyOtpAction.rejected, (state, action) => {
      state.verifyOtploading = "fail";
    //   toast.error(action.payload, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    });

    // Forget password after verify the user from otp
    builder.addCase(forgetAction.pending, (state) => {
      state.forgetloading = "pending";
    });
    builder.addCase(forgetAction.fulfilled, (state, action) => {
      state.forgetloading = "succeeded";
    //   toast.success("Change Password successfully", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    });
    builder.addCase(forgetAction.rejected, (state, action) => {
      state.forgetloading = "fail";
    //   toast.error("forget API is not working", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
      state.error = action.payload;
    });
  },
});

console.log("reducer forgetSlice", ForgetSlice);

export default ForgetSlice.reducer;

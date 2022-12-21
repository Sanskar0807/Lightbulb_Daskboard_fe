import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import services from "../../../../Common/services";

const initialState = {
  loading: "idle", //"idle", "pending", "succeeded", "fail"
  error: "",
  success: false,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

//SIGNUP

export const SignupAction = createAsyncThunk("/register", async (payload,thunkAPI) => {
  try {
    console.log("SIGNUP ACTION", payload);
    const response = await services.post("user/create_user", payload);
    console.log("SignUp response", response);
    
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
});


export const SignupSlice = createSlice({
  name: "Signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SignupAction.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(SignupAction.fulfilled, (state, action) => {
      state.loading = "succeeded";
      // toast.success("Account created sucessfully",{position:toast.POSITION.TOP_RIGHT})
      state.error = "";
    });
    builder.addCase(SignupAction.rejected, (state, action) => {
      state.loading = "fail";
      state.error = action.payload;
      // toast.error("Signup Api is not working",{position:toast.POSITION.TOP_RIGHT})

    });
  },
});

console.log("reducer signup", SignupSlice);

export default SignupSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import Cookie from "universal-cookie"
import { createAsyncThunk } from "@reduxjs/toolkit";
import services from "../../../../Common/services";
import { toast } from "react-toastify";
import { removeLocalStorage } from "../../../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { Pathname } from "../../../../Pathname";
const cookies = new Cookie()
// const navigate = useNavigate()
const initialState = {
  t_id: cookies.get("t_id") || "",
  loginLoading: "idle", //"idle", "pending", "succeeded", "fail"
  logoutLoading: "idle", //"idle", "pending", "succeeded", "fail"
  error: "",
  loginmsg:""
};
//LOGIN
// export const login = createAsyncThunk(`auth/login`, async (payload) => {
//     console.log("LOGIN ACTION");
//     const response = await dignizantApi.post("/login", payload);
//     console.log("Login token", response);
//     return response.data;
// });
export const loginUser = createAsyncThunk(`auth/login`,async (payload,thunkAPI)=>{
  try {
    console.log("LOGIN ACTION",payload);

    const response  = await services.post("user/login_user",payload)
    console.log(response.data.data.response.data.token);
    localStorage.setItem('t_id',response?.data?.data?.response?.data?.token)
    return response?.data?.data?.response?.data?.token
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
    

})
//LOGOUT
export const logout = createAsyncThunk("auth/logout", () => {
  try {
    console.log("Log out Action");
    removeLocalStorage()
    // navigate(Pathname.LOGIN)
    return true;
  } catch (e) {
    console.log({ e });
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.t_id = action.payload;
      state.loginLoading = "succeeded";
      // toast.success("User login Successfully",{position:toast.POSITION.TOP_RIGHT})
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginLoading = "fail";
      state.loginmsg = action.payload?.message;
      // toast.error(action.payload?.message,{position:toast.POSITION.TOP_RIGHT})

    });
    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = "pending";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.t_id = "";
      state.logoutLoading = "succeeded";
      // toast.success("logout Successfully",{position:toast.POSITION.TOP_RIGHT})
      state.loginLoading="idle"
      state.t_id=""

      state.error = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.logoutLoading = "fail";
      state.error = action.payload;
    });
  },
});

export const { clearError } = authSlice.actions;
console.log("slice",authSlice);

export default authSlice.reducer;
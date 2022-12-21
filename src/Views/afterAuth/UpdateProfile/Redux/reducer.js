import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import services from "../../../../Common/services";

const initialState = {
  loading: "idle", //"idle", "pending", "succeeded", "fail"
  error: "",
  success: false,
  updateProfileMsg:"",
  email: "",
  firstName: "",
  lastName: "",
  CountryCode: "",
  CountryNumber: "",
};

//updateUser

export const getUserDataAction = createAsyncThunk(
  "/getData",
  async (_,thunkAPI) => {
    try {
      let t_id = localStorage.getItem("t_id");
      console.log("getData", t_id);
      const {data} = await services.get("/user/get_user", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${t_id}`,
        },
      });
      console.log("getData Api response", data?.data?.response?.data);

      return data?.data?.response?.data;
    } catch (error) {
        
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateUserAction = createAsyncThunk(
  "/userUpdate",
  async (payload, thunkAPI) => {
    try {
        let t_id = localStorage.getItem("t_id");
        console.log("updateUserAction ACTION with t_id", payload, t_id);
        const response = await services.put(
          "user/update_profile",
          payload,
          {
            headers: {
              Authorization: `Bearer ${t_id}`,
            },
          }
        );
        console.log("updateUserAction Api response", response?.data?.data?.response?.message);
  
        return response?.data?.data?.response?.message;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
  }
);

export const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDataAction.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getUserDataAction.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.CountryCode = action.payload?.countryCode;
      state.firstName = action.payload?.firstName;
      state.lastName = action.payload?.lastName;
      state.email = action.payload?.email;
      state.CountryNumber = action.payload?.mobileNumber;
      state.error = "";
    });
    builder.addCase(getUserDataAction.rejected, (state, action) => {
      state.loading = "fail";
      state.error = action.payload;
    //   toast.error("updateUser Api is not working", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    });
    //update user data
    builder.addCase(updateUserAction.pending, (state) => {
        state.loading = "pending";
      });
      builder.addCase(updateUserAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.updateProfileMsg = action.payload;
        // toast.success(action.payload, {
        //     position: toast.POSITION.TOP_RIGHT,
        //   })
        state.error = "";
      });
      builder.addCase(updateUserAction.rejected, (state, action) => {
        state.loading = "fail";
        state.error = action.payload;
        // toast.error("updateUser Api is not working", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      });
  },
});

console.log("reducer updateUser", updateUserSlice);

export default updateUserSlice.reducer;

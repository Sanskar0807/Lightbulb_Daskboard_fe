import { ContactlessOutlined } from "@mui/icons-material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import services from "../../../../Common/services";

const cookies = new Cookies();
export const clearError = (state) => {
  state.error = "";
};

export const login = createAsyncThunk(
  "auth/login",
  ({ email, password }, thunkAPI) => {


    // try {
    // //   if (email === "test123@gmail.com" && password === "Test@0321") {
    // //     console.log("valid credentials");
    // //     const t_id = "wei4hr9238rfnbekwfbn";
    // //     cookies.set("t_id", t_id);
    // //     return t_id;
    // //   } else {
    // //     console.log("in valid credentials");
    // //     return thunkAPI.rejectWithValue("Invalid credentials");
    // //   }
    // const getCompanies = axios.post(
    //     "https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8"
    //   ).then((response) => {
    //       console.log(response.data)
    //       return response.data;
    //   }).catch((ex) => {
    //       console.log(ex)
    //   })
    // } catch (e) {
    //   console.log({ e });
    // }
  }
);

// export const logout = createAsyncThunk("auth/logout", () => {
//   try {
//     cookies.remove("t_id");
//     return true;
//   } catch (e) {
//     console.log({ e });
//   }
// });
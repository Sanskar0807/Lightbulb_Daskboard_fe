// import { combineReducers } from 'redux';

// import { app } from './app/reducer';

import { dashboardSlice } from '../Views/afterAuth/Dashboard/Redux/reducer';
import authReducer from "../Views/beforeAuth/Login/Redux/reducer";
import SignupReducer from "../Views/beforeAuth/SignUp/Redux/reducer";
import platformReducer from "../Views/afterAuth/PlatformLogin/Redux/reducer"
import resetReducer from "../Views/beforeAuth/ResetPassword/Redux/reducer"
import forgetReducer from "../Views/beforeAuth/ForgetPassword/Redux/reducer"
import userUpdateReducer from "../Views/afterAuth/UpdateProfile/Redux/reducer"


export const rootReducer = {
	// app,
	auth: authReducer,
	Signup: SignupReducer,
	reset:resetReducer,
	forget:forgetReducer,
	userUpdate:userUpdateReducer,
	dashboard: dashboardSlice.reducer,
	platform:platformReducer
};

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import { setUserName } from './Redux/action'; "./Redux/action"
import HrLine from "../../../Components/HrLine/HrLine";
// import Button from "../../../Components/Button/Button";
import { Pathname } from "../../../Pathname";

import { setUserName } from "./Redux/reducer";
import { UsersFetchAction } from "./Redux/actionCreator";

import "./Dashboard.scss";
import { logout } from "../../beforeAuth/Login/Redux/reducer";
import GoogleSignup from "../../../Components/GoogleSignup/GoogleSignup";
import PlatformLogin from "../PlatformLogin/PlatformLogin";

export const Dashboard = () => {
	const dispatch = useDispatch();
	const dashboard = useSelector((state) => state.dashboard);

	useEffect(() => {
		// dispatch(setUserName("Shank"));

		// Dummy API Call
		// dispatch(UsersFetchAction());
	}, []);

	return (
		<React.Fragment>
			<PlatformLogin/>
		</React.Fragment>
	);
};

export default Dashboard;

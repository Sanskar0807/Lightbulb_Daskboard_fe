import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Pathname } from "./Pathname";

export const PrivateRoute = () => {
	const auth = localStorage.getItem("t_id");
	return auth ? <Outlet /> : <Navigate to={Pathname.LOGIN} />;
};

export default PrivateRoute;

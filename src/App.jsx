import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateOutlet from "./PrivateRoute";
import Loader from "./Components/Loader";
import { Pathname } from "./Pathname";
import Landing from "./Views/beforeAuth/Landing/Landing";
import Login from "./Views/beforeAuth/Login/Login";
import ForgetPassword from "./Views/beforeAuth/ForgetPassword/ForgetPassword";
import ResetPassword from "./Views/beforeAuth/ResetPassword/ResetPassword";

import "./app.scss";
import SignUp from "./Views/beforeAuth/SignUp/SignUp";
import GoogleSignup from "./Components/GoogleSignup/GoogleSignup";
import PlatformLogin from "./Views/afterAuth/PlatformLogin/PlatformLogin";
import ZoomEvent from "./Components/ZoomEvent/ZoomEvent";
import UpdateProfile from "./Views/afterAuth/UpdateProfile/UpdateProfile";
import MeetingURl from "./Views/afterAuth/MeetingURl/MeetingURl";

const Dashboard = React.lazy(() =>
  import("./Views/afterAuth/Dashboard/Dashboard")
);
const Orders = React.lazy(() => import("./Views/afterAuth/Orders/Orders"));
const NotFound = React.lazy(() => import("./Views/404"));

export function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path={Pathname.LOGIN} element={<Login />} />
          <Route path={Pathname.SIGNUP} element={<SignUp />} />
          <Route path={Pathname.FORGETPASSWORD} element={<ForgetPassword />} />
          <Route path={Pathname.RESETPASSWORD} element={<ResetPassword />} />
          <Route index path={Pathname.LANDING_PAGE} element={<Landing />} />
          <Route path={Pathname.ZOOM} element={<ZoomEvent />} />
          <Route path={Pathname.UPDATEPROFILE} element={<UpdateProfile />} />
          <Route path={Pathname.VIDEOS} element={<MeetingURl/> } />

          <Route path={Pathname.DASHBOARD} element={<PrivateOutlet />}>
            <Route index element={<Dashboard />} />
            <Route path="google" element={<GoogleSignup />} />
            <Route path="platform" element={<PlatformLogin />} />
            <Route path="orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" component={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
